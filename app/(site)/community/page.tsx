import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { CommunityPageSections } from "@/components/pages/community/CommunityPageSections";
import { getCmsPage, sectionByKey } from "@/lib/cms";

export default async function CommunityPage() {
  const page = await getCmsPage("community");
  const sections = page?.sections || [];
  const hero = sectionByKey(sections, "hero");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Community"}
        title={accentLastWord(hero?.title || "Rooted in Community")}
        lead={
          hero?.body ||
          "Showing up. Listening. Working together for Ward 1."
        }
        image="/images/hero-bg.jpg"
        ctaHref={hero?.buttonLink || "/contact"}
        ctaLabel={hero?.buttonLabel || "Get Involved"}
        withWave
        waveColor="#ffffff"
      />
      <CommunityPageSections
        intro={sectionByKey(sections, "intro")}
        gallery={sectionByKey(sections, "gallery")}
        advocacy={sectionByKey(sections, "advocacy")}
        involve={sectionByKey(sections, "involve")}
      />
    </>
  );
}
