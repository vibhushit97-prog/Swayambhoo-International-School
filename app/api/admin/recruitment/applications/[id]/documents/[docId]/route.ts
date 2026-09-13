import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { readPrivateDocument } from "@/lib/storage/recruitment-storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  try {
    const { id, docId } = await params;

    const document = await prisma.applicationDocument.findFirst({
      where: {
        id: docId,
        applicationId: id,
      },
    });

    if (!document) {
      return NextResponse.json(
        { success: false, message: "Document not found." },
        { status: 404 }
      );
    }

    const { buffer, exists } = await readPrivateDocument(document.storageKey);
    if (!exists || buffer.length === 0) {
      return NextResponse.json(
        { success: false, message: "Document file not found in secure storage." },
        { status: 404 }
      );
    }

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": document.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(document.filename)}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[Secure Document Stream Error]:", error);
    return NextResponse.json(
      { success: false, message: "Error streaming document" },
      { status: 500 }
    );
  }
}
