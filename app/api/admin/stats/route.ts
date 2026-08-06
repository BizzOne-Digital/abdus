import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok } from "@/lib/api";
import { Page } from "@/models/Page";
import { Priority } from "@/models/Priority";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  await connectDB();
  const [pages, priorities] = await Promise.all([
    Page.countDocuments({
      slug: { $nin: ["gallery", "testimonials", "faqs"] },
    }),
    Priority.countDocuments(),
  ]);
  return ok({ pages, priorities });
}
