"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  IconAccountable,
  IconLeadership,
  IconVisible,
  IconUpdates,
} from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "../shared/inner-sections.css";
import "./about-page.css";

const VALUE_ICONS = [IconVisible, IconAccountable, IconUpdates, IconLeadership];

const DEFAULT_STORY = {
  eyebrow: "His Story",
  title: "From newcomer to neighbour.",
  lead:
    "Shinwary rebuilt his life in Canada through hard work and education — and chose Oshawa as home.",
  body:
    "Ward 1 is where his family lives. He brings budget experience, community presence, and a promise to take your voice to City Hall.",
  image: "/images/candidate-podium.jpg",
};

const DEFAULT_TIMELINE = [
  {
    year: "Education",
    title: "Foundation in service",
    body: "Environmental Management and Paralegal studies.",
  },
  {
    year: "15+ Years",
    title: "Led across sectors",
    body: "Projects and budgets in government, non-profit and private work.",
  },
  {
    year: "Community",
    title: "Showed up for neighbours",
    body: "Listening and advocacy across North Oshawa.",
  },
  {
    year: "2026",
    title: "Ready for Ward 1",
    body: "Visible representation. Monthly updates. Results that matter.",
  },
];

const DEFAULT_VALUES = [
  {
    title: "Service First",
    body: "Solve problems — don't create them.",
  },
  {
    title: "Accountability",
    body: "Open communication and decisions you can see.",
  },
  {
    title: "Monthly Updates",
    body: "Clear reports so you always know what's happening.",
  },
  {
    title: "Practical Leadership",
    body: "Budget and project skills that translate to council.",
  },
];

type Props = {
  story?: CmsSection;
  timeline?: CmsSection;
  values?: CmsSection;
  quote?: CmsSection;
};

export function AboutPageSections({ story, timeline, values, quote }: Props) {
  const reduced = usePrefersReducedMotion();

  const storyData = {
    eyebrow: story?.subtitle || DEFAULT_STORY.eyebrow,
    title: story?.title || DEFAULT_STORY.title,
    lead: story?.body?.split("\n\n")[0] || DEFAULT_STORY.lead,
    body: story?.body?.split("\n\n")[1] || DEFAULT_STORY.body,
    image: story?.image || DEFAULT_STORY.image,
  };

  const timelineItems = timeline?.items?.length
    ? timeline.items
    : DEFAULT_TIMELINE.map((t) => ({
        title: t.year,
        subtitle: t.title,
        body: t.body,
      }));

  const milestones = timelineItems.map((item, i) => ({
    year: item.title || DEFAULT_TIMELINE[i]?.year || "",
    title: item.subtitle || DEFAULT_TIMELINE[i]?.title || "",
    body: item.body || DEFAULT_TIMELINE[i]?.body || "",
  }));

  const valueCards = (values?.items?.length ? values.items : DEFAULT_VALUES).map(
    (item, i) => ({
      title: item.title || DEFAULT_VALUES[i]?.title || "",
      body: item.body || DEFAULT_VALUES[i]?.body || "",
      Icon: VALUE_ICONS[i % VALUE_ICONS.length],
    }),
  );

  const quoteText =
    quote?.body ||
    "Canada gave my family opportunity. Now it's my turn to give back.";
  const quoteBy = quote?.buttonLabel || "— A. Salam Shinwary";
  const years = quote?.title || "15+";
  const yearsLabel = quote?.subtitle || "Years of service";

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 as const },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  return (
    <>
      {/* Story — white */}
      <section className="inner-section inner-section--white about-story" aria-labelledby="about-story-title">
        <div className="container about-story__grid">
          <motion.figure className="about-story__photo" {...fadeUp()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={storyData.image}
              alt="A. Salam Shinwary speaking with residents"
              width={560}
              height={480}
            />
            <div className="about-story__badge">
              <span className="about-story__badge-num">{years}</span>
              <span className="about-story__badge-label">{yearsLabel}</span>
            </div>
          </motion.figure>

          <div className="about-story__copy">
            <SectionHeading
              id="about-story-title"
              eyebrow={storyData.eyebrow}
              title={storyData.title}
              lead={storyData.lead}
            />
            <motion.p className="inner-section__text" {...fadeUp(0.08)}>
              {storyData.body}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline — navy */}
      <section className="inner-section inner-section--navy about-timeline" aria-labelledby="about-timeline-title">
        <div className="container">
          <SectionHeading
            id="about-timeline-title"
            eyebrow={timeline?.subtitle || "The path here"}
            title={timeline?.title || "Experience that earns trust."}
            lead={
              timeline?.body ||
              "A record of education, leadership and community — not slogans."
            }
          />

          <ol className="about-timeline__list">
            {milestones.map((item, i) => (
              <motion.li
                key={item.year + i}
                className="about-timeline__item"
                {...fadeUp(i * 0.07)}
              >
                <span className="about-timeline__year">{item.year}</span>
                <div className="about-timeline__content inner-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values — ivory */}
      <section className="inner-section inner-section--ivory about-values" aria-labelledby="about-values-title">
        <div className="container">
          <SectionHeading
            id="about-values-title"
            eyebrow={values?.subtitle || "What guides him"}
            title={values?.title || "Principles for Ward 1."}
            lead={
              values?.body ||
              "How Shinwary will show up as your councillor — every day, not just at election time."
            }
          />

          <div className="about-values__grid">
            {valueCards.map((card, i) => (
              <motion.article
                key={card.title}
                className="inner-card about-values__card"
                {...fadeUp(i * 0.06)}
              >
                <div className="inner-card__icon">
                  <card.Icon size={24} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + CTA — navy */}
      <section className="inner-section inner-section--navy about-quote" aria-labelledby="about-quote-title">
        <div className="container about-quote__inner">
          <motion.div className="about-quote__mark" {...fadeUp()} aria-hidden="true">
            “
          </motion.div>
          <motion.blockquote className="about-quote__text" {...fadeUp(0.06)}>
            <p id="about-quote-title">{quoteText}</p>
            <footer>{quoteBy}</footer>
          </motion.blockquote>

          <motion.div className="page-cta-band" {...fadeUp(0.12)}>
            <div className="page-cta-band__text">
              <h3>Ready to meet Shinwary?</h3>
              <p>
                Share your priorities for Ward 1 or ask about volunteering with the campaign.
              </p>
            </div>
            <Link href="/contact" className="btn btn--primary btn--pill">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
