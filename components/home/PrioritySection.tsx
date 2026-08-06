"use client";

import { motion } from "framer-motion";
import { LiquidGlass } from "@/components/LiquidGlass";
import { SectionHeading } from "./SectionHeading";
import {
  IconDollar,
  IconHome,
  IconPeople,
  IconShield,
} from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./PrioritySection.css";

const ICON_MAP = {
  dollar: IconDollar,
  shield: IconShield,
  home: IconHome,
  people: IconPeople,
} as const;

type PriorityItem = {
  _id?: string;
  title: string;
  shortDescription?: string;
  icon?: string;
  order?: number;
};

type Props = {
  heading?: CmsSection;
  priorities?: PriorityItem[];
};

const FALLBACK = [
  {
    title: "Responsible Spending",
    shortDescription: "Every tax dollar should deliver real value.",
    icon: "dollar",
  },
  {
    title: "Safer Roads",
    shortDescription:
      "Better roads, safer intersections and smarter traffic solutions.",
    icon: "shield",
  },
  {
    title: "Fair Property Taxes",
    shortDescription: "Transparent budgets and responsible decisions.",
    icon: "home",
  },
  {
    title: "Responsive Service",
    shortDescription: "A councillor who listens, acts and reports back.",
    icon: "people",
  },
];

export function PrioritySection({ heading, priorities }: Props) {
  const reduced = usePrefersReducedMotion();
  const list = priorities?.length ? priorities : FALLBACK;

  return (
    <section id="vision" className="section priority-section" aria-labelledby="vision-title">
      <div className="container">
        <SectionHeading
          id="vision-title"
          className="priority-section__heading"
          title={
            <>
              {(heading?.title || "A Practical Plan for Ward 1")
                .replace(/\s+Ward 1\s*$/i, "")
                .trim() || "A Practical Plan for"}{" "}
              <span className="accent">Ward 1</span>
            </>
          }
        />

        <div className="priority-grid">
          {list.map((item, i) => {
            const Icon =
              ICON_MAP[(item.icon as keyof typeof ICON_MAP) || "shield"] ||
              IconShield;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={item.title + i}
                className={`priority-card-wrap priority-card-wrap--${i}`}
                initial={reduced ? false : { opacity: 0, y: 28, x: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.55,
                  delay: reduced ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <LiquidGlass as="article" className="priority-card">
                  <span className="priority-card__num" aria-hidden="true">
                    {num}
                  </span>
                  <div className="priority-card__icon">
                    <Icon size={26} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.shortDescription}</p>
                  <svg
                    className="priority-card__arc"
                    viewBox="0 0 120 36"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 28 C 30 4, 90 4, 116 28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      pathLength={1}
                    />
                  </svg>
                </LiquidGlass>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
