"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DonateQR } from "@/components/DonateQR";
import { accentLastWord } from "@/lib/accentTitle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./DonateQR.css";
import "./CommitmentStrip.css";

type Props = {
  data?: CmsSection;
  email?: string;
};

export function CommitmentStrip({
  data,
  email = "Vote4shinwary@gmail.com",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const eyebrow = data?.subtitle || "The commitment";
  const title = data?.title || "Your voice at City Hall";
  const lead =
    data?.body ||
    "Shinwary is committed to taking your concerns to council — and reporting back every month.";
  const primaryHref = data?.buttonLink || "/contact";
  const primaryLabel = data?.buttonLabel || "Get Involved";

  return (
    <section className="section commit-strip" aria-labelledby="commit-title">
      <div className="container commit-strip__grid">
        <motion.div
          className="commit-strip__copy"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section__eyebrow">{eyebrow}</p>
          <h2 id="commit-title" className="section__title">
            {accentLastWord(title)}
          </h2>
          <p className="section__lead section__lead--wide">{lead}</p>
          <div className="commit-strip__actions">
            <Link href={primaryHref} className="btn btn--primary btn--pill">
              {primaryLabel}
            </Link>
            <Link href="/donate" className="btn btn--ghost-dark btn--pill">
              Donate
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="commit-strip__qr"
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <DonateQR size={128} label="Scan to donate" />
          <p className="commit-strip__email">
            e-Transfer: <strong>{email}</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
