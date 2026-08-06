/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Priority } from "@/models/Priority";
import { Page } from "@/models/Page";
import { LiquidGlass } from "@/components/LiquidGlass";

export default async function VisionPage() {
  await connectDB();
  const page: any = await Page.findOne({ slug: "vision" }).lean();
  const hero = (page?.sections || []).find((s: any) => s.key === "hero");
  const priorities: any[] = await Priority.find({ published: true })
    .sort({ order: 1 })
    .lean();

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={hero?.image || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          <h1>{hero?.title || "A Practical Plan for Ward 1"}</h1>
          <p>{hero?.body}</p>
        </div>
      </section>
      <section className="cms-section">
        <div className="container cms-card-grid">
          {priorities.map((item) => (
            <LiquidGlass key={String(item._id)} className="cms-card" as="article">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.cardImage || "/images/community-1.jpg"} alt={item.title} />
              <h3>{item.title}</h3>
              <p style={{ color: "var(--light-blue)" }}>{item.shortDescription}</p>
              <Link href={`/priorities/${item.slug}`} style={{ color: "var(--warm-orange)" }}>
                View details
              </Link>
            </LiquidGlass>
          ))}
        </div>
      </section>
    </>
  );
}
