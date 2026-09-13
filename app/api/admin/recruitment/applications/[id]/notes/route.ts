import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const adminName = session?.name || "HR Administrator";

    const { id } = await params;
    const body = await request.json();
    const content = body.content?.trim();

    if (!content) {
      return NextResponse.json(
        { success: false, message: "Note content cannot be empty" },
        { status: 400 }
      );
    }

    const note = await prisma.adminNote.create({
      data: {
        applicationId: id,
        adminName,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Internal HR note recorded successfully.",
      note,
    });
  } catch (error) {
    console.error("[Add Note Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to record private note" },
      { status: 500 }
    );
  }
}
