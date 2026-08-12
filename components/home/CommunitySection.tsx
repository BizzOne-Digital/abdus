"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import type { CmsSection } from "@/lib/cms";
import "./CommunitySection.css";

const DEFAULT_GALLERY = [
  {
    src: "/images/community-1.jpg",
    alt: "Community event",
    label: "Community",
    caption: "Celebrating neighbours and local traditions.",
  },
  {
    src: "/images/community-2.jpg",
    alt: "Collaboration meeting",
    label: "Collaboration",
    caption: "Listening and working with partners.",
  },
  {
    src: "/images/community-3.jpg",
    alt: "Local advocacy",
    label: "Action",
    caption: "Turning conversations into advocacy.",
  },
];

const DEFAULT_ADVOCACY = [
  "Conlin Road improvements",
  "Student transportation",
  "Safer routes for children",
  "Parks and green spaces",
  "School partnerships",
];

type Props = {
  community?: CmsSection;
  advocacy?: CmsSection;
};

export function CommunitySection({ community, advocacy }: Props) {
  const reduced = usePrefersReducedMotion();

  const gallery = community?.items?.length
    ? community.items.map((item, i) => ({
        src: resolveMediaUrl(item.image || DEFAULT_GALLERY[i % 3].src),
        alt: item.title || "Community",
        label: item.title || "Community",
        caption: item.body || "",
      }))
    : DEFAULT_GALLERY;

  const advocacyItems = advocacy?.items?.length
    ? advocacy.items.map((i) => i.title || "")
    : DEFAULT_ADVOCACY;

  return (
    <section
      id="community"
      className="section community-section"
      aria-labelledby="community-title"
    >
      <div className="container">
        <motion.div
          className="community-head"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">In the community</p>
          <h2 id="community-title" className="section__title">
            Rooted in <span className="accent">Community</span>
          </h2>
          <p className="section__lead section__lead--wide">
            Experience and presence — with the people of Ward 1.
          </p>
        </motion.div>

        <div className="community-gallery" aria-label="Community photos">
          {gallery.map((item, i) => (
            <motion.figure
              key={`${item.label}-${i}`}
              className="community-shot"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: reduced ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="community-shot__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  width={420}
                  height={300}
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

        <div className="community-advocacy">
          <h3 className="community-advocacy__title">Local priorities</h3>
          <ul className="advocacy-chips">
            {advocacyItems.map((item, i) => (
              <motion.li
                key={item + i}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : i * 0.04, duration: 0.35 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
