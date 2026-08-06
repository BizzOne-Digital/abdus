"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "right";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  children,
}: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.header
      className={`section-heading section-heading--${align} ${className}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="section__title">
        {title}
      </h2>
      {lead ? <p className="section__lead section__lead--wide">{lead}</p> : null}
      {children}
    </motion.header>
  );
}
