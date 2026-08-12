import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { applyNestedUpdate, buildSanitizedUpdate } from "@/lib/persistCms";
import { revalidatePublicPage } from "@/lib/revalidateSite";
import { Page } from "@/models/Page";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;
    await connectDB();
    const page = await Page.findOne({ slug }).lean();
    if (!page) return fail("Page not found", 404);
    return ok(page);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Failed to load page", 500);
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
    const update = buildSanitizedUpdate(body);

    const page = await Page.findOne({ slug });
    if (!page) return fail("Page not found", 404);

    if (typeof update.title === "string") page.title = update.title;
    if (typeof update.seoDescription === "string") {
      page.seoDescription = update.seoDescription;
    }
    if (update.status === "published" || update.status === "draft") {
      page.status = update.status;
    }

    applyNestedUpdate(page, update, ["sections"]);
    await page.save();

    const saved = page.toObject();
    revalidatePublicPage(slug);
    return ok(saved);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Save failed", 500);
  }
}
