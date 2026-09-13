import { NextRequest, NextResponse } from "next/server";
import { getStorageProvider, validateUploadFile } from "@/lib/storage";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const validation = validateUploadFile(file.size, file.type);
    if (!validation.valid) {
      return NextResponse.json({ success: false, message: validation.error }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const storage = getStorageProvider();
    const result = await storage.upload(buffer, file.name, file.type, folder);

    // Record asset in database
    const asset = await prisma.mediaAsset.create({
      data: {
        key: result.key,
        filename: result.filename,
        url: result.url,
        mimeType: result.mimeType,
        size: result.size,
        provider: process.env.STORAGE_PROVIDER || "local",
        altText: altText || file.name,
      },
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
      asset,
      message: "File uploaded successfully.",
    });
  } catch (error) {
    console.error("[Upload Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file", error: String(error) },
      { status: 500 }
    );
  }
}
