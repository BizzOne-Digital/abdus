import { motion } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";
import { SectionHeading } from "./SectionHeading";
import { IconDollar, IconHome, IconPeople, IconShield } from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./PrioritySection.css";

const PRIORITIES = [
  {
    num: "01",
    title: "Responsible Spending",
    body: "Every tax dollar should deliver real value.",
    Icon: IconDollar,
  },
  {
    num: "02",
    title: "Safer Roads",
    body: "Better roads, safer intersections and smarter traffic solutions.",
    Icon: IconShield,
  },
  {
    num: "03",
    title: "Fair Property Taxes",
    body: "Transparent budgets and responsible decisions.",
    Icon: IconHome,
  },
  {
    num: "04",
    title: "Responsive Service",
    body: "A councillor who listens, acts and reports back.",
    Icon: IconPeople,
  },
] as const;

export function PrioritySection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="vision" className="section priority-section" aria-labelledby="vision-title">
      <div className="container">
        <SectionHeading
          id="vision-title"
          className="priority-section__heading"
          title={
            <>
              A Practical Plan for <span className="accent">Ward 1</span>
            </>
          }
        />

        <div className="priority-grid">
          {PRIORITIES.map((item, i) => (
            <motion.div
              key={item.num}
              className={`priority-card-wrap priority-card-wrap--${i}`}
              initial={reduced ? false : { opacity: 0, y: 28, x: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <LiquidGlass as="article" className="priority-card">
                <span className="priority-card__num" aria-hidden="true">
                  {item.num}
                </span>
                <div className="priority-card__icon">
                  <item.Icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <svg
                  className="priority-card__arc"
                  viewBox="0 0 120 36"
                  aria-hidden="true"
                >
                  <path
                    d="M4 28 C 30 4, 90 4, 116 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength={1}
                  />
                </svg>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
