import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  location: z.string().min(2),
  imageUrl: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch events", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        location: data.location,
        imageUrl: data.imageUrl || null,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, event, message: "Event created successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create event", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success || !body.id) {
      return NextResponse.json({ success: false, message: "Invalid payload or ID missing" }, { status: 400 });
    }

    const data = validation.data;
    const updated = await prisma.event.update({
      where: { id: body.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        location: data.location,
        imageUrl: data.imageUrl || null,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, event: updated, message: "Event updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update event", error: String(error) },
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

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Event deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete event", error: String(error) },
      { status: 500 }
    );
  }
}
