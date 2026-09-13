import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(5),
  content: z.string().min(10),
  featuredImage: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  publishDate: z.string().optional(),
});

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { publishDate: "desc" },
    });
    return NextResponse.json({ success: true, announcements });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch announcements", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = announcementSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const item = await prisma.announcement.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        featuredImage: data.featuredImage || null,
        status: data.status,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
      },
    });

    return NextResponse.json({ success: true, announcement: item, message: "Announcement published." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create announcement", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = announcementSchema.safeParse(body);

    if (!validation.success || !body.id) {
      return NextResponse.json({ success: false, message: "Invalid payload or ID missing" }, { status: 400 });
    }

    const data = validation.data;
    const updated = await prisma.announcement.update({
      where: { id: body.id },
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        featuredImage: data.featuredImage || null,
        status: data.status,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, announcement: updated, message: "Announcement updated." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update announcement", error: String(error) },
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

    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Announcement deleted." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete announcement", error: String(error) },
      { status: 500 }
    );
  }
}
