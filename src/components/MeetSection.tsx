import { motion } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";
import {
  IconEducation,
  IconExperience,
  IconLeadership,
  IconWhy,
} from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./MeetSection.css";

const CARDS = [
  {
    title: "Education",
    body: "Environmental Management and Paralegal education.",
    Icon: IconEducation,
  },
  {
    title: "Experience",
    body: "More than 15 years serving Canadian communities.",
    Icon: IconExperience,
  },
  {
    title: "Leadership",
    body: "Government, non-profit and private-sector project and budget experience.",
    Icon: IconLeadership,
  },
  {
    title: "Why He Is Running",
    body: "Canada gave his family opportunity. Now he is ready to give back.",
    Icon: IconWhy,
  },
] as const;

export function MeetSection() {
  const reduced = usePrefersReducedMotion();

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
            <p className="meet-kicker">Meet Shinwary</p>

            <h2 id="about-title" className="meet-title">
              Experience that serves.
            </h2>

            <div className="meet-quote-row">
              <div className="meet-years-box" aria-label="15 plus years">
                <span className="meet-years-box__num">15+</span>
                <span className="meet-years-box__label">Years</span>
              </div>

              <blockquote className="meet-quote">
                <p>
                  Canada gave my family opportunity. Now it’s my turn to give
                  back.
                </p>
                <footer>— A. Salam Shinwary</footer>
              </blockquote>
            </div>

            <p className="meet-intro">
              Shinwary rebuilt his life in Canada through hard work and
              education. That journey shaped a practical leader.
            </p>

            <div className="meet-cards">
              {CARDS.map((card, i) => (
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
            <img
              src="/images/candidate-podium.jpg"
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
