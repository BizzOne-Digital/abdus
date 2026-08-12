"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DonateQR } from "@/components/DonateQR";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import "./donate-page.css";

const BASE_STEPS = [
  {
    num: "1",
    title: "Open your banking app",
    body: "Choose Interac e-Transfer (send money).",
  },
  {
    num: "2",
    title: "Send to this email",
    body: "",
  },
  {
    num: "3",
    title: "Add a short note",
    body: 'Optional: your name and "Ward 1 campaign".',
  },
];

export function DonatePageContent({ email }: { email: string }) {
  const reduced = usePrefersReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const steps = BASE_STEPS.map((step, i) =>
    i === 1 ? { ...step, body: email } : step,
  );

  return (
    <div className="donate-page">
      <section className="donate-guide section">
        <div className="container donate-guide__grid">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="section__eyebrow">Support Ward 1</p>
            <h2 className="section__title">
              Every dollar builds the <span className="accent">campaign</span>
            </h2>
            <p className="section__lead section__lead--wide">
              Signs, outreach, and community events — your donation helps
              Shinwary take neighbours&apos; voices to City Hall.
            </p>
            <ul className="donate-guide__bullets">
              <li>Fast Interac e-Transfer</li>
              <li>Secure through your bank</li>
              <li>No account needed on this site</li>
            </ul>
          </motion.div>

          <motion.div
            className="donate-guide__qr"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease }}
          >
            <DonateQR size={160} label="Share this page" />
          </motion.div>
        </div>
      </section>

      <section className="donate-etransfer section" aria-labelledby="etransfer-title">
        <div className="container">
          <motion.div
            className="donate-etransfer__card"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="section__eyebrow">Donate</p>
            <h2 id="etransfer-title" className="section__title">
              Donate through <span className="accent">e-Transfer</span>
            </h2>
            <p className="donate-etransfer__email">
              <span>Send to</span>
              <a href={`mailto:${email}`}>{email}</a>
            </p>

            <ol className="donate-steps">
              {steps.map((step, i) => (
                <motion.li
                  key={step.num}
                  initial={reduced ? false : { opacity: 0, x: 14 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduced ? 0 : i * 0.07, duration: 0.4 }}
                >
                  <span className="donate-steps__num">{step.num}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="donate-etransfer__actions">
              <a
                href={`mailto:${email}?subject=Campaign%20donation`}
                className="btn btn--primary btn--pill"
              >
                Email {email}
              </a>
              <Link href="/contact" className="btn btn--ghost-dark btn--pill">
                Other ways to help
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
