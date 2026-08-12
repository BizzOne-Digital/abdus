import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { sanitizeMongoUpdate } from "@/lib/sanitizeUpdate";
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
    const update = sanitizeMongoUpdate(body);
    const item = await Priority.findByIdAndUpdate(
      id,
      { $set: update },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
    if (!item) return fail("Not found", 404);
    const saved = item as { slug?: string };
    revalidatePriorityDetail(String(saved.slug || ""));
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
  const { id } = await ctx.params;
  await connectDB();
  await Priority.findByIdAndDelete(id);
  return ok({ ok: true });
}
