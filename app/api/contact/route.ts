import { NextRequest, NextResponse } from "next/server";
import { contactMessageSchema } from "@/lib/validations";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactMessageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted errors.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const message = await prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: "UNREAD",
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: message.id,
        message: "Your message has been delivered to Swayambhoo International School administration.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
