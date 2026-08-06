/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";
import { Testimonial } from "@/models/Testimonial";
import { TestimonialsSlider } from "@/components/site/TestimonialsSlider";

export default async function TestimonialsPage() {
  await connectDB();
  const page: any = await Page.findOne({ slug: "testimonials" }).lean();
  const hero = (page?.sections || []).find((s: any) => s.key === "hero");
  const items: any[] = await Testimonial.find({ published: true })
    .sort({ order: 1 })
    .lean();

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={hero?.image || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          <h1>{hero?.title || "Voices from Ward 1"}</h1>
          <p>{hero?.body}</p>
        </div>
      </section>
      <section className="cms-section">
        <div className="container" style={{ maxWidth: 760 }}>
          <TestimonialsSlider items={JSON.parse(JSON.stringify(items))} />
        </div>
      </section>
    </>
  );
}
