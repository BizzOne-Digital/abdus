"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { LiquidGlass } from "@/components/LiquidGlass";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./CommunitySection.css";

const DEFAULT_GALLERY = [
  {
    src: "/images/community-1.jpg",
    alt: "Shinwary connecting with residents in a community setting",
    label: "Community",
    caption: "Proud to celebrate diversity and support our local traditions.",
    tilt: -6,
  },
  {
    src: "/images/community-2.jpg",
    alt: "Shinwary collaborating with community partners at a meeting",
    label: "Collaboration",
    caption: "Working together to understand challenges and find solutions.",
    tilt: 3,
  },
  {
    src: "/images/community-3.jpg",
    alt: "Shinwary engaging with neighbours at a local event",
    label: "Action",
    caption: "Partnering with community groups to strengthen Ward 1.",
    tilt: -4,
  },
];

const DEFAULT_ADVOCACY = [
  "Conlin Road improvements",
  "Student transportation concerns",
  "Safer routes for children",
  "Parks and green spaces",
  "Collaboration with schools and community partners",
];

const TILTS = [-6, 3, -4];

type Props = {
  community?: CmsSection;
  advocacy?: CmsSection;
};

export function CommunitySection({ community, advocacy }: Props) {
  const reduced = usePrefersReducedMotion();

  const gallery =
    community?.items?.length
      ? community.items.map((item, i) => ({
          src: item.image || DEFAULT_GALLERY[i % 3].src,
          alt: item.title || "Community",
          label: item.title || "Community",
          caption: item.body || "",
          tilt: TILTS[i % TILTS.length],
        }))
      : DEFAULT_GALLERY;

  const advocacyItems =
    advocacy?.items?.length
      ? advocacy.items.map((i) => i.title || "")
      : DEFAULT_ADVOCACY;

  return (
    <section
      id="community"
      className="section community-section"
      aria-labelledby="community-title"
    >
      <div className="container">
        <div className="community-top">
          <div className="community-intro">
            <span className="community-rule" aria-hidden="true" />
            <h2 id="community-title" className="community-title">
              {community?.title || "Rooted in Community."}
            </h2>
            <span className="community-rule" aria-hidden="true" />

            <LiquidGlass hover={false} className="community-badge">
              <span className="community-badge__ward">Ward 1</span>
              <strong className="community-badge__first">First</strong>
            </LiquidGlass>
          </div>

          <div className="community-gallery" aria-label="Community photos">
            {gallery.map((item, i) => (
              <motion.figure
                key={`${item.label}-${i}`}
                className={`community-shot community-shot--${i}`}
                style={
                  reduced
                    ? undefined
                    : ({ ["--tilt" as string]: `${item.tilt}deg` } as CSSProperties)
                }
                initial={reduced ? false : { opacity: 0, y: 28, x: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: reduced ? 0 : i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="community-shot__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={420}
                    height={320}
                    loading="lazy"
                  />
                </div>
                <figcaption className="community-shot__caption">
                  <span className="community-shot__label">{item.label}</span>
                  <p>{item.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <div className="community-advocacy">
          <h3 className="community-advocacy__title">
            {advocacy?.title || "Local priorities"}
          </h3>
          <ol className="advocacy-timeline">
            {advocacyItems.map((item, i) => (
              <motion.li
                key={item + i}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduced ? 0 : i * 0.05, duration: 0.4 }}
              >
                <LiquidGlass className="advocacy-item">
                  <span className="advocacy-item__dot" aria-hidden="true" />
                  <span>{item}</span>
                </LiquidGlass>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
