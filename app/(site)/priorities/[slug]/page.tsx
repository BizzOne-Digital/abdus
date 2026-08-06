/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Priority } from "@/models/Priority";
import { notFound } from "next/navigation";

export default async function PriorityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const item: any = await Priority.findOne({ slug, published: true }).lean();
  if (!item) notFound();

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={item.cardImage || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          <h1>{item.title}</h1>
          <p>{item.shortDescription}</p>
        </div>
      </section>
      <section className="cms-section">
        <div className="container cms-prose">
          {(item.detailSections || []).map((section: any, i: number) => (
            <article
              key={section.key + i}
              className="liquid-glass"
            >
              <h2 className="section__title" style={{ fontSize: "clamp(1.35rem, 5vw, 1.8rem)" }}>
                {section.title}
              </h2>
              <p style={{ color: "var(--light-blue)", marginTop: "0.65rem" }}>
                {section.body}
              </p>
              {section.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={section.image} alt="" />
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
