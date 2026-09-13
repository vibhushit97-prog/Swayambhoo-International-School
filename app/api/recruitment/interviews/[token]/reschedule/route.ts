import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { rescheduleRequestSchema } from "@/lib/recruitment/validations";
import { sendEmail, generateAdminRecruitmentAlertEmail } from "@/lib/email/gmail";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();

    const validation = rescheduleRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid explanation for rescheduling (at least 10 characters).",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { rescheduleReason } = validation.data;

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
        { success: false, message: "Invalid or expired token." },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.interview.update({
        where: { id: interview.id },
        data: {
          status: "RESCHEDULE_REQUESTED",
          rescheduleReason,
        },
      }),
      prisma.teacherApplication.update({
        where: { id: interview.applicationId },
        data: { status: "RESCHEDULE_REQUESTED" },
      }),
      prisma.interviewStatusHistory.create({
        data: {
          interviewId: interview.id,
          previousStatus: interview.status,
          newStatus: "RESCHEDULE_REQUESTED",
          changedBy: "CANDIDATE",
          notes: `Reschedule requested: ${rescheduleReason}`,
        },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: interview.applicationId,
          previousStatus: interview.application.status,
          newStatus: "RESCHEDULE_REQUESTED",
          changedBy: "CANDIDATE",
          reason: `Candidate requested reschedule: ${rescheduleReason}`,
        },
      }),
    ]);

    const positionTitle =
      interview.application.position?.title ||
      interview.application.otherPosition ||
      "Faculty Position";

    // Alert HR
    const hrEmail = process.env.RECRUITMENT_HR_EMAIL || "recruitment@swayambhooschool.com";
    const alertHtml = generateAdminRecruitmentAlertEmail({
      title: "Candidate Requested Interview Reschedule",
      message: `${interview.application.fullName} requested to reschedule their interview scheduled for ${new Date(interview.interviewDate).toLocaleDateString("en-IN")} at ${interview.interviewTime}. Reason: "${rescheduleReason}". Please review and issue a new schedule.`,
      candidateName: interview.application.fullName,
      applicationNumber: interview.application.applicationNumber,
      positionTitle,
    });

    sendEmail({
      applicationId: interview.applicationId,
      recipient: hrEmail,
      subject: `[Reschedule Request] ${interview.application.fullName} – ${positionTitle}`,
      html: alertHtml,
      emailType: "ADMIN_ALERT",
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message:
        "Your request to reschedule has been submitted. Our recruitment coordinator will review and contact you with updated schedule options.",
    });
  } catch (error) {
    console.error("[Reschedule Request Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit reschedule request." },
      { status: 500 }
    );
  }
}
