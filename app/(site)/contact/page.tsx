/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";
import { Settings } from "@/models/Settings";
import { LiquidGlass } from "@/components/LiquidGlass";

export default async function ContactPage() {
  await connectDB();
  const page: any = await Page.findOne({ slug: "contact" }).lean();
  const settings: any = await Settings.findOne({ key: "site" }).lean();
  const hero = (page?.sections || []).find((s: any) => s.key === "hero");

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={hero?.image || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          <h1>{hero?.title || "Contact"}</h1>
          <p>{hero?.body}</p>
        </div>
      </section>
      <section className="cms-section">
        <div className="container cms-card-grid">
          <LiquidGlass className="cms-card" as="article">
            <h3>Email</h3>
            <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
          </LiquidGlass>
          <LiquidGlass className="cms-card" as="article">
            <h3>Phone</h3>
            <a href={`tel:${String(settings?.phone || "").replace(/\s/g, "")}`}>
              {settings?.phone}
            </a>
          </LiquidGlass>
          <LiquidGlass className="cms-card" as="article">
            <h3>Location</h3>
            <p style={{ color: "var(--light-blue)" }}>{settings?.address}</p>
          </LiquidGlass>
        </div>
      </section>
    </>
  );
}
