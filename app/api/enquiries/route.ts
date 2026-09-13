import { NextRequest, NextResponse } from "next/server";
import { admissionEnquirySchema } from "@/lib/validations";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Strict Server-Side Validation via Zod
    const validationResult = admissionEnquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
          message: "Validation failed. Please correct the highlighted errors.",
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Database Persistence
    try {
      const enquiry = await prisma.admissionEnquiry.create({
        data: {
          studentName: data.studentName,
          parentName: data.parentName,
          phone: data.phone,
          whatsapp: data.whatsapp || null,
          email: data.email,
          currentClass: data.currentClass,
          applyingFor: data.applyingFor,
          academicSession: data.academicSession,
          message: data.message || null,
          status: "NEW",
        },
      });

      return NextResponse.json(
        {
          success: true,
          id: enquiry.id,
          persisted: true,
          message: "Your admission enquiry has been registered successfully. Our admissions counselor will contact you shortly.",
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("[Database Error in Admission Enquiry]:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Database temporary error. Please contact school administration directly via phone or WhatsApp.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[API Error /api/enquiries]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing the enquiry.",
      },
      { status: 500 }
    );
  }
}
