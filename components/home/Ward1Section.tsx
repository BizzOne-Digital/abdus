"use client";

import { motion } from "framer-motion";
import { LiquidGlass } from "@/components/LiquidGlass";
import { SectionHeading } from "./SectionHeading";
import { IconLeaf, IconPeople, IconRoad } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./Ward1Section.css";

const ICONS = [IconRoad, IconLeaf, IconPeople];

const DEFAULT_POINTS = [
  {
    title: "Safe Streets",
    body: "Better roads, intersections, lighting and school routes.",
  },
  {
    title: "Green Spaces",
    body: "Protecting parks and creating welcoming community spaces.",
  },
  {
    title: "Strong Services",
    body: "Reliable neighbourhood services that improve everyday life.",
  },
];

type Props = {
  data?: CmsSection;
};

export function Ward1Section({ data }: Props) {
  const reduced = usePrefersReducedMotion();
  const points = (data?.items?.length ? data.items : DEFAULT_POINTS).map(
    (item, i) => ({
      title: item.title || "",
      body: item.body || "",
      Icon: ICONS[i % ICONS.length],
    }),
  );

  const titleText = data?.title || "Ward 1 is Home";
  const titleParts = titleText.trim().split(/\s+/);
  const last = titleParts.pop() || "Home";
  const before = titleParts.join(" ");

  return (
    <section id="ward1" className="section ward-section" aria-labelledby="ward-title">
      <div className="container ward-layout">
        <motion.div
          className="ward-map-wrap"
          initial={reduced ? false : { opacity: 0, x: -28 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <LiquidGlass className="ward-map-card" hover={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data?.image || "/images/ward1-map.svg"}
              alt="Simplified map highlighting North Oshawa Ward 1"
              width={480}
              height={420}
            />
          </LiquidGlass>
        </motion.div>

        <div className="ward-copy">
          <SectionHeading
            id="ward-title"
            title={
              <>
                {before ? `${before} ` : null}
                <span className="accent">{last}</span>
              </>
            }
            lead={
              data?.body ||
              "North Oshawa deserves visible representation, smart investment and a councillor who stays connected."
            }
          />

          <ul className="ward-points">
            {points.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduced ? 0 : i * 0.08, duration: 0.45 }}
              >
                <LiquidGlass className="ward-point">
                  <div className="ward-point__icon">
                    <item.Icon size={24} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </LiquidGlass>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
