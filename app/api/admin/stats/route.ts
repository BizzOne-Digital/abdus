import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok } from "@/lib/api";
import { Page } from "@/models/Page";
import { Priority } from "@/models/Priority";
import { GalleryCategory } from "@/models/GalleryCategory";
import { Testimonial } from "@/models/Testimonial";
import { Faq } from "@/models/Faq";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  await connectDB();
  const [pages, priorities, gallery, testimonials, faqs] = await Promise.all([
    Page.countDocuments(),
    Priority.countDocuments(),
    GalleryCategory.countDocuments(),
    Testimonial.countDocuments(),
    Faq.countDocuments(),
  ]);
  return ok({ pages, priorities, gallery, testimonials, faqs });
}
