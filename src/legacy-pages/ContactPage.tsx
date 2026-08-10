import { PageHero } from "../components/PageHero";
import { ClosingCTA } from "../components/ClosingCTA";
import { LiquidGlass } from "../components/LiquidGlass";
import { IconMail, IconPhone } from "../components/icons";
import "./ContactPage.css";

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s Move Ward 1 <span className="accent">Forward</span>
          </>
        }
        lead="Your voice. Your neighbourhood. Your future. Reach out and join the campaign."
        ctaHref="mailto:Vote4shinwary@gmail.com"
        ctaLabel="Email Shinwary"
      />

      <section className="section contact-page" aria-labelledby="contact-details-title">
        <div className="container contact-page__grid">
          <LiquidGlass as="article" className="contact-card">
            <h2 id="contact-details-title">Campaign Contact</h2>
            <p>
              Questions about Ward 1 priorities, volunteering, or the campaign?
              Get in touch directly.
            </p>
            <ul className="contact-card__list">
              <li>
                <a href="mailto:Vote4shinwary@gmail.com">
                  <IconMail size={20} />
                  <span>Vote4shinwary@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+14164192457">
                  <IconPhone size={20} />
                  <span>416 419 2457</span>
                </a>
              </li>
            </ul>
          </LiquidGlass>

          <LiquidGlass as="article" className="contact-card">
            <h2>Get Involved</h2>
            <p>
              Help move Ward 1 forward — share the campaign, talk with neighbours,
              and stay connected for updates.
            </p>
            <a href="mailto:Vote4shinwary@gmail.com" className="btn btn--primary btn--pill">
              Join the Campaign
            </a>
          </LiquidGlass>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
