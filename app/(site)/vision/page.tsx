import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { VisionPageSections } from "@/components/pages/vision/VisionPageSections";
import { getCmsPage, getCmsPriorities, sectionByKey } from "@/lib/cms";

export default async function VisionPage() {
  const [page, priorities] = await Promise.all([
    getCmsPage("vision"),
    getCmsPriorities(),
  ]);
  const sections = page?.sections || [];
  const hero = sectionByKey(sections, "hero");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Vision"}
        title={accentLastWord(hero?.title || "A Practical Plan for Ward 1")}
        lead={
          hero?.body ||
          "Safer streets. Responsible spending. Stronger neighbourhood services."
        }
        image={hero?.image || "/images/hero-bg.jpg"}
        ctaHref={hero?.buttonLink || "/contact"}
        ctaLabel={hero?.buttonLabel || "Join the Campaign"}
      />
      <VisionPageSections
        intro={sectionByKey(sections, "intro")}
        priorities={priorities}
        approach={sectionByKey(sections, "approach")}
      />
    </>
  );
}
