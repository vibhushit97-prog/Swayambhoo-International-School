import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, ApplicationStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const positionId = searchParams.get("positionId")?.trim() || "";
    const minExp = searchParams.get("minExp");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    // Build Where Clause
    const where: Prisma.TeacherApplicationWhereInput = {};

    if (status && Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
      where.status = status as ApplicationStatus;
    }

    if (positionId) {
      where.positionId = positionId;
    }

    if (minExp !== null && minExp !== undefined && minExp !== "") {
      const numExp = parseFloat(minExp);
      if (!isNaN(numExp)) {
        where.totalExperienceYears = { gte: numExp };
      }
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { applicationNumber: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { mobile: { contains: search, mode: "insensitive" } },
        { otherPosition: { contains: search, mode: "insensitive" } },
        { position: { title: { contains: search, mode: "insensitive" } } },
        // Custom Skills Partial Search
        {
          skills: {
            some: {
              skillName: { contains: search, mode: "insensitive" },
            },
          },
        },
      ];
    }

    // Run parallel count & paginated query
    const [total, applications, statusCounts] = await Promise.all([
      prisma.teacherApplication.count({ where }),
      prisma.teacherApplication.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          position: { select: { id: true, title: true, department: true } },
          skills: { select: { id: true, skillName: true } },
          educationRecords: {
            select: { qualification: true, institution: true, percentageOrCgpa: true },
            take: 2,
          },
          interviews: {
            select: {
              id: true,
              interviewDate: true,
              interviewTime: true,
              interviewMode: true,
              status: true,
            },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      prisma.teacherApplication.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
    ]);

    // Format status counts object
    const countsMap: Record<string, number> = {
      TOTAL: 0,
      NEW: 0,
      UNDER_REVIEW: 0,
      SHORTLISTED: 0,
      INTERVIEW_SCHEDULED: 0,
      INTERVIEW_CONFIRMED: 0,
      RESCHEDULE_REQUESTED: 0,
      INTERVIEW_COMPLETED: 0,
      SELECTED: 0,
      REJECTED: 0,
    };

    let totalAll = 0;
    for (const group of statusCounts) {
      countsMap[group.status] = group._count.status;
      totalAll += group._count.status;
    }
    countsMap.TOTAL = totalAll;

    return NextResponse.json({
      success: true,
      applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
      counts: countsMap,
    });
  } catch (error) {
    console.error("[Admin Applications Fetch Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve recruitment applications" },
      { status: 500 }
    );
  }
}
