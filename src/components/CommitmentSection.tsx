import { motion } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";
import { SectionHeading } from "./SectionHeading";
import { IconAccountable, IconUpdates, IconVisible } from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./CommitmentSection.css";

const ITEMS = [
  {
    title: "Visible & Accessible",
    body: "Easy to reach and active in the community.",
    Icon: IconVisible,
  },
  {
    title: "Regular Updates",
    body: "Clear monthly updates online and in neighbourhoods.",
    Icon: IconUpdates,
  },
  {
    title: "Transparent & Accountable",
    body: "Honest decisions, open communication and measurable progress.",
    Icon: IconAccountable,
  },
] as const;

export function CommitmentSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className="section commitment-section"
      aria-labelledby="commitment-title"
    >
      <div className="container">
        <SectionHeading
          id="commitment-title"
          className="commitment-heading"
          title="You should always know what your councillor is doing."
        />

        <div className="commitment-grid">
          {ITEMS.map((item, i) => (
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
