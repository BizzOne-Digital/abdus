import { motion } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";
import { SectionHeading } from "./SectionHeading";
import { IconLeaf, IconPeople, IconRoad } from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Ward1Section.css";

const POINTS = [
  {
    title: "Safe Streets",
    body: "Better roads, intersections, lighting and school routes.",
    Icon: IconRoad,
  },
  {
    title: "Green Spaces",
    body: "Protecting parks and creating welcoming community spaces.",
    Icon: IconLeaf,
  },
  {
    title: "Strong Services",
    body: "Reliable neighbourhood services that improve everyday life.",
    Icon: IconPeople,
  },
] as const;

export function Ward1Section() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="ward1" className="section ward-section" aria-labelledby="ward-title">
      <div className="container ward-layout">
        <motion.div
          className="ward-map-wrap"
          initial={reduced ? false : { opacity: 0, x: -28 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <LiquidGlass className="ward-map-card" hover={false}>
            <img
              src="/images/ward1-map.svg"
              alt="Simplified map highlighting North Oshawa Ward 1"
              width={480}
              height={420}
            />
          </LiquidGlass>
        </motion.div>

        <div className="ward-copy">
          <SectionHeading
            id="ward-title"
            title={
              <>
                Ward 1 is <span className="accent">Home</span>
              </>
            }
            lead="North Oshawa deserves visible representation, smart investment and a councillor who stays connected."
          />

          <ul className="ward-points">
            {POINTS.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduced ? 0 : i * 0.08, duration: 0.45 }}
              >
                <LiquidGlass className="ward-point">
                  <div className="ward-point__icon">
                    <item.Icon size={24} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </LiquidGlass>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
