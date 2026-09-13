import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/config/site";

// Configure Transporter based on Environment Variables
function getTransporter() {
  const user = process.env.GMAIL_USER || process.env.GMAIL_SENDER_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  // 1. OAuth2 Strategy
  if (user && clientId && clientSecret && refreshToken) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken,
      },
    });
  }

  // 2. App Password Strategy
  if (user && pass) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  // 3. Fallback: Dev/Mock Transporter
  return null;
}

export interface SendEmailOptions {
  applicationId?: string;
  recipient: string;
  subject: string;
  html: string;
  text?: string;
  emailType:
    | "APPLICATION_CONFIRMATION"
    | "INTERVIEW_INVITATION"
    | "INTERVIEW_CONFIRMATION"
    | "RESCHEDULE_REQUEST"
    | "ADMIN_ALERT";
  metadata?: Record<string, unknown>;
}

/**
 * Send email asynchronously with persistence in email_notifications table.
 * Guaranteed not to throw and break calling transaction.
 */
export async function sendEmail({
  applicationId,
  recipient,
  subject,
  html,
  text,
  emailType,
  metadata,
}: SendEmailOptions): Promise<{ success: boolean; notificationId: string; error?: string }> {
  // 1. Create pending notification record
  const notification = await prisma.emailNotification.create({
    data: {
      applicationId: applicationId || null,
      recipient,
      subject,
      emailType,
      status: "PENDING",
      attemptCount: 1,
      metadata: (metadata as object) || undefined,
    },
  });

  const transporter = getTransporter();
  const senderAddress =
    process.env.GMAIL_SENDER_EMAIL ||
    process.env.GMAIL_USER ||
    `"Swayambhoo International School Recruitment" <recruitment@swayambhooschool.com>`;

  try {
    if (!transporter) {
      // In development / environment without Gmail keys: log and mark as SENT (Mock)
      console.log(`\n======================================================`);
      console.log(`📧 [MOCK EMAIL DISPATCH - NO GMAIL CONFIG DETECTED]`);
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${subject}`);
      console.log(`Type: ${emailType}`);
      console.log(`Notification ID: ${notification.id}`);
      console.log(`======================================================\n`);

      await prisma.emailNotification.update({
        where: { id: notification.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          metadata: {
            ...((metadata as object) || {}),
            deliveryMode: "mock_development_dispatch",
          },
        },
      });

      return { success: true, notificationId: notification.id };
    }

    // Real Gmail Send
    await transporter.sendMail({
      from: senderAddress,
      to: recipient,
      subject,
      html,
      text: text || subject,
    });

    await prisma.emailNotification.update({
      where: { id: notification.id },
      data: {
        status: "SENT",
        sentAt: new Date(),
      },
    });

    return { success: true, notificationId: notification.id };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email Dispatch Failure]: ${errorMsg}`);

    await prisma.emailNotification.update({
      where: { id: notification.id },
      data: {
        status: "FAILED",
        errorMessage: errorMsg,
      },
    });

    return { success: false, notificationId: notification.id, error: errorMsg };
  }
}

/**
 * Retry sending a failed email by ID
 */
export async function retryEmail(
  notificationId: string
): Promise<{ success: boolean; message: string }> {
  const notif = await prisma.emailNotification.findUnique({
    where: { id: notificationId },
  });

  if (!notif) {
    return { success: false, message: "Email record not found" };
  }

  const transporter = getTransporter();
  const senderAddress =
    process.env.GMAIL_SENDER_EMAIL ||
    process.env.GMAIL_USER ||
    `"Swayambhoo International School Recruitment" <recruitment@swayambhooschool.com>`;

  try {
    if (!transporter) {
      await prisma.emailNotification.update({
        where: { id: notif.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          attemptCount: { increment: 1 },
          errorMessage: null,
        },
      });
      return { success: true, message: "Email simulated successfully (Mock mode)" };
    }

    await transporter.sendMail({
      from: senderAddress,
      to: notif.recipient,
      subject: notif.subject,
      html: `<p>Retried email notice from Swayambhoo International School.</p>`,
      text: notif.subject,
    });

    await prisma.emailNotification.update({
      where: { id: notif.id },
      data: {
        status: "SENT",
        sentAt: new Date(),
        attemptCount: { increment: 1 },
        errorMessage: null,
      },
    });

    return { success: true, message: "Email dispatched successfully" };
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    await prisma.emailNotification.update({
      where: { id: notif.id },
      data: {
        attemptCount: { increment: 1 },
        errorMessage: err,
      },
    });
    return { success: false, message: `Retry failed: ${err}` };
  }
}

// ==========================================
// Professional Swayambhoo HTML Email Templates
// ==========================================

function getEmailHeader() {
  return `
    <div style="background-color: #0E241B; padding: 24px 20px; text-align: center; border-bottom: 3px solid #C5A059;">
      <h1 style="color: #FDFBF7; font-family: 'Georgia', serif; font-size: 22px; letter-spacing: 2px; margin: 0; text-transform: uppercase;">SWAYAMBHOO</h1>
      <p style="color: #C5A059; font-family: 'Arial', sans-serif; font-size: 11px; letter-spacing: 2px; margin: 4px 0 0 0; text-transform: uppercase;">International School • Wazirganj, Gaya</p>
      <p style="color: #8FA38F; font-size: 10px; margin: 2px 0 0 0; letter-spacing: 1px;">Learn • Grow • Lead</p>
    </div>
  `;
}

function getEmailFooter() {
  return `
    <div style="background-color: #FAF6EE; border-top: 1px solid #EAE2D5; padding: 20px; text-align: center; font-family: 'Arial', sans-serif; font-size: 11px; color: #64748B;">
      <p style="margin: 0 0 6px 0; font-weight: bold; color: #14342B;">Swayambhoo International School</p>
      <p style="margin: 0 0 6px 0;">Main Campus, Near NH-82, Wazirganj, Gaya, Bihar – 805131, India</p>
      <p style="margin: 0 0 6px 0;">Phone: +91 92412 18844 | WhatsApp: +91 96614 48541</p>
      <p style="margin: 10px 0 0 0; color: #9C7A33;">This is an automated recruitment notification. Please retain your Application ID for all future correspondence.</p>
    </div>
  `;
}

export function generateApplicationConfirmationEmail({
  applicantName,
  applicationNumber,
  positionTitle,
  applicationDate,
}: {
  applicantName: string;
  applicationNumber: string;
  positionTitle: string;
  applicationDate: string;
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received – Swayambhoo International School</title>
  </head>
  <body style="background-color: #F5EFEB; margin: 0; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2DBD0; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      ${getEmailHeader()}
      <div style="padding: 32px 28px; color: #181C20; line-height: 1.6;">
        <h2 style="font-family: 'Georgia', serif; color: #14342B; font-size: 20px; margin-top: 0;">Application Successfully Received</h2>
        <p>Dear <strong>${applicantName}</strong>,</p>
        <p>Thank you for your interest in joining <strong>Swayambhoo International School</strong>. We have successfully received your teacher recruitment application.</p>

        <div style="background-color: #F8F3E8; border-left: 4px solid #C5A059; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; color: #64748B; width: 140px;">Application ID:</td>
              <td style="padding: 4px 0; color: #0E241B; font-weight: bold; font-family: monospace; font-size: 14px;">${applicationNumber}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748B;">Position Applied:</td>
              <td style="padding: 4px 0; color: #0E241B; font-weight: bold;">${positionTitle}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748B;">Submission Date:</td>
              <td style="padding: 4px 0; color: #0E241B;">${applicationDate}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748B;">Current Status:</td>
              <td style="padding: 4px 0;"><span style="background-color: #14342B; color: #C5A059; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: bold;">APPLICATION RECEIVED</span></td>
            </tr>
          </table>
        </div>

        <p>Your application and credentials will now be reviewed by our academic recruitment committee. If your profile is shortlisted, our HR team will send you an official interview invitation with scheduled date and venue/link details.</p>

        <div style="margin: 28px 0; text-align: center;">
          <a href="${siteUrl}/careers/status" style="background-color: #C5A059; color: #0E241B; padding: 12px 28px; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; border-radius: 4px;">Check Application Status</a>
        </div>

        <p style="color: #64748B; font-size: 12px;">Please retain your Application ID (<strong>${applicationNumber}</strong>) for all future communication.</p>

        <p style="margin-top: 32px; border-top: 1px solid #EAE2D5; padding-top: 16px;">
          Warm regards,<br>
          <strong style="color: #14342B;">HR & Faculty Recruitment Team</strong><br>
          Swayambhoo International School
        </p>
      </div>
      ${getEmailFooter()}
    </div>
  </body>
  </html>
  `;
}

export function generateInterviewInvitationEmail({
  candidateName,
  applicationNumber,
  positionTitle,
  interviewDate,
  interviewTime,
  interviewMode,
  venueOrLink,
  interviewer,
  confirmationToken,
}: {
  candidateName: string;
  applicationNumber: string;
  positionTitle: string;
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  venueOrLink: string;
  interviewer: string;
  confirmationToken: string;
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const actionUrl = `${siteUrl}/careers/interview/${confirmationToken}`;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Invitation – Swayambhoo International School</title>
  </head>
  <body style="background-color: #F5EFEB; margin: 0; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2DBD0; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      ${getEmailHeader()}
      <div style="padding: 32px 28px; color: #181C20; line-height: 1.6;">
        <span style="background-color: #C5A059; color: #0E241B; padding: 3px 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 3px;">Faculty Recruitment</span>
        <h2 style="font-family: 'Georgia', serif; color: #14342B; font-size: 21px; margin-top: 10px;">Interview Invitation & Schedule</h2>
        
        <p>Dear <strong>${candidateName}</strong>,</p>
        <p>We are pleased to inform you that your profile has been shortlisted for the position of <strong>${positionTitle}</strong> at <strong>Swayambhoo International School</strong>.</p>
        <p>We cordially invite you to attend your recruitment interview round as per the schedule below:</p>

        <div style="background-color: #0E241B; color: #FDFBF7; padding: 20px 24px; margin: 24px 0; border-radius: 6px; border: 1px solid #1C4334;">
          <h3 style="color: #C5A059; font-family: 'Georgia', serif; font-size: 16px; margin-top: 0; border-bottom: 1px solid #1C4334; padding-bottom: 8px;">Interview Details</h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse; color: #E8DFC8;">
            <tr>
              <td style="padding: 6px 0; width: 140px; color: #8FA38F;">Application ID:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #FFFFFF; font-family: monospace;">${applicationNumber}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8FA38F;">Date:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #C5A059;">${interviewDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8FA38F;">Time:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #FFFFFF;">${interviewTime}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8FA38F;">Mode:</td>
              <td style="padding: 6px 0; color: #FFFFFF;">${interviewMode}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8FA38F;">Venue / Link:</td>
              <td style="padding: 6px 0; color: #FFFFFF;">${venueOrLink || "Swayambhoo Main Campus"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8FA38F;">Interviewer:</td>
              <td style="padding: 6px 0; color: #FFFFFF;">${interviewer}</td>
            </tr>
          </table>
        </div>

        <p style="font-weight: bold; color: #14342B;">Please confirm your availability for this schedule using the buttons below:</p>

        <div style="margin: 28px 0; text-align: center;">
          <a href="${actionUrl}?action=confirm" style="background-color: #14342B; color: #C5A059; border: 1px solid #C5A059; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; border-radius: 4px; margin-right: 12px;">✓ Confirm Interview</a>
          <a href="${actionUrl}?action=reschedule" style="background-color: #FAF6EE; color: #4A2E1B; border: 1px solid #EAE2D5; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; border-radius: 4px;">Request Reschedule</a>
        </div>

        <p style="color: #64748B; font-size: 12px;">If you choose to request a reschedule, our recruitment coordinator will review your request and issue an updated schedule.</p>

        <p style="margin-top: 32px; border-top: 1px solid #EAE2D5; padding-top: 16px;">
          Warm regards,<br>
          <strong style="color: #14342B;">HR & Faculty Recruitment Team</strong><br>
          Swayambhoo International School
        </p>
      </div>
      ${getEmailFooter()}
    </div>
  </body>
  </html>
  `;
}

export function generateAdminRecruitmentAlertEmail({
  title,
  message,
  candidateName,
  applicationNumber,
  positionTitle,
}: {
  title: string;
  message: string;
  candidateName: string;
  applicationNumber: string;
  positionTitle: string;
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body style="background-color: #F5EFEB; margin: 0; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 550px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2DBD0; border-radius: 6px; padding: 24px;">
      <h3 style="color: #14342B; margin-top: 0; font-size: 18px;">${title}</h3>
      <p style="color: #64748B; font-size: 13px;">${message}</p>
      <div style="background-color: #F8F3E8; padding: 14px; border-radius: 4px; margin: 16px 0; font-size: 13px;">
        <p style="margin: 4px 0;"><strong>Candidate:</strong> ${candidateName}</p>
        <p style="margin: 4px 0;"><strong>Application ID:</strong> ${applicationNumber}</p>
        <p style="margin: 4px 0;"><strong>Position:</strong> ${positionTitle}</p>
      </div>
      <a href="${siteUrl}/admin/recruitment/applications" style="background-color: #0E241B; color: #C5A059; padding: 10px 20px; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 4px; display: inline-block;">Open Admin Portal</a>
    </div>
  </body>
  </html>
  `;
}
