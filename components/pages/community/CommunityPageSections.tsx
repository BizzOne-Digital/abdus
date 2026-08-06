"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/home/SectionHeading";
import { IconPeople, IconVisible, IconUpdates } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "../shared/inner-sections.css";
import "./community-page.css";

const INVOLVE_ICONS = [IconPeople, IconVisible, IconUpdates];

const DEFAULT_INTRO = {
  eyebrow: "Why it matters",
  title: "Ward 1 is built on neighbours.",
  lead:
    "Strong communities aren't built at city hall — they're built at school gates, block parties and kitchen-table conversations.",
  body:
    "Shinwary has spent years showing up: listening to parents on student transportation, advocating for Conlin Road fixes and partnering with local groups. As councillor, that same presence becomes your voice in every council meeting.",
};

const DEFAULT_GALLERY = [
  {
    title: "Celebrating together",
    body: "Supporting local traditions and the diversity that makes North Oshawa strong.",
    image: "/images/community-1.jpg",
    tag: "Events",
  },
  {
    title: "Working with partners",
    body: "Meeting with residents, schools and community leaders to understand real challenges.",
    image: "/images/community-2.jpg",
    tag: "Collaboration",
  },
  {
    title: "Taking action",
    body: "Turning conversations into advocacy — from road safety to parks and green space.",
    image: "/images/community-3.jpg",
    tag: "Advocacy",
  },
];

const DEFAULT_ADVOCACY = [
  {
    title: "Conlin Road improvements",
    body: "Pushing for safer, smoother commutes on one of Ward 1's busiest corridors.",
  },
  {
    title: "Student transportation",
    body: "Working with families and schools on bus routes, safety and reliable service.",
  },
  {
    title: "Safer routes for children",
    body: "Better crossings, lighting and traffic calming near schools and parks.",
  },
  {
    title: "Parks & green spaces",
    body: "Protecting and improving the places where neighbours gather and kids play.",
  },
  {
    title: "School partnerships",
    body: "Connecting council decisions with what families and educators see every day.",
  },
  {
    title: "Neighbourhood listening",
    body: "Regular ward meetings so priorities come from residents — not top-down plans.",
  },
];

const DEFAULT_INVOLVE = [
  {
    title: "Volunteer",
    body: "Help with events, door knocking or community outreach in your area.",
  },
  {
    title: "Share your story",
    body: "Tell us what matters on your street — we're building the ward plan together.",
  },
  {
    title: "Stay connected",
    body: "Follow updates and invite neighbours to join the conversation for Ward 1.",
  },
];

type Props = {
  intro?: CmsSection;
  gallery?: CmsSection;
  advocacy?: CmsSection;
  involve?: CmsSection;
};

export function CommunityPageSections({
  intro,
  gallery,
  advocacy,
  involve,
}: Props) {
  const reduced = usePrefersReducedMotion();

  const introData = {
    eyebrow: intro?.subtitle || DEFAULT_INTRO.eyebrow,
    title: intro?.title || DEFAULT_INTRO.title,
    lead: intro?.body?.split("\n\n")[0] || DEFAULT_INTRO.lead,
    body: intro?.body?.split("\n\n")[1] || DEFAULT_INTRO.body,
  };

  const galleryItems = gallery?.items?.length
    ? gallery.items
    : DEFAULT_GALLERY.map((g) => ({
        title: g.title,
        body: g.body,
        image: g.image,
        subtitle: g.tag,
      }));

  const photos = galleryItems.map((item, i) => ({
    title: item.title || DEFAULT_GALLERY[i]?.title || "",
    body: item.body || DEFAULT_GALLERY[i]?.body || "",
    image: item.image || DEFAULT_GALLERY[i]?.image || "",
    tag: item.subtitle || DEFAULT_GALLERY[i]?.tag || "Community",
  }));

  const advocacyCards = (advocacy?.items?.length
    ? advocacy.items
    : DEFAULT_ADVOCACY
  ).map((item, i) => ({
    title: item.title || DEFAULT_ADVOCACY[i]?.title || "",
    body: item.body || DEFAULT_ADVOCACY[i]?.body || "",
  }));

  const involveCards = (involve?.items?.length ? involve.items : DEFAULT_INVOLVE).map(
    (item, i) => ({
      title: item.title || DEFAULT_INVOLVE[i]?.title || "",
      body: item.body || DEFAULT_INVOLVE[i]?.body || "",
      Icon: INVOLVE_ICONS[i % INVOLVE_ICONS.length],
    }),
  );

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 as const },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  const scaleIn = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.94 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, amount: 0.25 as const },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  return (
    <>
      {/* Intro — white */}
      <section className="inner-section inner-section--white community-intro" aria-labelledby="community-intro-title">
        <div className="container community-intro__layout">
          <SectionHeading
            id="community-intro-title"
            eyebrow={introData.eyebrow}
            title={introData.title}
            lead={introData.lead}
          />
          <motion.div className="community-intro__badge-wrap" {...scaleIn(0.08)}>
            <div className="community-intro__badge">
              <span className="community-intro__badge-ward">Ward 1</span>
              <strong className="community-intro__badge-first">First</strong>
            </div>
            <p className="inner-section__text">{introData.body}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery stories — navy */}
      <section className="inner-section inner-section--navy community-gallery" aria-labelledby="community-gallery-title">
        <div className="container">
          <SectionHeading
            id="community-gallery-title"
            eyebrow={gallery?.subtitle || "In the community"}
            title={gallery?.title || "Moments that matter."}
            lead="Real connections — not stock photos and talking points."
          />

          <div className="community-gallery__grid">
            {photos.map((item, i) => (
              <motion.article
                key={item.title + i}
                className={`community-gallery__card community-gallery__card--${i}`}
                {...fadeUp(i * 0.1)}
              >
                <div className="community-gallery__image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} width={420} height={300} loading="lazy" />
                  <span className="community-gallery__tag">{item.tag}</span>
                </div>
                <div className="community-gallery__body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Local advocacy — ivory */}
      <section className="inner-section inner-section--ivory community-advocacy" aria-labelledby="community-advocacy-title">
        <div className="container">
          <SectionHeading
            id="community-advocacy-title"
            eyebrow="On the ground"
            title={advocacy?.title || "Issues we're fighting for."}
            lead={
              advocacy?.body ||
              "These aren't abstract policy goals — they're conversations Shinwary has already started with Ward 1 residents."
            }
          />

          <ul className="community-advocacy__grid">
            {advocacyCards.map((item, i) => (
              <motion.li
                key={item.title + i}
                className="inner-card community-advocacy__item"
                {...fadeUp(i * 0.05)}
              >
                <span className="community-advocacy__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved — navy */}
      <section className="inner-section inner-section--navy community-involve" aria-labelledby="community-involve-title">
        <div className="container">
          <SectionHeading
            id="community-involve-title"
            eyebrow={involve?.subtitle || "Your turn"}
            title={involve?.title || "Be part of the movement."}
            lead={
              involve?.body ||
              "Campaigns are built one conversation at a time. Here's how you can help."
            }
          />

          <div className="community-involve__grid">
            {involveCards.map((card, i) => (
              <motion.article
                key={card.title}
                className="inner-card community-involve__card"
                {...fadeUp(i * 0.08)}
              >
                <div className="inner-card__icon">
                  <card.Icon size={24} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </div>

          <motion.div className="page-cta-band" {...fadeUp(0.12)}>
            <div className="page-cta-band__text">
              <h3>Show up for Ward 1</h3>
              <p>Volunteer, host a sign or simply share what your neighbourhood needs.</p>
            </div>
            <Link href="/contact" className="btn btn--primary btn--pill">
              Get Involved
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
