import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail, generateAdminRecruitmentAlertEmail } from "@/lib/email/gmail";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const interview = await prisma.interview.findUnique({
      where: { confirmationToken: token },
      include: {
        application: {
          include: {
            position: { select: { title: true } },
          },
        },
      },
    });

    if (!interview) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired interview confirmation token." },
        { status: 404 }
      );
    }

    if (interview.status === "CONFIRMED") {
      return NextResponse.json({
        success: true,
        message: "Your interview is already confirmed.",
        interview,
      });
    }

    // Atomic confirmation
    await prisma.$transaction([
      prisma.interview.update({
        where: { id: interview.id },
        data: { status: "CONFIRMED" },
      }),
      prisma.teacherApplication.update({
        where: { id: interview.applicationId },
        data: { status: "INTERVIEW_CONFIRMED" },
      }),
      prisma.interviewStatusHistory.create({
        data: {
          interviewId: interview.id,
          previousStatus: interview.status,
          newStatus: "CONFIRMED",
          changedBy: "CANDIDATE",
          notes: "Candidate confirmed attendance via email link",
        },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: interview.applicationId,
          previousStatus: interview.application.status,
          newStatus: "INTERVIEW_CONFIRMED",
          changedBy: "CANDIDATE",
          reason: "Candidate confirmed interview schedule",
        },
      }),
    ]);

    const positionTitle =
      interview.application.position?.title ||
      interview.application.otherPosition ||
      "Faculty Position";

    // Notify Candidate
    sendEmail({
      applicationId: interview.applicationId,
      recipient: interview.application.email,
      subject: `Interview Attendance Confirmed – Swayambhoo International School`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #181C20;">
          <h2 style="color: #14342B;">Interview Confirmed</h2>
          <p>Dear ${interview.application.fullName},</p>
          <p>Thank you for confirming your interview for <strong>${positionTitle}</strong>.</p>
          <p>We look forward to meeting you on <strong>${new Date(interview.interviewDate).toLocaleDateString("en-IN")} at ${interview.interviewTime}</strong>.</p>
          <p>Venue / Meeting Link: ${interview.venue || interview.meetingLink || "Main Campus, Swayambhoo International School"}</p>
        </div>
      `,
      emailType: "INTERVIEW_CONFIRMATION",
    }).catch(console.error);

    // Notify HR
    const hrEmail = process.env.RECRUITMENT_HR_EMAIL || "recruitment@swayambhooschool.com";
    const alertHtml = generateAdminRecruitmentAlertEmail({
      title: "Candidate Confirmed Interview Attendance",
      message: `${interview.application.fullName} has confirmed attendance for their scheduled interview round on ${new Date(interview.interviewDate).toLocaleDateString("en-IN")} at ${interview.interviewTime}.`,
      candidateName: interview.application.fullName,
      applicationNumber: interview.application.applicationNumber,
      positionTitle,
    });

    sendEmail({
      applicationId: interview.applicationId,
      recipient: hrEmail,
      subject: `[Confirmed] Interview: ${interview.application.fullName} – ${positionTitle}`,
      html: alertHtml,
      emailType: "ADMIN_ALERT",
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Your interview attendance has been successfully confirmed.",
    });
  } catch (error) {
    console.error("[Interview Confirm Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to confirm interview." },
      { status: 500 }
    );
  }
}
