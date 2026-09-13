import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { MessageStatus } from "@prisma/client";

const updateMessageSchema = z.object({
  id: z.string(),
  status: z.enum(["UNREAD", "READ", "REPLIED", "CLOSED"]).optional(),
  notes: z.string().optional().nullable(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status as MessageStatus;
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const statusCounts = await prisma.contactMessage.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const counts: Record<string, number> = {
      TOTAL: 0,
      UNREAD: 0,
      READ: 0,
      REPLIED: 0,
      CLOSED: 0,
    };

    statusCounts.forEach((s) => {
      counts[s.status] = s._count.id;
      counts.TOTAL += s._count.id;
    });

    return NextResponse.json({ success: true, messages, counts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact messages", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = updateMessageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation error" }, { status: 400 });
    }

    const { id, status, notes } = validation.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: updated,
      statusMessage: "Message updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update contact message", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }

    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete message", error: String(error) },
      { status: 500 }
    );
  }
}
