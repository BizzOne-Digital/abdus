import { PageHero } from "../components/PageHero";
import { Ward1Section } from "../components/Ward1Section";
import { CommitmentSection } from "../components/CommitmentSection";

export function Ward1Page() {
  return (
    <>
      <PageHero
        eyebrow="Ward 1 · Oshawa"
        title={
          <>
            Ward 1 is <span className="accent">Home</span>
          </>
        }
        lead="North Oshawa deserves visible representation, smart investment and a councillor who stays connected."
        ctaHref="/contact"
        ctaLabel="Get Involved"
      />
      <Ward1Section />
      <CommitmentSection />
    </>
  );
}
