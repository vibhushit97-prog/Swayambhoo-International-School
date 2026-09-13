import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "node:crypto";
import { getSession } from "@/lib/auth/session";
import { scheduleInterviewSchema } from "@/lib/recruitment/validations";
import { sendEmail, generateInterviewInvitationEmail } from "@/lib/email/gmail";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const adminName = session?.name || "Admin";

    const { id } = await params;
    const body = await request.json();

    const validation = scheduleInterviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required interview fields",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      interviewDate,
      interviewTime,
      interviewMode,
      venue,
      meetingLink,
      interviewer,
      additionalInstructions,
    } = validation.data;

    const application = await prisma.teacherApplication.findUnique({
      where: { id },
      include: {
        position: { select: { title: true } },
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // Generate secure 32-character confirmation token
    const confirmationToken = crypto.randomBytes(16).toString("hex");

    const parsedDate = new Date(interviewDate);

    const [interview] = await prisma.$transaction([
      prisma.interview.create({
        data: {
          applicationId: id,
          interviewDate: parsedDate,
          interviewTime,
          interviewMode,
          venue: venue || null,
          meetingLink: meetingLink || null,
          interviewer,
          additionalInstructions: additionalInstructions || null,
          confirmationToken,
          status: "SCHEDULED",
          scheduledBy: adminName,
          statusHistory: {
            create: {
              newStatus: "SCHEDULED",
              changedBy: adminName,
              notes: `Interview scheduled for ${parsedDate.toLocaleDateString("en-IN")} at ${interviewTime} via ${interviewMode}`,
            },
          },
        },
      }),
      prisma.teacherApplication.update({
        where: { id },
        data: { status: "INTERVIEW_SCHEDULED" },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: id,
          previousStatus: application.status,
          newStatus: "INTERVIEW_SCHEDULED",
          changedBy: adminName,
          reason: `Interview scheduled on ${parsedDate.toLocaleDateString("en-IN")} by ${adminName}`,
        },
      }),
    ]);

    const positionTitle =
      application.position?.title || application.otherPosition || "Faculty Position";

    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
    }).format(parsedDate);

    // Send Interview Invitation Email to Candidate
    const emailHtml = generateInterviewInvitationEmail({
      candidateName: application.fullName,
      applicationNumber: application.applicationNumber,
      positionTitle,
      interviewDate: formattedDate,
      interviewTime,
      interviewMode,
      venueOrLink: venue || meetingLink || "Main Campus, Wazirganj",
      interviewer,
      confirmationToken,
    });

    sendEmail({
      applicationId: application.id,
      recipient: application.email,
      subject: `Interview Invitation – Swayambhoo International School (${application.applicationNumber})`,
      html: emailHtml,
      emailType: "INTERVIEW_INVITATION",
      metadata: { interviewId: interview.id, interviewDate, interviewTime },
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: `Interview scheduled and invitation dispatched to ${application.email}`,
      interview,
    });
  } catch (error) {
    console.error("[Schedule Interview Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to schedule interview" },
      { status: 500 }
    );
  }
}
