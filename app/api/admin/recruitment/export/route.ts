import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const positionId = searchParams.get("positionId") || undefined;

    const applications = await prisma.teacherApplication.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(positionId ? { positionId } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        position: { select: { title: true, department: true } },
        skills: { select: { skillName: true } },
        educationRecords: { select: { qualification: true, institution: true, percentageOrCgpa: true } },
        interviews: {
          select: { interviewDate: true, interviewTime: true, interviewMode: true, status: true },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    // Generate CSV Header
    const headers = [
      "Application ID",
      "Full Name",
      "Email",
      "Mobile",
      "City",
      "State",
      "Position Applied",
      "Department",
      "Experience (Years)",
      "Qualifications",
      "Skills",
      "Status",
      "Application Date",
      "Interview Date",
      "Interview Mode",
      "Interview Status",
    ];

    const rows = applications.map((app) => {
      const positionTitle = app.position?.title || app.otherPosition || "N/A";
      const department = app.position?.department || "General";
      const skillsStr = app.skills.map((s) => s.skillName).join("; ");
      const eduStr = app.educationRecords
        .map((e) => `${e.qualification} (${e.percentageOrCgpa})`)
        .join("; ");
      const interview = app.interviews[0];
      const interviewDateStr = interview
        ? `${new Date(interview.interviewDate).toLocaleDateString("en-IN")} ${interview.interviewTime}`
        : "Not Scheduled";
      const interviewMode = interview ? interview.interviewMode : "N/A";
      const interviewStatus = interview ? interview.status : "N/A";

      return [
        escapeCsvField(app.applicationNumber),
        escapeCsvField(app.fullName),
        escapeCsvField(app.email),
        escapeCsvField(app.mobile),
        escapeCsvField(app.city || ""),
        escapeCsvField(app.state || ""),
        escapeCsvField(positionTitle),
        escapeCsvField(department),
        escapeCsvField(app.totalExperienceYears),
        escapeCsvField(eduStr),
        escapeCsvField(skillsStr),
        escapeCsvField(app.status),
        escapeCsvField(new Date(app.createdAt).toLocaleDateString("en-IN")),
        escapeCsvField(interviewDateStr),
        escapeCsvField(interviewMode),
        escapeCsvField(interviewStatus),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="swayambhoo-recruitment-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("[CSV Export Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate CSV export" },
      { status: 500 }
    );
  }
}
