import { PageHero } from "../components/PageHero";
import { CommunitySection } from "../components/CommunitySection";

export function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title={
          <>
            Rooted in <span className="accent">Community</span>
          </>
        }
        lead="Showing up. Listening. Working together for Ward 1."
        ctaHref="/contact"
        ctaLabel="Get Involved"
      />
      <CommunitySection />
    </>
  );
}
