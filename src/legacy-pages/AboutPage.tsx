import { PageHero } from "../components/PageHero";
import { MeetSection } from "../components/MeetSection";
import { CommitmentSection } from "../components/CommitmentSection";

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Shinwary"
        title={
          <>
            Experience that <span className="accent">Serves</span>
          </>
        }
        lead="A practical leader shaped by service, perseverance and respect for community in Ward 1."
        ctaHref="/contact"
        ctaLabel="Meet Shinwary"
      />
      <MeetSection />
      <CommitmentSection />
    </>
  );
}
