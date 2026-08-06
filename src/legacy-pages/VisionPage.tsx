import { PageHero } from "../components/PageHero";
import { PrioritySection } from "../components/PrioritySection";
import { CommitmentSection } from "../components/CommitmentSection";

export function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision"
        title={
          <>
            A Practical Plan for <span className="accent">Ward 1</span>
          </>
        }
        lead="Safer streets. Responsible spending. Stronger neighbourhood services."
        ctaHref="/contact"
        ctaLabel="Join the Campaign"
      />
      <PrioritySection />
      <CommitmentSection />
    </>
  );
}
