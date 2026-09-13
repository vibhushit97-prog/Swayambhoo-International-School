import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export interface RecruitmentDocUploadResult {
  storageKey: string;
  filename: string;
  originalFilename: string;
  size: number;
  mimeType: string;
}

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
]);

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".doc",
  ".docx",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per document

export function validateRecruitmentDocument(
  size: number,
  mimeType: string,
  filename: string
): { valid: boolean; error?: string } {
  if (size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds the maximum limit of 10MB." };
  }

  const ext = path.extname(filename).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Invalid file extension (${ext}). Supported formats: PDF, JPG, PNG, DOC, DOCX.`,
    };
  }

  // Some browsers send generic octet-stream for docx
  if (!ALLOWED_MIME_TYPES.has(mimeType) && mimeType !== "application/octet-stream") {
    return {
      valid: false,
      error: `Invalid MIME type (${mimeType}). Supported formats: PDF, JPG, PNG, DOC, DOCX.`,
    };
  }

  return { valid: true };
}

/**
 * Save private recruitment document on disk outside of public directory.
 * Path: <project-root>/storage/recruitment_docs/<applicationNumberOrTemp>/<uniqueFile>
 */
export async function savePrivateDocument(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string,
  subFolder: string = "temp"
): Promise<RecruitmentDocUploadResult> {
  const baseDir = path.join(process.cwd(), "storage", "recruitment_docs", subFolder);
  await fs.mkdir(baseDir, { recursive: true });

  const ext = path.extname(originalFilename).toLowerCase();
  const safeName = path
    .basename(originalFilename, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 50)
    .toLowerCase();

  const hash = crypto.randomBytes(8).toString("hex");
  const uniqueFilename = `${safeName}_${hash}${ext}`;
  const absolutePath = path.join(baseDir, uniqueFilename);

  await fs.writeFile(absolutePath, buffer);

  // Storage key is relative to project root storage
  const storageKey = `storage/recruitment_docs/${subFolder}/${uniqueFilename}`;

  return {
    storageKey,
    filename: uniqueFilename,
    originalFilename,
    size: buffer.length,
    mimeType,
  };
}

/**
 * Retrieve private document buffer from disk
 */
export async function readPrivateDocument(
  storageKey: string
): Promise<{ buffer: Buffer; exists: boolean }> {
  try {
    // Sanitize to prevent path traversal
    const safeKey = storageKey.replace(/\.\./g, "").replace(/^\/+/, "");
    // Statically scope path to storage directory
    const parts = safeKey.split(/[\/\\]/).filter(Boolean);
    const subFolder = parts.length >= 3 ? parts[parts.length - 2] : "applications";
    const filename = parts[parts.length - 1];
    const absolutePath = path.join(process.cwd(), "storage", "recruitment_docs", subFolder, filename);

    const buffer = await fs.readFile(absolutePath);
    return { buffer, exists: true };
  } catch {
    return { buffer: Buffer.alloc(0), exists: false };
  }
}
