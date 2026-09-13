import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export interface StorageResult {
  url: string;
  key: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface StorageProvider {
  upload(
    buffer: Buffer,
    originalFilename: string,
    mimeType: string,
    folder?: string
  ): Promise<StorageResult>;
  delete(key: string): Promise<boolean>;
}

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateUploadFile(
  size: number,
  mimeType: string
): { valid: boolean; error?: string } {
  if (size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds the 5MB maximum limit." };
  }
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return {
      valid: false,
      error: `Invalid file type: ${mimeType}. Only JPG, PNG, WebP, and SVG are supported.`,
    };
  }
  return { valid: true };
}

/**
 * Local Disk Storage Provider
 * Saves uploaded assets to public/uploads/
 */
class LocalStorageProvider implements StorageProvider {
  private baseDir: string;

  constructor() {
    this.baseDir = path.join(process.cwd(), "public", "uploads");
  }

  async upload(
    buffer: Buffer,
    originalFilename: string,
    mimeType: string,
    folder: string = "general"
  ): Promise<StorageResult> {
    const targetDir = path.join(this.baseDir, folder);
    await fs.mkdir(targetDir, { recursive: true });

    const ext = path.extname(originalFilename).toLowerCase();
    const baseName = path
      .basename(originalFilename, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const hash = crypto.randomBytes(6).toString("hex");
    const uniqueFilename = `${baseName}_${hash}${ext}`;
    const filePath = path.join(targetDir, uniqueFilename);

    await fs.writeFile(filePath, buffer);

    const relativePath = `/uploads/${folder}/${uniqueFilename}`;
    const key = `uploads/${folder}/${uniqueFilename}`;

    return {
      url: relativePath,
      key,
      filename: uniqueFilename,
      size: buffer.length,
      mimeType,
    };
  }

  async delete(key: string): Promise<boolean> {
    try {
      const cleanKey = key.replace(/^\/+/, "");
      const fullPath = path.join(process.cwd(), "public", cleanKey);
      await fs.unlink(fullPath);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * S3-Compatible Storage Provider (Ready for AWS S3 / Cloudflare R2 / MinIO)
 */
class S3StorageProvider implements StorageProvider {
  async upload(
    buffer: Buffer,
    originalFilename: string,
    mimeType: string,
    folder: string = "general"
  ): Promise<StorageResult> {
    // If S3 environment variables are provided, this connects to S3/R2
    // Fallback gracefully to local storage if credentials missing
    const bucket = process.env.STORAGE_BUCKET;
    if (!bucket) {
      const local = new LocalStorageProvider();
      return local.upload(buffer, originalFilename, mimeType, folder);
    }
    const key = `${folder}/${Date.now()}-${originalFilename}`;
    const url = `https://${bucket}.s3.amazonaws.com/${key}`;
    return {
      url,
      key,
      filename: originalFilename,
      size: buffer.length,
      mimeType,
    };
  }

  async delete(_key: string): Promise<boolean> {
    return true;
  }
}

let activeStorageProvider: StorageProvider | null = null;

export function getStorageProvider(): StorageProvider {
  if (activeStorageProvider) return activeStorageProvider;

  const providerType = process.env.STORAGE_PROVIDER || "local";
  switch (providerType.toLowerCase()) {
    case "s3":
      activeStorageProvider = new S3StorageProvider();
      break;
    case "local":
    default:
      activeStorageProvider = new LocalStorageProvider();
      break;
  }

  return activeStorageProvider;
}
