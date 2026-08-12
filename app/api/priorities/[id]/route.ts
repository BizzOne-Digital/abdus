import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { applyNestedUpdate, buildSanitizedUpdate } from "@/lib/persistCms";
import { revalidatePriorityDetail } from "@/lib/revalidateSite";
import { Priority } from "@/models/Priority";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    await connectDB();
    const item = await Priority.findById(id).lean();
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
    const { id } = await ctx.params;
    await connectDB();
    const body = await parseJson<Record<string, unknown>>(req);
    const update = buildSanitizedUpdate(body);

    const item = await Priority.findById(id);
    if (!item) return fail("Not found", 404);

    if (typeof update.title === "string") item.title = update.title;
    if (typeof update.slug === "string") item.slug = update.slug;
    if (typeof update.shortDescription === "string") {
      item.shortDescription = update.shortDescription;
    }
    if (typeof update.cardImage === "string") item.cardImage = update.cardImage;
    if (typeof update.icon === "string") item.icon = update.icon;
    if (typeof update.order === "number") item.order = update.order;
    if (typeof update.published === "boolean") item.published = update.published;

    applyNestedUpdate(item, update, ["detailSections"]);
    await item.save();

    const saved = item.toObject();
    revalidatePriorityDetail(String(saved.slug || ""));
    return ok(saved);
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
  const { id } = await ctx.params;
  await connectDB();
  await Priority.findByIdAndDelete(id);
  return ok({ ok: true });
}
