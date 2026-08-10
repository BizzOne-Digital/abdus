"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./Ward1Section.css";

const WardMap = dynamic(
  () => import("./WardMap").then((m) => m.WardMap),
  {
    ssr: false,
    loading: () => (
      <div className="ward-map ward-map--loading">
        <p>Loading Ward 1 map…</p>
      </div>
    ),
  },
);

const WARD_LOOKUP = "https://map.oshawa.ca/2018WardLookup/";
const WARD_FINDER =
  "https://www.oshawa.ca/city-hall/elections/find-your-ward/";

type Props = {
  data?: CmsSection;
};

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 22s7-7.2 7-12.2A7 7 0 0 0 5 9.8C5 14.8 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Ward1Section({ data }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="ward1" className="section ward-section" aria-labelledby="ward-title">
      <div className="container ward-layout">
        <motion.div
          className="ward-map-wrap"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <WardMap />
        </motion.div>

        <motion.div
          className="ward-copy"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : 0.08 }}
        >
          <SectionHeading
            id="ward-title"
            eyebrow="Know Your Ward"
            title="Are You in Ward 1?"
            lead={
              data?.body ||
              "Ward 1 covers the northern area of Oshawa. Not sure if you're included? Use the map or check the official ward finder."
            }
          />

          <div className="ward-cta-row">
            <a
              href={WARD_LOOKUP}
              className="btn btn--primary ward-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinIcon />
              Check My Address
            </a>
            <a
              href={WARD_FINDER}
              className="btn ward-cta-btn ward-cta-btn--outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Ward Finder
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
