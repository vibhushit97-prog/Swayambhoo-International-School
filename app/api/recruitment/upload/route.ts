import { NextRequest, NextResponse } from "next/server";
import {
  validateRecruitmentDocument,
  savePrivateDocument,
} from "@/lib/storage/recruitment-storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const documentType = (formData.get("documentType") as string) || "Other";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file was uploaded." },
        { status: 400 }
      );
    }

    // Validate size, extension, MIME type
    const validation = validateRecruitmentDocument(file.size, file.type, file.name);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to private disk location
    const result = await savePrivateDocument(
      buffer,
      file.name,
      file.type,
      "applications"
    );

    return NextResponse.json({
      success: true,
      document: {
        documentType,
        filename: file.name,
        storageKey: result.storageKey,
        mimeType: result.mimeType,
        fileSize: result.size,
      },
      message: `${file.name} uploaded successfully.`,
    });
  } catch (error) {
    console.error("[Recruitment Upload Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload document." },
      { status: 500 }
    );
  }
}
