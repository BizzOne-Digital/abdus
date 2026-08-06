import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { Page } from "@/models/Page";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  await connectDB();
  const page = await Page.findOne({ slug }).lean();
  if (!page) return fail("Page not found", 404);
  return ok(page);
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  const { slug } = await ctx.params;
  await connectDB();
  const body = await parseJson<Record<string, unknown>>(req);
  const page = await Page.findOneAndUpdate({ slug }, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!page) return fail("Page not found", 404);
  return ok(page);
}
