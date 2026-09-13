import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const positions = await prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        code: true,
        department: true,
        subjects: true,
        minQualification: true,
        minExperience: true,
        vacancies: true,
        employmentType: true,
        description: true,
        responsibilities: true,
        requirements: true,
        deadline: true,
      },
    });

    return NextResponse.json({ success: true, positions });
  } catch (error) {
    console.error("[Positions API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch open positions" },
      { status: 500 }
    );
  }
}
