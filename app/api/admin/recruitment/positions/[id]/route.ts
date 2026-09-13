import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jobPositionSchema } from "@/lib/recruitment/validations";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = jobPositionSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const position = await prisma.jobPosition.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.code !== undefined && { code: data.code || null }),
        ...(data.department && { department: data.department }),
        ...(data.subjects && { subjects: data.subjects }),
        ...(data.minQualification && { minQualification: data.minQualification }),
        ...(data.minExperience !== undefined && { minExperience: data.minExperience }),
        ...(data.vacancies !== undefined && { vacancies: data.vacancies }),
        ...(data.employmentType && { employmentType: data.employmentType }),
        ...(data.description !== undefined && { description: data.description || null }),
        ...(data.responsibilities !== undefined && { responsibilities: data.responsibilities || null }),
        ...(data.requirements !== undefined && { requirements: data.requirements || null }),
        ...(data.deadline !== undefined && {
          deadline: data.deadline ? new Date(data.deadline) : null,
        }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Position "${position.title}" updated successfully.`,
      position,
    });
  } catch (error) {
    console.error("[Update Position Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update position" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Toggle active state
    const pos = await prisma.jobPosition.findUnique({
      where: { id },
      select: { isActive: true, title: true },
    });

    if (!pos) {
      return NextResponse.json(
        { success: false, message: "Position not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.jobPosition.update({
      where: { id },
      data: { isActive: !pos.isActive },
    });

    return NextResponse.json({
      success: true,
      message: `Position "${pos.title}" marked as ${updated.isActive ? "Active" : "Inactive"}.`,
      position: updated,
    });
  } catch (error) {
    console.error("[Toggle Position Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to modify position status" },
      { status: 500 }
    );
  }
}
