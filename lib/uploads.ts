import { randomBytes } from "crypto";
import path from "path";
import { connectDB } from "@/lib/db";
import { StoredUpload } from "@/models/StoredUpload";

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export function uploadPublicUrl(folder: UploadFolder, filename: string) {
  return `/api/uploads/${folder}/${filename}`;
}

export function parseStoredUploadUrl(
  url?: string | null,
): { folder: UploadFolder; filename: string } | null {
  if (!url || !url.startsWith("/api/uploads/")) return null;
  const parts = url.replace(/^\/api\/uploads\//, "").split("/");
  if (parts.length !== 2) return null;
  const [folder, filename] = parts;
  if (!folder || !filename || !isUploadFolder(folder)) return null;
  if (filename.includes("..") || filename.includes("/")) return null;
  return { folder, filename };
}

export function generateUploadFilename(mimeType: string) {
  const ext = EXT_BY_MIME[mimeType] || "bin";
  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export async function deleteStoredUpload(url?: string | null) {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}

export function sanitizeFilename(filename: string) {
  const base = path.basename(filename);
  if (!base || base.includes("..") || base.includes("/")) {
    throw new Error("Invalid filename");
  }
  return base;
}
