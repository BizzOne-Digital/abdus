/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";

const RESERVED = new Set([
  "about",
  "vision",
  "ward-1",
  "community",
  "contact",
  "gallery",
  "testimonials",
  "faqs",
  "priorities",
  "admin",
]);

function getSection(sections: any[], key: string) {
  return sections.find((s) => s.key === key);
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED.has(slug)) notFound();

  await connectDB();
  const page: any = await Page.findOne({ slug }).lean();
  if (!page) notFound();

  const sections = page.sections || [];
  const hero = getSection(sections, "hero") || sections[0];

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={hero?.image || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          {hero?.subtitle ? (
            <p className="section__eyebrow">{hero.subtitle}</p>
          ) : null}
          <h1>{hero?.title || page.title}</h1>
          <p>{hero?.body}</p>
        </div>
      </section>

      <section className="cms-section">
        <div className="container cms-prose">
          {sections
            .filter((s: any) => s.key !== "hero")
            .map((section: any, i: number) => (
              <article key={String(section.key) + i} className="liquid-glass">
                <h2
                  className="section__title"
                  style={{ fontSize: "clamp(1.35rem, 5vw, 1.8rem)" }}
                >
                  {section.title || ""}
                </h2>
                {section.body ? (
                  <p style={{ color: "var(--light-blue)", marginTop: "0.65rem" }}>
                    {section.body}
                  </p>
                ) : null}
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
