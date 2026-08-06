import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { GalleryCategory } from "@/models/GalleryCategory";

export async function GET() {
  await connectDB();
  const items = await GalleryCategory.find().sort({ name: 1 }).lean();
  return ok(items);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  await connectDB();
  const body = await parseJson<Record<string, unknown>>(req);
  if (!body.name || !body.slug) return fail("name and slug required");
  const created = await GalleryCategory.create(body);
  return ok(created, 201);
}
