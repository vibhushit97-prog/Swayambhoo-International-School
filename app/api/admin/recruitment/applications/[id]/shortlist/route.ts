import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const adminName = session?.name || "Admin";

    const { id } = await params;

    const currentApp = await prisma.teacherApplication.findUnique({
      where: { id },
      select: { status: true, fullName: true },
    });

    if (!currentApp) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.teacherApplication.update({
        where: { id },
        data: { status: "SHORTLISTED" },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: id,
          previousStatus: currentApp.status,
          newStatus: "SHORTLISTED",
          changedBy: adminName,
          reason: `Candidate profile officially shortlisted by ${adminName}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `${currentApp.fullName} has been shortlisted. You can now schedule an interview round.`,
    });
  } catch (error) {
    console.error("[Shortlist API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to shortlist candidate" },
      { status: 500 }
    );
  }
}
