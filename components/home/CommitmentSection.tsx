"use client";

import { motion } from "framer-motion";
import { LiquidGlass } from "@/components/LiquidGlass";
import { SectionHeading } from "./SectionHeading";
import { IconAccountable, IconUpdates, IconVisible } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./CommitmentSection.css";

const ICONS = [IconVisible, IconUpdates, IconAccountable];

const DEFAULT_ITEMS = [
  {
    title: "Visible & Accessible",
    body: "Easy to reach and active in the community.",
  },
  {
    title: "Regular Updates",
    body: "Clear monthly updates online and in neighbourhoods.",
  },
  {
    title: "Transparent & Accountable",
    body: "Honest decisions, open communication and measurable progress.",
  },
];

type Props = {
  data?: CmsSection;
};

export function CommitmentSection({ data }: Props) {
  const reduced = usePrefersReducedMotion();
  const items = (data?.items?.length ? data.items : DEFAULT_ITEMS).map(
    (item, i) => ({
      title: item.title || "",
      body: item.body || "",
      Icon: ICONS[i % ICONS.length],
    }),
  );

  return (
    <section
      className="section commitment-section"
      aria-labelledby="commitment-title"
    >
      <div className="container">
        <SectionHeading
          id="commitment-title"
          className="commitment-heading"
          title={
            data?.title ||
            "You should always know what your councillor is doing."
          }
        />

        <div className="commitment-grid">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className={`commitment-card-wrap commitment-card-wrap--${i}`}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: reduced ? 0 : i * 0.08, duration: 0.5 }}
            >
              <LiquidGlass as="article" className="commitment-card">
                <div className="commitment-card__icon">
                  <item.Icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
