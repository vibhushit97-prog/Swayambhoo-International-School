import { NextRequest, NextResponse } from "next/server";
import { retryEmail } from "@/lib/email/gmail";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await retryEmail(id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[Email Retry API Error]:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while retrying the email." },
      { status: 500 }
    );
  }
}
