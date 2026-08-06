import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { Testimonial } from "@/models/Testimonial";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  const { id } = await ctx.params;
  await connectDB();
  const body = await parseJson<Record<string, unknown>>(req);
  const item = await Testimonial.findByIdAndUpdate(id, body, { new: true }).lean();
  if (!item) return fail("Not found", 404);
  return ok(item);
}

export async function DELETE(_: Request, ctx: Ctx) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  const { id } = await ctx.params;
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
  return ok({ ok: true });
}
