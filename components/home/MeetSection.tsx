"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./MeetSection.css";

type Props = {
  meet?: CmsSection;
  quote?: CmsSection;
};

export function MeetSection({ meet, quote }: Props) {
  const reduced = usePrefersReducedMotion();
  const kicker = meet?.subtitle || "Meet Shinwary";
  const title = meet?.title || "Experience that serves.";
  const INTRO_COPY =
    "Shinwary rebuilt his life in Canada through hard work and education. That journey shaped a practical leader.";
  const intro = INTRO_COPY;
  const photo = meet?.image || "/images/candidate-podium.jpg";
  const years = quote?.title || "15+";
  const yearsLabel = quote?.subtitle || "Years";
  const quoteBody =
    quote?.body ||
    "Canada gave my family opportunity. Now it's my turn to give back.";

  return (
    <section id="about" className="meet-section" aria-labelledby="about-title">
      <div className="meet-section__body">
        <div className="container meet-layout">
          <motion.div
            className="meet-content"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
          >
            <p className="meet-kicker">{kicker}</p>
            <h2 id="about-title" className="meet-title">
              {title}
            </h2>

            <div className="meet-quote-row">
              <div className="meet-years-box" aria-label={`${years} years`}>
                <span className="meet-years-box__num">{years}</span>
                <span className="meet-years-box__label">{yearsLabel}</span>
              </div>
              <blockquote className="meet-quote">
                <p>{quoteBody}</p>
              </blockquote>
            </div>

            <p className="meet-intro">{intro}</p>

            <Link href="/about" className="btn btn--primary btn--pill meet-cta">
              More about Shinwary
            </Link>
          </motion.div>

          <motion.figure
            className="meet-photo"
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt="A. Salam Shinwary speaking at a community podium"
              width={560}
              height={420}
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
