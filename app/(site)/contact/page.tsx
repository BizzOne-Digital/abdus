import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { CommitmentStrip } from "@/components/home/CommitmentStrip";
import { IconMail, IconPhone } from "@/components/icons";
import Link from "next/link";
import {
  getCmsPage,
  getCmsSettings,
  sectionByKey,
} from "@/lib/cms";
import "./contact.css";

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    getCmsPage("contact"),
    getCmsSettings(),
  ]);
  const sections = page?.sections || [];
  const hero = sectionByKey(sections, "hero");
  const details = sectionByKey(sections, "details");
  const involve = sectionByKey(sections, "involve");
  const email = settings.email || "Vote4shinwary@gmail.com";
  const phone = settings.phone || "416 419 2457";
  const tel = String(phone).replace(/\s/g, "");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Contact"}
        title={accentLastWord(hero?.title || "Let’s Move Ward 1 Forward")}
        lead={
          hero?.body ||
          "Questions, volunteering, or support — reach out."
        }
        image="/images/hero-bg.jpg"
        ctaHref={hero?.buttonLink || `mailto:${email}`}
        ctaLabel={hero?.buttonLabel || "Email Shinwary"}
      />

      <section
        className="section contact-page"
        aria-labelledby="contact-details-title"
      >
        <div className="container contact-page__grid">
          <article className="contact-card">
            <h2 id="contact-details-title">
              {details?.title || "Campaign Contact"}
            </h2>
            <p>
              {details?.body ||
                "Questions about Ward 1 or the campaign? Get in touch."}
            </p>
            <ul className="contact-card__list">
              <li>
                <a href={`mailto:${email}`}>
                  <IconMail size={20} />
                  <span>{email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${tel.startsWith("+") ? tel : `+1${tel}`}`}>
                  <IconPhone size={20} />
                  <span>{phone}</span>
                </a>
              </li>
            </ul>
          </article>

          <article className="contact-card">
            <h2>{involve?.title || "Get Involved"}</h2>
            <p>
              {involve?.body ||
                "Volunteer, share the campaign, or donate by e-Transfer."}
            </p>
            <div className="contact-card__actions">
              <a
                href={involve?.buttonLink || `mailto:${email}`}
                className="btn btn--primary btn--pill"
              >
                {involve?.buttonLabel || "Join the Campaign"}
              </a>
              <Link href="/donate" className="btn btn--ghost-dark btn--pill">
                Donate
              </Link>
            </div>
          </article>
        </div>
      </section>

      <CommitmentStrip
        data={sectionByKey(sections, "closing")}
        email={settings.email}
      />
    </>
  );
}
