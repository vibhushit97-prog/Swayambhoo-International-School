import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { ApplicationStatus } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.teacherApplication.findUnique({
      where: { id },
      include: {
        position: true,
        educationRecords: { orderBy: { year: "desc" } },
        experienceRecords: { orderBy: { startDate: "desc" } },
        skills: true,
        languages: true,
        documents: true,
        statusHistory: { orderBy: { createdAt: "desc" } },
        interviews: {
          include: { statusHistory: { orderBy: { createdAt: "desc" } } },
          orderBy: { createdAt: "desc" },
        },
        adminNotes: { orderBy: { createdAt: "desc" } },
        emailNotifications: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("[Candidate Profile Fetch Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve candidate profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const adminName = session?.name || "Admin";

    const { id } = await params;
    const body = await request.json();
    const { status, reason } = body;

    if (!status || !Object.values(ApplicationStatus).includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid application status provided" },
        { status: 400 }
      );
    }

    const currentApp = await prisma.teacherApplication.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!currentApp) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.$transaction([
      prisma.teacherApplication.update({
        where: { id },
        data: { status },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: id,
          previousStatus: currentApp.status,
          newStatus: status,
          changedBy: adminName,
          reason: reason || `Status manually changed to ${status} by admin`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Status updated to ${status}`,
      application: updated[0],
    });
  } catch (error) {
    console.error("[Candidate Status Update Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application status" },
      { status: 500 }
    );
  }
}
