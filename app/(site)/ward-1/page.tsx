import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { Ward1Section } from "@/components/home/Ward1Section";
import { CommitmentStrip } from "@/components/home/CommitmentStrip";
import { getCmsPage, sectionByKey } from "@/lib/cms";

export default async function Ward1Page() {
  const page = await getCmsPage("ward-1");
  const sections = page?.sections || [];
  const hero = sectionByKey(sections, "hero");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Ward 1 · Oshawa"}
        title={accentLastWord(hero?.title || "Ward 1 is Home")}
        lead={
          hero?.body ||
          "North Oshawa needs visible representation and a councillor who stays connected."
        }
        image="/images/hero-bg.jpg"
        ctaHref={hero?.buttonLink || "/donate"}
        ctaLabel={hero?.buttonLabel || "Donate"}
      />
      <Ward1Section data={sectionByKey(sections, "ward1")} />
      <CommitmentStrip />
    </>
  );
}
