import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jobPositionSchema } from "@/lib/recruitment/validations";

export async function GET() {
  try {
    const positions = await prisma.jobPosition.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ success: true, positions });
  } catch (error) {
    console.error("[Admin Positions Fetch Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch positions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = jobPositionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required position fields",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const position = await prisma.jobPosition.create({
      data: {
        title: data.title,
        code: data.code || null,
        department: data.department,
        subjects: data.subjects,
        minQualification: data.minQualification,
        minExperience: data.minExperience,
        vacancies: data.vacancies,
        employmentType: data.employmentType,
        description: data.description || null,
        responsibilities: data.responsibilities || null,
        requirements: data.requirements || null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        isActive: data.isActive,
        displayOrder: data.displayOrder,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Position "${position.title}" created successfully.`,
        position,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Create Position Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create position" },
      { status: 500 }
    );
  }
}
