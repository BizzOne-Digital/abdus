import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { sanitizeMongoUpdate } from "@/lib/sanitizeUpdate";
import { GalleryCategory } from "@/models/GalleryCategory";

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryCategory.find().sort({ name: 1 }).lean();
    return ok(items);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Failed to load gallery", 500);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  try {
    await connectDB();
    const body = await parseJson<Record<string, unknown>>(req);
    const update = sanitizeMongoUpdate(body);
    const slug = String(update.slug || "").trim();
    const name = String(update.name || "").trim();
    if (!slug || !name) return fail("Name and slug are required");

    const existing = await GalleryCategory.findOne({ slug }).lean();
    if (existing) return fail("Slug already exists", 409);

    const item = await GalleryCategory.create({
      name,
      slug,
      description: String(update.description || ""),
      images: Array.isArray(update.images) ? update.images : [],
    });
    return ok(item.toObject(), 201);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Create failed", 500);
  }
}
