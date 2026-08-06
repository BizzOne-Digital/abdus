import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { Page } from "@/models/Page";

export async function GET() {
  await connectDB();
  const pages = await Page.find({
    slug: { $nin: ["gallery", "testimonials", "faqs"] },
  })
    .sort({ title: 1 })
    .lean();
  return ok(pages);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  await connectDB();
  const body = await parseJson<Record<string, unknown>>(req);
  const page = await Page.create(body);
  return ok(page, 201);
}
