import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { Ward1Section } from "@/components/home/Ward1Section";
import { CommitmentSection } from "@/components/home/CommitmentSection";
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
          "North Oshawa deserves visible representation, smart investment and a councillor who stays connected."
        }
        image={hero?.image}
        ctaHref={hero?.buttonLink || "/contact"}
        ctaLabel={hero?.buttonLabel || "Get Involved"}
      />
      <Ward1Section data={sectionByKey(sections, "ward1")} />
      <CommitmentSection data={sectionByKey(sections, "commitment")} />
    </>
  );
}
