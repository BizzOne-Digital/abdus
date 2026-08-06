import { PageHero } from "@/components/home/PageHero";
import { accentLastWord } from "@/lib/accentTitle";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { LiquidGlass } from "@/components/LiquidGlass";
import { IconMail, IconPhone } from "@/components/icons";
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
  const email = settings.email || "salam.jan111@gmail.com";
  const phone = settings.phone || "416 419 2457";
  const tel = String(phone).replace(/\s/g, "");

  return (
    <>
      <PageHero
        eyebrow={hero?.subtitle || "Contact"}
        title={accentLastWord(hero?.title || "Let’s Move Ward 1 Forward")}
        lead={
          hero?.body ||
          "Your voice. Your neighbourhood. Your future. Reach out and join the campaign."
        }
        image={hero?.image}
        ctaHref={hero?.buttonLink || `mailto:${email}`}
        ctaLabel={hero?.buttonLabel || "Email Shinwary"}
      />

      <section
        className="section contact-page"
        aria-labelledby="contact-details-title"
      >
        <div className="container contact-page__grid">
          <LiquidGlass as="article" className="contact-card">
            <h2 id="contact-details-title">
              {details?.title || "Campaign Contact"}
            </h2>
            <p>
              {details?.body ||
                "Questions about Ward 1 priorities, volunteering, or the campaign? Get in touch directly."}
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
          </LiquidGlass>

          <LiquidGlass as="article" className="contact-card">
            <h2>{involve?.title || "Get Involved"}</h2>
            <p>
              {involve?.body ||
                "Help move Ward 1 forward — share the campaign, talk with neighbours, and stay connected for updates."}
            </p>
            <a
              href={involve?.buttonLink || `mailto:${email}`}
              className="btn btn--primary btn--pill"
            >
              {involve?.buttonLabel || "Join the Campaign"}
            </a>
          </LiquidGlass>
        </div>
      </section>

      <ClosingCTA
        email={email}
        phone={phone}
        data={sectionByKey(sections, "closing")}
      />
    </>
  );
}
