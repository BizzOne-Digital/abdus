import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { fail, ok } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return fail("No file uploaded");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  return ok({ url: `/uploads/${filename}` });
}
