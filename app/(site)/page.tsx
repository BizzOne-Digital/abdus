/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";
import { Priority } from "@/models/Priority";
import { LiquidGlass } from "@/components/LiquidGlass";

function sectionByKey(sections: any[], key: string) {
  return sections.find((s) => s.key === key);
}

export default async function HomePage() {
  await connectDB();
  const page: any = await Page.findOne({ slug: "home" }).lean();
  const priorities: any[] = await Priority.find({ published: true })
    .sort({ order: 1 })
    .lean();
  const sections = page?.sections || [];
  const hero = sectionByKey(sections, "hero");
  const closing = sectionByKey(sections, "closing");

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="bg"
          src={hero?.image || "/images/hero-bg.jpg"}
          alt=""
        />
        <div className="container cms-hero__inner">
          <p className="section__eyebrow">
            {hero?.body || "City Councillor · Ward 1"}
          </p>
          <h1>{hero?.title || "Strong Leadership. Better Oshawa."}</h1>
          <p>{hero?.subtitle || "Listening. Leading. Delivering."}</p>
          <div className="cms-hero__actions">
            <Link
              href={hero?.buttonLink || "/vision"}
              className="btn btn--primary btn--pill"
            >
              {hero?.buttonLabel || "Our Priorities"}
            </Link>
            <Link href="/about" className="btn btn--ghost btn--pill">
              Meet Shinwary
            </Link>
          </div>
        </div>
      </section>

      <section className="cms-section">
        <div className="container">
          <h2 className="section__title">A Practical Plan for Ward 1</h2>
          <div className="cms-card-grid" style={{ marginTop: "1.25rem" }}>
            {priorities.map((item) => (
              <LiquidGlass
                key={String(item._id)}
                className="cms-card"
                as="article"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cardImage || "/images/community-1.jpg"}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
                <p style={{ color: "var(--light-blue)" }}>
                  {item.shortDescription}
                </p>
                <Link
                  href={`/priorities/${item.slug}`}
                  style={{ color: "var(--warm-orange)" }}
                >
                  Learn more
                </Link>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </section>

      <section className="cms-hero" style={{ minHeight: "36vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="bg"
          src={closing?.image || "/images/hero-bg.jpg"}
          alt=""
        />
        <div className="container cms-hero__inner">
          <h2 className="section__title">
            {closing?.title || "Let's move Ward 1 forward."}
          </h2>
          <p>{closing?.subtitle}</p>
          <Link
            href={closing?.buttonLink || "/contact"}
            className="btn btn--primary btn--pill"
            style={{ marginTop: "1rem" }}
          >
            {closing?.buttonLabel || "Join the Campaign"}
          </Link>
        </div>
      </section>
    </>
  );
}
