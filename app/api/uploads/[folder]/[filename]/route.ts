import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { sanitizeFilename, isUploadFolder } from "@/lib/uploads";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ folder: string; filename: string }> };

export async function GET(_: NextRequest, ctx: Ctx) {
  const { folder, filename: rawFilename } = await ctx.params;

  if (!isUploadFolder(folder)) {
    return new NextResponse("Not found", { status: 404 });
  }

  let filename: string;
  try {
    filename = sanitizeFilename(rawFilename);
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }

  await connectDB();
  const doc = (await StoredUpload.findOne({ folder, filename }).lean()) as {
    mimeType?: string;
    data?: Buffer | { type: string; data: number[] };
  } | null;

  if (!doc?.data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const data = Buffer.isBuffer(doc.data)
    ? doc.data
    : Buffer.from((doc.data as { data: number[] }).data);

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType || "application/octet-stream",
      "Content-Length": String(data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
