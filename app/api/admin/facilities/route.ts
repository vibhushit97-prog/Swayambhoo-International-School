import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const facilitySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  tagline: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().min(1),
  features: z.array(z.string()).default([]),
  displayOrder: z.number().default(0),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, facilities });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch facilities", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = facilitySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const facility = await prisma.facility.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline,
        category: data.category,
        description: data.description,
        imageUrl: data.imageUrl,
        features: data.features,
        displayOrder: data.displayOrder,
        isFeatured: data.isFeatured,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, facility, message: "Facility created successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create facility", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = facilitySchema.safeParse(body);

    if (!validation.success || !body.id) {
      return NextResponse.json({ success: false, message: "Invalid payload or ID missing" }, { status: 400 });
    }

    const data = validation.data;
    const updated = await prisma.facility.update({
      where: { id: body.id },
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline,
        category: data.category,
        description: data.description,
        imageUrl: data.imageUrl,
        features: data.features,
        displayOrder: data.displayOrder,
        isFeatured: data.isFeatured,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, facility: updated, message: "Facility updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update facility", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Facility ID required" }, { status: 400 });
    }

    await prisma.facility.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Facility deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete facility", error: String(error) },
      { status: 500 }
    );
  }
}
