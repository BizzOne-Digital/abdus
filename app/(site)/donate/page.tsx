import { PageHero } from "@/components/home/PageHero";
import { DonatePageContent } from "@/components/pages/donate/DonatePageContent";

export const metadata = {
  title: "Donate | Vote Shinwary",
  description:
    "Support A. Salam Shinwary for Ward 1 Oshawa — donate by Interac e-Transfer to Vote4shinwary@gmail.com.",
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title={
          <>
            Fuel the <span className="accent">campaign</span>
          </>
        }
        lead="Scan the QR on the home page or send an Interac e-Transfer — simple steps below."
        image="/images/hero-bg.jpg"
        ctaHref="mailto:Vote4shinwary@gmail.com"
        ctaLabel="Email to Donate"
        withWave
        waveColor="#ffffff"
      />
      <DonatePageContent />
    </>
  );
}
