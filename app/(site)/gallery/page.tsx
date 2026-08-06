/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";
import { GalleryCategory } from "@/models/GalleryCategory";

export default async function GalleryPage() {
  await connectDB();
  const page: any = await Page.findOne({ slug: "gallery" }).lean();
  const hero = (page?.sections || []).find((s: any) => s.key === "hero");
  const categories: any[] = await GalleryCategory.find().sort({ name: 1 }).lean();

  return (
    <>
      <section className="cms-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={hero?.image || "/images/hero-bg.jpg"} alt="" />
        <div className="container cms-hero__inner">
          <h1>{hero?.title || "Campaign Gallery"}</h1>
          <p>{hero?.body}</p>
        </div>
      </section>
      <section className="cms-section">
        <div className="container" style={{ display: "grid", gap: "2rem" }}>
          {categories.map((cat) => (
            <div key={String(cat._id)}>
              <h2 className="section__title" style={{ fontSize: "1.8rem" }}>
                {cat.name}
              </h2>
              <p style={{ color: "var(--light-blue)" }}>{cat.description}</p>
              <div className="cms-card-grid" style={{ marginTop: "1rem" }}>
                {(cat.images || []).map((img: any, i: number) => (
                  <figure key={i} style={{ margin: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt || cat.name}
                      style={{
                        width: "100%",
                        aspectRatio: "4/3",
                        objectFit: "cover",
                        borderRadius: 18,
                      }}
                    />
                    {img.caption ? (
                      <figcaption
                        style={{ marginTop: "0.5rem", color: "var(--cyan)" }}
                      >
                        {img.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
