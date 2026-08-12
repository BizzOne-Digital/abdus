import { HeroCarousel } from "@/components/home/HeroCarousel";
import { MeetSection } from "@/components/home/MeetSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { Ward1Section } from "@/components/home/Ward1Section";
import { CommitmentSection } from "@/components/home/CommitmentSection";
import { CommitmentStrip } from "@/components/home/CommitmentStrip";
import {
  getCmsPage,
  getCmsPriorities,
  getCmsSettings,
  sectionByKey,
} from "@/lib/cms";

export default async function HomePage() {
  const [page, priorities, settings] = await Promise.all([
    getCmsPage("home"),
    getCmsPriorities(),
    getCmsSettings(),
  ]);
  const sections = page?.sections || [];

  return (
    <>
      <HeroCarousel
        hero={sectionByKey(sections, "hero")}
        heroMeet={sectionByKey(sections, "hero-meet")}
        heroPlan={sectionByKey(sections, "hero-plan")}
        priorities={priorities}
      />
      <MeetSection
        meet={sectionByKey(sections, "meet")}
        quote={sectionByKey(sections, "quote")}
      />
      <CommunitySection
        community={sectionByKey(sections, "community")}
        advocacy={sectionByKey(sections, "advocacy")}
      />
      <Ward1Section data={sectionByKey(sections, "ward1")} />
      <CommitmentSection data={sectionByKey(sections, "commitment")} />
      <CommitmentStrip
        data={sectionByKey(sections, "closing")}
        email={settings.email}
      />
    </>
  );
}
