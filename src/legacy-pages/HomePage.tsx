import { HeroCarousel } from "../components/HeroCarousel";
import { PrioritySection } from "../components/PrioritySection";
import { MeetSection } from "../components/MeetSection";
import { CommunitySection } from "../components/CommunitySection";
import { Ward1Section } from "../components/Ward1Section";
import { CommitmentSection } from "../components/CommitmentSection";
import { ClosingCTA } from "../components/ClosingCTA";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <PrioritySection />
      <MeetSection />
      <CommunitySection />
      <Ward1Section />
      <CommitmentSection />
      <ClosingCTA />
    </>
  );
}
