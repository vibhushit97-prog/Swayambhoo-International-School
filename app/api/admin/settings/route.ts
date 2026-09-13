import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  description: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = settingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation error" }, { status: 400 });
    }

    const { key, value, description } = validation.data;
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });

    return NextResponse.json({
      success: true,
      setting,
      message: `Setting '${key}' updated successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update setting", error: String(error) },
      { status: 500 }
    );
  }
}
