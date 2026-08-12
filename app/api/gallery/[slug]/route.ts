import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { sanitizeMongoUpdate } from "@/lib/sanitizeUpdate";
import { revalidateGalleryPage } from "@/lib/revalidateSite";
import { GalleryCategory } from "@/models/GalleryCategory";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;
    await connectDB();
    const item = await GalleryCategory.findOne({ slug }).lean();
    if (!item) return fail("Not found", 404);
    return ok(item);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Failed to load", 500);
  }
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  try {
    const { slug } = await ctx.params;
    await connectDB();
    const body = await parseJson<Record<string, unknown>>(req);
    const update = sanitizeMongoUpdate(body);
    delete update.slug;
    const item = await GalleryCategory.findOneAndUpdate(
      { slug },
      { $set: update },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
    if (!item) return fail("Not found", 404);
    revalidateGalleryPage();
    return ok(item);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Save failed", 500);
  }
}

export async function DELETE(_: Request, ctx: Ctx) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  try {
    const { slug } = await ctx.params;
    await connectDB();
    await GalleryCategory.findOneAndDelete({ slug });
    return ok({ ok: true });
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Delete failed", 500);
  }
}
