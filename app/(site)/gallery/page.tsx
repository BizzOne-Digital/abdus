import { PageHero } from "@/components/home/PageHero";
import { GalleryPageContent } from "@/components/pages/gallery/GalleryPageContent";
import { getGalleryCategories } from "@/lib/cms";

export const metadata = {
  title: "Gallery | Vote Shinwary",
  description: "Photos and videos from the campaign and Ward 1 community.",
};

export default async function GalleryPage() {
  const categories = await getGalleryCategories();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Campaign <span className="accent">Moments</span>
          </>
        }
        lead="Photos and videos from Ward 1 events, outreach, and community life."
        image="/images/hero-bg.jpg"
        ctaHref="/contact"
        ctaLabel="Get Involved"
      />
      <GalleryPageContent categories={categories} />
    </>
  );
}
