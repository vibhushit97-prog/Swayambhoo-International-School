import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(2),
  motto: z.string().min(2),
  campusMotto: z.string().min(2),
  description: z.string().min(10),
  addressStreet: z.string().min(2),
  addressLocality: z.string().min(2),
  addressCity: z.string().min(2),
  addressState: z.string().min(2),
  addressPincode: z.string().min(6),
  phone: z.string().min(5),
  whatsapp: z.string().min(5),
  email: z.string().email(),
  admissionsEmail: z.string().email(),
  logoUrl: z.string().min(1),
  heroImageUrl: z.string().min(1),
  socialLinks: z.record(z.string(), z.string()).optional(),
  admissionCtaTitle: z.string().min(2),
  admissionCtaSubtitle: z.string().min(2),
  footerText: z.string().min(2),
});

export async function GET() {
  try {
    const profile = await prisma.schoolProfile.findUnique({
      where: { id: "school-profile-main" },
    });
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch school profile", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const updated = await prisma.schoolProfile.upsert({
      where: { id: "school-profile-main" },
      update: data,
      create: {
        id: "school-profile-main",
        ...data,
      },
    });

    return NextResponse.json({
      success: true,
      profile: updated,
      message: "School profile updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update school profile", error: String(error) },
      { status: 500 }
    );
  }
}
