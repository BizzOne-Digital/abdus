"use client";

import { motion } from "framer-motion";
import { LiquidGlass } from "@/components/LiquidGlass";
import {
  IconEducation,
  IconExperience,
  IconLeadership,
  IconWhy,
} from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./MeetSection.css";

const ICONS = [IconEducation, IconExperience, IconLeadership, IconWhy];

const DEFAULT_CARDS = [
  {
    title: "Education",
    body: "Environmental Management and Paralegal education.",
  },
  {
    title: "Experience",
    body: "More than 15 years serving Canadian communities.",
  },
  {
    title: "Leadership",
    body: "Government, non-profit and private-sector project and budget experience.",
  },
  {
    title: "Why He Is Running",
    body: "Canada gave his family opportunity. Now he is ready to give back.",
  },
];

type Props = {
  meet?: CmsSection;
  quote?: CmsSection;
};

export function MeetSection({ meet, quote }: Props) {
  const reduced = usePrefersReducedMotion();
  const cards = (meet?.items?.length ? meet.items : DEFAULT_CARDS).map(
    (card, i) => ({
      title: card.title || "",
      body: card.body || "",
      Icon: ICONS[i % ICONS.length],
    }),
  );

  const kicker = meet?.subtitle || "Meet Shinwary";
  const title = meet?.title || "Experience that serves.";
  const intro =
    meet?.body ||
    "Like many newcomers, Shinwary rebuilt his life in Canada from the beginning. That journey shaped a practical leader grounded in perseverance, responsibility and respect for community.";
  const photo = meet?.image || "/images/candidate-podium.jpg";
  const years = quote?.title || "15+";
  const yearsLabel = quote?.subtitle || "Years";
  const quoteBody =
    quote?.body ||
    "Canada gave my family opportunity. Now it’s my turn to give back.";
  const quoteBy = quote?.buttonLabel || "— A. Salam Shinwary";

  return (
    <section id="about" className="meet-section" aria-labelledby="about-title">
      <svg
        className="wave-divider meet-section__wave"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z"
          fill="#F7F3EA"
        />
      </svg>

      <div className="meet-section__body">
        <div className="container meet-layout">
          <div className="meet-content">
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
                <footer>{quoteBy}</footer>
              </blockquote>
            </div>

            <p className="meet-intro">{intro}</p>

            <div className="meet-cards">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: reduced ? 0 : i * 0.07, duration: 0.45 }}
                >
                  <LiquidGlass
                    as="article"
                    variant="light"
                    className="meet-card"
                  >
                    <div className="meet-card__icon">
                      <card.Icon size={22} />
                    </div>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.figure
            className="meet-photo"
            initial={reduced ? false : { opacity: 0, x: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt="A. Salam Shinwary speaking at a community podium"
              width={640}
              height={520}
            />
          </motion.figure>
        </div>
      </div>

      <svg
        className="wave-divider meet-section__wave-bottom"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C300,0 600,100 900,40 C1100,5 1300,70 1440,40 L1440,0 L0,0 Z"
          fill="#F7F3EA"
        />
      </svg>
    </section>
  );
}
