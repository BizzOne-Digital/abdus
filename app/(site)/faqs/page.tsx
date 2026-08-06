/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";
import { Faq } from "@/models/Faq";

export default async function FaqsPage() {
  await connectDB();
  const page: any = await Page.findOne({ slug: "faqs" }).lean();
  const hero = (page?.sections || []).find((s: any) => s.key === "hero");
  const faqs: any[] = await Faq.find({ published: true }).sort({ order: 1 }).lean();

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={hero?.image || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          <h1>{hero?.title || "FAQs"}</h1>
          <p>{hero?.body}</p>
        </div>
      </section>
      <section className="cms-section">
        <div className="container" style={{ display: "grid", gap: "0.85rem" }}>
          {faqs.map((faq) => (
            <details
              key={String(faq._id)}
              className="liquid-glass"
              style={{ padding: "1rem 1.15rem", borderRadius: 18 }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {faq.question}
              </summary>
              <p style={{ color: "var(--light-blue)", marginTop: "0.75rem" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
