import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const imageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  altText: z.string().min(2),
  imageUrl: z.string().min(1),
  storageKey: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  isConcept: z.boolean().default(false),
  sortOrder: z.number().default(0),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().nullable(),
  sortOrder: z.number().default(0),
});

export async function GET() {
  try {
    const categories = await prisma.galleryCategory.findMany({
      orderBy: { sortOrder: "asc" },
    });
    const images = await prisma.galleryImage.findMany({
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, categories, images });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery data", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if creating category
    if (body.isCategory) {
      const catVal = categorySchema.safeParse(body);
      if (!catVal.success) {
        return NextResponse.json({ success: false, message: "Invalid category data" }, { status: 400 });
      }
      const cat = await prisma.galleryCategory.create({ data: catVal.data });
      return NextResponse.json({ success: true, category: cat, message: "Category created." });
    }

    // Creating image
    const imgVal = imageSchema.safeParse(body);
    if (!imgVal.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: imgVal.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = imgVal.data;
    const image = await prisma.galleryImage.create({
      data: {
        title: data.title,
        description: data.description || null,
        altText: data.altText,
        imageUrl: data.imageUrl,
        storageKey: data.storageKey || null,
        categoryId: data.categoryId || null,
        isConcept: data.isConcept,
        sortOrder: data.sortOrder,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, image, message: "Gallery image added successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create gallery item", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle bulk sort reordering
    if (Array.isArray(body.reorder)) {
      for (const item of body.reorder) {
        if (item.id && typeof item.sortOrder === "number") {
          await prisma.galleryImage.update({
            where: { id: item.id },
            data: { sortOrder: item.sortOrder },
          });
        }
      }
      return NextResponse.json({ success: true, message: "Sort orders updated successfully." });
    }

    const imgVal = imageSchema.safeParse(body);
    if (!imgVal.success || !body.id) {
      return NextResponse.json({ success: false, message: "Invalid payload or ID missing" }, { status: 400 });
    }

    const data = imgVal.data;
    const updated = await prisma.galleryImage.update({
      where: { id: body.id },
      data: {
        title: data.title,
        description: data.description || null,
        altText: data.altText,
        imageUrl: data.imageUrl,
        storageKey: data.storageKey || null,
        categoryId: data.categoryId || null,
        isConcept: data.isConcept,
        sortOrder: data.sortOrder,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, image: updated, message: "Image updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update image", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Image ID required" }, { status: 400 });
    }

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Image deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete image", error: String(error) },
      { status: 500 }
    );
  }
}
