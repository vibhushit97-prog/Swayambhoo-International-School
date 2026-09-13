import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const stageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  classes: z.string().min(1),
  ageRange: z.string().min(1),
  description: z.string().min(10),
  imageUrl: z.string().optional().nullable(),
  displayOrder: z.number().default(0),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

const streamToggleSchema = z.object({
  streamId: z.string(),
  isOffered: z.boolean(),
});

export async function GET() {
  try {
    const stages = await prisma.academicStage.findMany({
      include: {
        streams: {
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, stages });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch academic stages", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = stageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const stage = await prisma.academicStage.create({
      data: {
        title: data.title,
        slug: data.slug,
        classes: data.classes,
        ageRange: data.ageRange,
        description: data.description,
        imageUrl: data.imageUrl || null,
        displayOrder: data.displayOrder,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, stage, message: "Academic stage created successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create stage", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if updating stream toggle
    if (body.streamId !== undefined) {
      const streamVal = streamToggleSchema.safeParse(body);
      if (!streamVal.success) {
        return NextResponse.json({ success: false, message: "Invalid stream payload" }, { status: 400 });
      }
      const updatedStream = await prisma.academicStream.update({
        where: { id: streamVal.data.streamId },
        data: { isOffered: streamVal.data.isOffered },
      });
      return NextResponse.json({
        success: true,
        stream: updatedStream,
        message: `Stream ${updatedStream.name} is now ${updatedStream.isOffered ? "offered" : "hidden"}.`,
      });
    }

    // Otherwise updating stage
    const validation = stageSchema.safeParse(body);
    if (!validation.success || !body.id) {
      return NextResponse.json({ success: false, message: "Invalid stage data or ID missing" }, { status: 400 });
    }

    const data = validation.data;
    const updatedStage = await prisma.academicStage.update({
      where: { id: body.id },
      data: {
        title: data.title,
        slug: data.slug,
        classes: data.classes,
        ageRange: data.ageRange,
        description: data.description,
        imageUrl: data.imageUrl || null,
        displayOrder: data.displayOrder,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, stage: updatedStage, message: "Stage updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update academic stage", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Stage ID required" }, { status: 400 });
    }

    await prisma.academicStage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Academic stage deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete stage", error: String(error) },
      { status: 500 }
    );
  }
}
