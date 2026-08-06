import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { PrioritySection } from "@/components/home/PrioritySection";
import { CommitmentSection } from "@/components/home/CommitmentSection";
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
        image={hero?.image}
        ctaHref={hero?.buttonLink || "/contact"}
        ctaLabel={hero?.buttonLabel || "Join the Campaign"}
      />
      <PrioritySection
        heading={sectionByKey(sections, "priorities")}
        priorities={priorities}
      />
      <CommitmentSection data={sectionByKey(sections, "commitment")} />
    </>
  );
}
