import { PageHero } from "@/components/home/PageHero";
import { DonatePageContent } from "@/components/pages/donate/DonatePageContent";
import { getCmsSettings } from "@/lib/cms";

export async function generateMetadata() {
  const settings = await getCmsSettings();
  const email = settings.email || "Vote4shinwary@gmail.com";
  return {
    title: "Donate | Vote Shinwary",
    description: `Support A. Salam Shinwary for Ward 1 Oshawa — donate by Interac e-Transfer to ${email}.`,
  };
}

export default async function DonatePage() {
  const settings = await getCmsSettings();
  const email = settings.email || "Vote4shinwary@gmail.com";

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
        ctaHref={`mailto:${email}`}
        ctaLabel="Email to Donate"
      />
      <DonatePageContent email={email} />
    </>
  );
}
