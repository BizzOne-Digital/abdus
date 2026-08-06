"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlass } from "@/components/LiquidGlass";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  IconDollar,
  IconHome,
  IconPeople,
  IconShield,
  IconVisible,
  IconUpdates,
  IconAccountable,
} from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "../shared/inner-sections.css";
import "./vision-page.css";

const ICON_MAP = {
  dollar: IconDollar,
  shield: IconShield,
  home: IconHome,
  people: IconPeople,
} as const;

const APPROACH_ICONS = [IconVisible, IconUpdates, IconAccountable];

const DEFAULT_INTRO = {
  eyebrow: "Our approach",
  title: "Leadership that listens first.",
  lead:
    "Ward 1 doesn't need more promises — it needs a councillor who understands budgets, delivers projects and stays accountable between elections.",
  body:
    "Shinwary's plan is built on four practical priorities backed by 15+ years of project and budget experience. Every proposal is measured against one question: does this improve everyday life in North Oshawa?",
};

const DEFAULT_DETAILS = [
  {
    title: "Responsible Spending",
    body: "Audit city spending with a neighbour's eye. Cut waste before raising taxes. Every dollar should show up as better roads, safer intersections or stronger services — not bureaucracy.",
    icon: "dollar",
  },
  {
    title: "Safer Roads & Streets",
    body: "Prioritize Conlin Road, school-zone safety and lighting on routes families use daily. Work with staff on data-driven fixes, not endless studies.",
    icon: "shield",
  },
  {
    title: "Fair Property Taxes",
    body: "Transparent budgets with clear explanations. Growth should not automatically mean higher tax bills for existing homeowners.",
    icon: "home",
  },
  {
    title: "Responsive Service",
    body: "Return calls. Attend meetings. Publish monthly updates so Ward 1 always knows what their councillor is working on.",
    icon: "people",
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

export function VisionPageSections({ intro, priorities, approach }: Props) {
  const reduced = usePrefersReducedMotion();

  const introData = {
    eyebrow: intro?.subtitle || DEFAULT_INTRO.eyebrow,
    title: intro?.title || DEFAULT_INTRO.title,
    lead: intro?.body?.split("\n\n")[0] || DEFAULT_INTRO.lead,
    body: intro?.body?.split("\n\n")[1] || DEFAULT_INTRO.body,
  };

  const priorityList: PriorityItem[] = priorities?.length
    ? priorities
    : DEFAULT_DETAILS.map((d) => ({
        title: d.title,
        shortDescription: d.body,
        icon: d.icon,
      }));

  const detailCards = priorityList.map((item, i) => {
    const fallback = DEFAULT_DETAILS[i] || DEFAULT_DETAILS[0];
    const iconKey = (item.icon || fallback.icon) as keyof typeof ICON_MAP;
    const longBody =
      item.detailSections?.find((s) => s.body)?.body ||
      item.shortDescription ||
      fallback.body;
    return {
      title: item.title || fallback.title,
      body: longBody,
      Icon: ICON_MAP[iconKey] || IconShield,
      num: String(i + 1).padStart(2, "0"),
    };
  });

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
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  const slideIn = (delay = 0, x = 24) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.25 as const },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  return (
    <>
      {/* Intro — white */}
      <section className="inner-section inner-section--white vision-intro" aria-labelledby="vision-intro-title">
        <div className="container vision-intro__layout">
          <SectionHeading
            id="vision-intro-title"
            eyebrow={introData.eyebrow}
            title={introData.title}
            lead={introData.lead}
          />
          <motion.div className="vision-intro__aside" {...slideIn(0.1, 32)}>
            <div className="vision-intro__stat">
              <span className="vision-intro__stat-num">4</span>
              <span className="vision-intro__stat-label">Core priorities</span>
            </div>
            <p className="inner-section__text">{introData.body}</p>
          </motion.div>
        </div>
      </section>

      {/* Detailed priorities — navy */}
      <section className="inner-section inner-section--navy vision-details" aria-labelledby="vision-details-title">
        <div className="container">
          <SectionHeading
            id="vision-details-title"
            eyebrow="The plan"
            title={
              <>
                What Ward 1 gets <span className="accent">done</span>
              </>
            }
            lead="Each priority includes concrete actions — not vague campaign language."
          />

          <div className="vision-details__list">
            {detailCards.map((card, i) => (
              <motion.article
                key={card.title}
                className={`vision-details__row vision-details__row--${i % 2}`}
                {...fadeUp(i * 0.08)}
              >
                <span className="vision-details__num" aria-hidden="true">
                  {card.num}
                </span>
                <LiquidGlass className="vision-details__card" hover={false}>
                  <div className="vision-details__card-head">
                    <div className="inner-card__icon">
                      <card.Icon size={24} />
                    </div>
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.body}</p>
                </LiquidGlass>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach — ivory */}
      <section className="inner-section inner-section--ivory vision-approach" aria-labelledby="vision-approach-title">
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
                Volunteer, share the message or tell us what matters most on your street.
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
