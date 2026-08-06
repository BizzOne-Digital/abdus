import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { AboutPageSections } from "@/components/pages/about/AboutPageSections";
import { getCmsPage, sectionByKey } from "@/lib/cms";

export default async function AboutPage() {
  const page = await getCmsPage("about");
  const sections = page?.sections || [];
  const hero = sectionByKey(sections, "hero");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Meet Shinwary"}
        title={accentLastWord(hero?.title || "Experience that Serves")}
        lead={
          hero?.body ||
          "A practical leader shaped by service, perseverance and respect for community in Ward 1."
        }
        image={hero?.image || "/images/hero-bg.jpg"}
        ctaHref={hero?.buttonLink || "/contact"}
        ctaLabel={hero?.buttonLabel || "Meet Shinwary"}
        withWave
        waveColor="#F7F3EA"
      />
      <AboutPageSections
        story={sectionByKey(sections, "story")}
        timeline={sectionByKey(sections, "timeline")}
        values={sectionByKey(sections, "values")}
        quote={sectionByKey(sections, "quote")}
      />
    </>
  );
}
