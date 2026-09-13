import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { statusInquirySchema } from "@/lib/recruitment/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = statusInquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid Application ID (SWIS-2026-XXXXXX) and Email.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { applicationNumber, email } = validation.data;

    const application = await prisma.teacherApplication.findFirst({
      where: {
        applicationNumber: { equals: applicationNumber.toUpperCase(), mode: "insensitive" },
        email: { equals: email.toLowerCase(), mode: "insensitive" },
      },
      select: {
        id: true,
        applicationNumber: true,
        fullName: true,
        status: true,
        createdAt: true,
        position: { select: { title: true } },
        otherPosition: true,
        statusHistory: {
          select: {
            newStatus: true,
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        },
        interviews: {
          select: {
            interviewDate: true,
            interviewTime: true,
            interviewMode: true,
            venue: true,
            meetingLink: true,
            status: true,
            confirmationToken: true,
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "No application found matching the provided Application ID and Email address.",
        },
        { status: 404 }
      );
    }

    const positionTitle = application.position?.title || application.otherPosition || "Faculty Position";
    const latestInterview = application.interviews[0] || null;

    return NextResponse.json({
      success: true,
      application: {
        applicationNumber: application.applicationNumber,
        fullName: application.fullName,
        positionTitle,
        status: application.status,
        submittedAt: application.createdAt,
        timeline: application.statusHistory,
        interview: latestInterview
          ? {
              interviewDate: latestInterview.interviewDate,
              interviewTime: latestInterview.interviewTime,
              interviewMode: latestInterview.interviewMode,
              venue: latestInterview.venue,
              meetingLink: latestInterview.meetingLink,
              status: latestInterview.status,
              confirmationToken: latestInterview.confirmationToken,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("[Status Inquiry Error]:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while checking application status." },
      { status: 500 }
    );
  }
}
