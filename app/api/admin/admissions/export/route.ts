import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EnquiryStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const applyingFor = searchParams.get("class");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (status && status !== "ALL") where.status = status as EnquiryStatus;
    if (applyingFor && applyingFor !== "ALL") where.applyingFor = applyingFor;

    const enquiries = await prisma.admissionEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "ID",
      "Date",
      "Student Name",
      "Parent Name",
      "Phone",
      "WhatsApp",
      "Email",
      "Current Class",
      "Applying For",
      "Academic Session",
      "Status",
      "Admin Notes",
      "Parent Message",
    ];

    const escapeCsv = (val: string | null | undefined) => {
      if (!val) return '""';
      const clean = String(val).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = enquiries.map((e) => [
      escapeCsv(e.id),
      escapeCsv(new Date(e.createdAt).toISOString().split("T")[0]),
      escapeCsv(e.studentName),
      escapeCsv(e.parentName),
      escapeCsv(e.phone),
      escapeCsv(e.whatsapp),
      escapeCsv(e.email),
      escapeCsv(e.currentClass),
      escapeCsv(e.applyingFor),
      escapeCsv(e.academicSession),
      escapeCsv(e.status),
      escapeCsv(e.notes),
      escapeCsv(e.message),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const filename = `swayambhoo_admissions_${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Export failed", error: String(error) },
      { status: 500 }
    );
  }
}
