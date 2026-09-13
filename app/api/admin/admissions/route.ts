import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { EnquiryStatus } from "@prisma/client";

const updateEnquirySchema = z.object({
  id: z.string(),
  status: z.enum(["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "CLOSED"]).optional(),
  notes: z.string().optional().nullable(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const applyingFor = searchParams.get("class");
    const search = searchParams.get("search");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status as EnquiryStatus;
    }

    if (applyingFor && applyingFor !== "ALL") {
      where.applyingFor = applyingFor;
    }

    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: "insensitive" } },
        { parentName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (fromDate || toDate) {
      where.createdAt = {};
      if (fromDate) where.createdAt.gte = new Date(fromDate);
      if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        where.createdAt.lte = to;
      }
    }

    const enquiries = await prisma.admissionEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const statusCounts = await prisma.admissionEnquiry.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const counts: Record<string, number> = {
      TOTAL: 0,
      NEW: 0,
      CONTACTED: 0,
      FOLLOW_UP: 0,
      CONVERTED: 0,
      CLOSED: 0,
    };

    statusCounts.forEach((s) => {
      counts[s.status] = s._count.id;
      counts.TOTAL += s._count.id;
    });

    return NextResponse.json({ success: true, enquiries, counts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch enquiries", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = updateEnquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation error" }, { status: 400 });
    }

    const { id, status, notes } = validation.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await prisma.admissionEnquiry.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      enquiry: updated,
      message: "Enquiry record updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update enquiry", error: String(error) },
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

    await prisma.admissionEnquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete enquiry", error: String(error) },
      { status: 500 }
    );
  }
}
