"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  IconDollar,
  IconHome,
  IconPeople,
  IconMap,
  IconThumbsUp,
  IconVisible,
  IconUpdates,
  IconAccountable,
} from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "../shared/inner-sections.css";
import "./vision-page.css";

const APPROACH_ICONS = [IconVisible, IconUpdates, IconAccountable];

const DEFAULT_INTRO = {
  eyebrow: "Our approach",
  title: "Leadership that listens first.",
  lead:
    "Ward 1 doesn't need more promises — it needs a councillor who understands budgets, delivers projects and stays accountable between elections.",
  body:
    "Shinwary's plan is built on practical priorities backed by 15+ years of project and budget experience. Every proposal is measured against one question: does this improve everyday life in North Oshawa?",
};

/** Text + icons from “What I Stand For” priorities layout */
const STAND_FOR = [
  {
    title: "Responsible Spending",
    body: "Every dollar matters. Transparent budgeting that protects taxpayers.",
    Icon: IconDollar,
  },
  {
    title: "Improve Roads & Traffic",
    body: "Infrastructure improvements before population growth overtakes us.",
    Icon: IconMap,
  },
  {
    title: "Lower Property Taxes",
    body: "Smart budgeting. Better value. Your money, working harder.",
    Icon: IconHome,
  },
  {
    title: "Listening. Serving. Delivering.",
    body: "You speak. I act. Accessible and accountable to every Ward 1 resident.",
    Icon: IconPeople,
  },
  {
    title: "Dog Off-Leash Parks",
    body: "More space for Ward 1 families and their pets to enjoy.",
    Icon: IconThumbsUp,
  },
];

const DEFAULT_APPROACH = [
  {
    title: "Listen",
    body: "Door knocks, community meetings and direct outreach — priorities start with residents, not consultants.",
  },
  {
    title: "Plan",
    body: "Translate concerns into actionable motions with timelines, costs and measurable outcomes.",
  },
  {
    title: "Deliver",
    body: "Follow through publicly. Report wins and setbacks honestly so neighbours stay informed.",
  },
];

type PriorityItem = {
  _id?: string;
  title: string;
  shortDescription?: string;
  icon?: string;
  detailSections?: Array<{ body?: string }>;
};

type Props = {
  intro?: CmsSection;
  priorities?: PriorityItem[];
  approach?: CmsSection;
};

export function VisionPageSections({ intro, approach }: Props) {
  const reduced = usePrefersReducedMotion();

  const introData = {
    eyebrow: intro?.subtitle || DEFAULT_INTRO.eyebrow,
    title: intro?.title || DEFAULT_INTRO.title,
    lead: intro?.body?.split("\n\n")[0] || DEFAULT_INTRO.lead,
    body: intro?.body?.split("\n\n")[1] || DEFAULT_INTRO.body,
  };

  const approachSteps = (approach?.items?.length ? approach.items : DEFAULT_APPROACH).map(
    (item, i) => ({
      title: item.title || DEFAULT_APPROACH[i]?.title || "",
      body: item.body || DEFAULT_APPROACH[i]?.body || "",
      Icon: APPROACH_ICONS[i % APPROACH_ICONS.length],
    }),
  );

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 as const },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  const slideIn = (delay = 0, x = 24) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.25 as const },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <>
      <section
        className="inner-section inner-section--white vision-intro"
        aria-labelledby="vision-intro-title"
      >
        <div className="container vision-intro__layout">
          <SectionHeading
            id="vision-intro-title"
            eyebrow={introData.eyebrow}
            title={introData.title}
            lead={introData.lead}
          />
          <motion.div className="vision-intro__aside" {...slideIn(0.1, 32)}>
            <div className="vision-intro__stat">
              <span className="vision-intro__stat-num">{STAND_FOR.length}</span>
              <span className="vision-intro__stat-label">Core priorities</span>
            </div>
            <p className="inner-section__text">{introData.body}</p>
          </motion.div>
        </div>
      </section>

      {/* Priorities — ss2 text/colors, ss3 card containers */}
      <section
        className="inner-section inner-section--ivory vision-details"
        aria-labelledby="vision-details-title"
      >
        <div className="container">
          <SectionHeading
            id="vision-details-title"
            className="vision-details__heading"
            align="left"
            eyebrow="What I Stand For"
            title="My Priorities for a Better Oshawa"
          />

          <div className="vision-priority-grid">
            {STAND_FOR.map((card, i) => (
              <motion.article
                key={card.title}
                className="vision-priority-card"
                {...fadeUp(i * 0.07)}
              >
                <div className="vision-priority-card__icon" aria-hidden="true">
                  <card.Icon size={22} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="inner-section inner-section--white vision-approach"
        aria-labelledby="vision-approach-title"
      >
        <div className="container">
          <SectionHeading
            id="vision-approach-title"
            eyebrow={approach?.subtitle || "How we'll work"}
            title={approach?.title || "Listen. Plan. Deliver."}
            lead={
              approach?.body ||
              "A simple process — because good governance shouldn't be complicated for residents."
            }
          />

          <div className="vision-approach__steps">
            {approachSteps.map((step, i) => (
              <motion.article
                key={step.title}
                className="inner-card vision-approach__step"
                {...fadeUp(i * 0.08)}
              >
                <span className="vision-approach__step-num">{i + 1}</span>
                <div className="inner-card__icon">
                  <step.Icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.article>
            ))}
          </div>

          <motion.div className="page-cta-band" {...fadeUp(0.15)}>
            <div className="page-cta-band__text">
              <h3>Join the campaign for Ward 1</h3>
              <p>
                Volunteer, share the message or tell us what matters most on your
                street.
              </p>
            </div>
            <Link href="/contact" className="btn btn--primary btn--pill">
              Join the Campaign
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
