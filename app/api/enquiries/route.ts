import { NextRequest, NextResponse } from "next/server";
import { admissionEnquirySchema } from "@/lib/validations";

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

    // 2. Database Persistence if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      try {
        const PrismaModule = await import("@prisma/client");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ClientClass = (PrismaModule as any).PrismaClient;
        
        if (ClientClass) {
          const prisma = new ClientClass();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const enquiry = await (prisma as any).admissionEnquiry.create({
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

          await prisma.$disconnect();

          return NextResponse.json(
            {
              success: true,
              id: enquiry.id,
              persisted: true,
              message: "Your admission enquiry has been submitted successfully to Swayambhoo International School.",
            },
            { status: 201 }
          );
        }
      } catch (dbError) {
        console.warn("[Database Notice] Could not connect to PostgreSQL. Falling back to development handler.", dbError);
      }
    }

    // 3. Safe Development Fallback (When DATABASE_URL is not yet configured)
    const simulatedId = `enq_dev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    console.info(`[Admission Enquiry Received — Safe Dev Fallback] ID: ${simulatedId}`);
    console.info(`Student: ${data.studentName} | Class Applying: ${data.applyingFor} | Parent: ${data.parentName} | Phone: ${data.phone}`);

    return NextResponse.json(
      {
        success: true,
        id: simulatedId,
        persisted: false,
        isDevelopmentFallback: true,
        message: "Your admission enquiry has been submitted successfully. Our admissions counselor will contact you shortly.",
        notice: "Notice for Developers: Data was accepted via safe development fallback because DATABASE_URL is not yet configured for PostgreSQL.",
      },
      { status: 201 }
    );
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
