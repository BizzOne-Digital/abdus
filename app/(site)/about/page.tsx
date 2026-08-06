import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { MeetSection } from "@/components/home/MeetSection";
import { CommitmentSection } from "@/components/home/CommitmentSection";
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
        image={hero?.image}
        ctaHref={hero?.buttonLink || "/contact"}
        ctaLabel={hero?.buttonLabel || "Meet Shinwary"}
        withWave
        waveColor="#F7F3EA"
      />
      <MeetSection
        meet={sectionByKey(sections, "meet")}
        quote={sectionByKey(sections, "quote")}
      />
      <CommitmentSection data={sectionByKey(sections, "commitment")} />
    </>
  );
}
