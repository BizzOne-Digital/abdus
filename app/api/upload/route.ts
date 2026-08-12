import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { fail, ok } from "@/lib/api";
import { connectDB } from "@/lib/db";
import {
  ALLOWED_MIME,
  MAX_UPLOAD_BYTES,
  deleteStoredUpload,
  generateUploadFilename,
  isUploadFolder,
  uploadPublicUrl,
} from "@/lib/uploads";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "misc");

    if (!file || !(file instanceof File)) {
      return fail("No file uploaded");
    }
    if (!isUploadFolder(folderRaw)) {
      return fail("Invalid folder");
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return fail("Invalid file type. Use JPEG, PNG, WebP, or GIF.");
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return fail("File too large (max 8MB)");
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const filename = generateUploadFilename(file.type);

    await connectDB();
    await StoredUpload.create({
      folder: folderRaw,
      filename,
      mimeType: file.type,
      size: bytes.length,
      data: bytes,
    });

    return ok({
      success: true,
      url: uploadPublicUrl(folderRaw, filename),
      filename,
      size: bytes.length,
      folder: folderRaw,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    if (message.includes("duplicate key")) {
      return fail("Upload conflict — please try again", 409);
    }
    return fail(message, 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  try {
    const body = (await req.json()) as { url?: string };
    if (!body.url) return fail("Missing url");
    const deleted = await deleteStoredUpload(body.url);
    if (!deleted) return fail("Upload not found", 404);
    return ok({ success: true });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Delete failed", 500);
  }
}
