"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  IconDollar,
  IconHome,
  IconPeople,
  IconShield,
} from "@/components/icons";
import { LiquidGlass } from "@/components/LiquidGlass";
import type { CmsSection } from "@/lib/cms";
import "./HeroCarousel.css";

type SlideId = 0 | 1 | 2;

const AUTO_MS = 7000;
const SLIDE_COUNT = 3;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "70%" : "-70%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-45%" : "45%",
    opacity: 0,
  }),
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const staggerChild = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

function MapleLeaf() {
  return (
    <svg
      className="hero-maple"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2.2c.4 1.6 1.3 2.8 2.6 3.6-.2-1.5.2-2.8 1.2-3.8.3 1.7 1.2 3 2.6 3.8-.9.2-1.6.8-2 1.7 1.4-.3 2.7 0 3.8 1-.9 1-1.4 2.1-1.4 3.3 1.2.1 2.3.6 3.2 1.5-1.5.7-2.7 1.8-3.4 3.2 1 .7 1.5 1.7 1.5 2.9-1.3-.4-2.5-.3-3.5.3.5 1.2.5 2.4 0 3.5-.9-.8-2-1.1-3.2-.9.2 1.4 0 2.6-.6 3.6H12c-.6-1-.8-2.2-.6-3.6-1.2-.2-2.3.1-3.2.9-.5-1.1-.5-2.3 0-3.5-1-.6-2.2-.7-3.5-.3 0-1.2.5-2.2 1.5-2.9-.7-1.4-1.9-2.5-3.4-3.2.9-.9 2-1.4 3.2-1.5 0-1.2-.5-2.3-1.4-3.3 1.1-1 2.4-1.3 3.8-1-.4-.9-1.1-1.5-2-1.7 1.4-.8 2.3-2.1 2.6-3.8 1 1 1.4 2.3 1.2 3.8C10.7 5 11.6 3.8 12 2.2Z"
      />
    </svg>
  );
}

export function HeroCarousel({
  hero,
  heroMeet,
  heroPlan,
  priorities,
}: {
  hero?: CmsSection;
  heroMeet?: CmsSection;
  heroPlan?: CmsSection;
  priorities?: Array<{ title: string }>;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState<SlideId>(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: SlideId, dir?: number) => {
      setDirection(
        dir ?? (next > index || (index === SLIDE_COUNT - 1 && next === 0) ? 1 : -1),
      );
      setIndex(next);
    },
    [index],
  );

  const next = useCallback(() => {
    goTo(((index + 1) % SLIDE_COUNT) as SlideId, 1);
  }, [goTo, index]);

  const prev = useCallback(() => {
    goTo(((index + SLIDE_COUNT - 1) % SLIDE_COUNT) as SlideId, -1);
  }, [goTo, index]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(id);
  }, [next, paused, reduced]);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Slide ${index + 1} of ${SLIDE_COUNT}`;
    }
  }, [index]);

  const onPointerDown = (e: ReactPointerEvent) => {
    touchX.current = e.clientX;
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (touchX.current == null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      id="top"
      className="hero"
      aria-roledescription="carousel"
      aria-label="Campaign highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="hero__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" />
        <div className="hero__bg-shade" />
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true" ref={liveRef} />

      <div className="hero__stage container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            className="hero__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}
            custom={direction}
            variants={reduced ? undefined : slideVariants}
            initial={reduced ? false : "enter"}
            animate="center"
            exit={reduced ? undefined : "exit"}
            transition={{
              duration: reduced ? 0 : 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {index === 0 && <SlideLeadership reduced={reduced} data={hero} />}
            {index === 1 && <SlideMeet reduced={reduced} data={heroMeet} />}
            {index === 2 && (
              <SlidePlan
                reduced={reduced}
                data={heroPlan}
                priorities={priorities}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Hero slides">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={index === i}
            aria-label={`Show slide ${i + 1}`}
            className={`hero__dot ${index === i ? "is-active" : ""}`}
            onClick={() => goTo(i as SlideId, i > index ? 1 : -1)}
          />
        ))}
      </div>

      <div className="hero__curve" aria-hidden="true">
        <svg
          className="hero__curve-svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroCurveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a274f" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#06152f" stopOpacity="1" />
              <stop offset="100%" stopColor="#06152f" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="heroCurveGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#49c7e8" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#8ddcff" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#176bdb" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#176bdb" stopOpacity="0.15" />
            </linearGradient>
            <filter id="heroCurveBlur" x="-10%" y="-40%" width="120%" height="180%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          {/* Rising left swoosh fill into next section */}
          <path
            className="hero__curve-fill"
            d="M0 78
               C 120 18, 240 -8, 380 42
               C 520 92, 620 148, 780 158
               C 980 172, 1180 148, 1440 168
               L 1440 220 L 0 220 Z"
            fill="url(#heroCurveFill)"
          />
          {/* Soft glow under the edge */}
          <path
            d="M0 78
               C 120 18, 240 -8, 380 42
               C 520 92, 620 148, 780 158
               C 980 172, 1180 148, 1440 168"
            fill="none"
            stroke="url(#heroCurveGlow)"
            strokeWidth="18"
            opacity="0.35"
            filter="url(#heroCurveBlur)"
          />
          {/* Crisp neon edge */}
          <path
            className="hero__curve-edge"
            d="M0 78
               C 120 18, 240 -8, 380 42
               C 520 92, 620 148, 780 158
               C 980 172, 1180 148, 1440 168"
            fill="none"
            stroke="url(#heroCurveGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}

function SlideLeadership({
  reduced,
  data,
}: {
  reduced: boolean;
  data?: CmsSection;
}) {
  const photo =
    data?.items?.find((i) => i.key === "photo")?.image ||
    "/images/candidate-hero.png";
  const signature = data?.items?.find((i) => i.key === "signature");
  const title = data?.title || "Strong Leadership. Better Oshawa.";
  const lines = title.includes(".")
    ? title.split(".").map((s) => s.trim()).filter(Boolean)
    : ["Strong Leadership", "Better Oshawa"];

  return (
    <div className="hero-grid hero-grid--lead">
      <motion.div
        className="hero-photo"
        initial={reduced ? false : { opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt="A. Salam Shinwary, candidate for City Councillor, Ward 1 Oshawa"
          width={560}
          height={720}
        />
      </motion.div>

      <motion.div
        className="hero-copy hero-copy--lead"
        variants={reduced ? undefined : staggerParent}
        initial={reduced ? false : "hidden"}
        animate="show"
      >
        <motion.p className="hero-eyebrow hero-eyebrow--lead" variants={staggerChild}>
          <span className="hero-eyebrow__text">
            <span className="hero-eyebrow__mark">City</span>{" "}
            {(data?.body || "Councillor · Ward 1").replace(/^City\s+/i, "")}
          </span>
          <MapleLeaf />
        </motion.p>
        <motion.h1 className="hero-title hero-title--lead" variants={staggerChild}>
          {lines.length >= 2 ? (
            <>
              <span className="hero-title__line">{lines[0].split(" ")[0]}</span>
              <span className="hero-title__line">
                {lines[0].split(" ").slice(1).join(" ") || "Leadership"}.
              </span>
              <span className="hero-title__line accent hero-title__line--keep">
                {lines[1]}.
              </span>
            </>
          ) : (
            <span className="hero-title__line">{title}</span>
          )}
        </motion.h1>
        <motion.p className="hero-tagline" variants={staggerChild}>
          {data?.subtitle || "Listening. Leading. Delivering."}
        </motion.p>
        <motion.div className="hero-actions" variants={staggerChild}>
          <Link
            href={data?.buttonLink || "/vision"}
            className="btn btn--primary btn--pill"
          >
            {data?.buttonLabel || "Our Priorities"}{" "}
            <span className="btn__chevron" aria-hidden="true" />
          </Link>
          <Link href="/about" className="btn btn--ghost btn--pill">
            Meet Shinwary
          </Link>
        </motion.div>
      </motion.div>

      <motion.aside
        className="hero-signature"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.55 }}
      >
        <LiquidGlass hover={false} className="hero-signature__card">
          <span className="hero-signature__script" aria-hidden="true">
            A. Salam Shinwary
          </span>
          <div className="hero-signature__text">
            <strong>{signature?.title || "Vote A. Salam Shinwary"}</strong>
            <span>{signature?.body || "A Strong Voice for Ward 1"}</span>
          </div>
        </LiquidGlass>
      </motion.aside>
    </div>
  );
}

function SlideMeet({
  reduced,
  data,
}: {
  reduced: boolean;
  data?: CmsSection;
}) {
  const pills =
    data?.items?.map((i) => i.title || "").filter(Boolean) ||
    [
      "15+ Years of Service",
      "Environmental Management",
      "Community Leadership",
    ];

  return (
    <div className="hero-grid hero-grid--meet">
      <motion.div
        className="hero-copy hero-copy--wide"
        variants={reduced ? undefined : staggerParent}
        initial={reduced ? false : "hidden"}
        animate="show"
      >
        <motion.p className="hero-eyebrow" variants={staggerChild}>
          {data?.subtitle || "Candidate Profile"}
          <MapleLeaf />
        </motion.p>
        <motion.h2 className="hero-title hero-title--alt" variants={staggerChild}>
          <span className="hero-title__line">
            {(data?.title || "Meet & Elect Shinwary").replace(
              /\s*Shinwary\s*$/i,
              "",
            )}{" "}
            <span className="accent">Shinwary</span>
          </span>
        </motion.h2>
        <motion.p className="hero-support" variants={staggerChild}>
          {data?.body ||
            "Experience shaped by service. Leadership focused on Ward 1."}
        </motion.p>
        <motion.ul className="hero-pills" variants={staggerChild}>
          {pills.map((label) => (
            <li key={label}>
              <LiquidGlass variant="pill" className="hero-pill">
                {label}
              </LiquidGlass>
            </li>
          ))}
        </motion.ul>
        <motion.div variants={staggerChild}>
          <Link
            href={data?.buttonLink || "/about"}
            className="btn btn--primary btn--pill"
          >
            {data?.buttonLabel || "Meet Shinwary"}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-photo hero-photo--cutout-sm"
        initial={reduced ? false : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.image || "/images/candidate-hero.png"}
          alt="A. Salam Shinwary"
          width={420}
          height={540}
        />
      </motion.div>
    </div>
  );
}

function SlidePlan({
  reduced,
  data,
  priorities,
}: {
  reduced: boolean;
  data?: CmsSection;
  priorities?: Array<{ title: string }>;
}) {
  const icons = [IconDollar, IconShield, IconHome, IconPeople];
  const items =
    priorities?.length
      ? priorities.map((p, i) => ({
          label: p.title,
          Icon: icons[i % icons.length],
        }))
      : [
          { label: "Responsible Spending", Icon: IconDollar },
          { label: "Safer Roads", Icon: IconShield },
          { label: "Fair Property Taxes", Icon: IconHome },
          { label: "Responsive Service", Icon: IconPeople },
        ];

  return (
    <div className="hero-grid hero-grid--plan">
      <motion.div
        className="hero-copy hero-copy--wide"
        variants={reduced ? undefined : staggerParent}
        initial={reduced ? false : "hidden"}
        animate="show"
      >
        <motion.p className="hero-eyebrow" variants={staggerChild}>
          {data?.subtitle || "Priorities"}
          <MapleLeaf />
        </motion.p>
        <motion.h2 className="hero-title hero-title--alt" variants={staggerChild}>
          <span className="hero-title__line">
            {(data?.title || "A Practical Plan for Ward 1").replace(
              /\s*Ward 1\s*$/i,
              "",
            )}{" "}
            <span className="accent">Ward 1</span>
          </span>
        </motion.h2>
        <motion.p className="hero-support" variants={staggerChild}>
          {data?.body ||
            "Safer streets. Responsible spending. Stronger neighbourhood services."}
        </motion.p>
        <motion.ul className="hero-plan-icons" variants={staggerChild}>
          {items.map(({ label, Icon }) => (
            <li key={label}>
              <LiquidGlass className="hero-plan-icon" hover={false}>
                <span className="icon-wrap">
                  <Icon size={22} />
                </span>
                <span>{label}</span>
              </LiquidGlass>
            </li>
          ))}
        </motion.ul>
        <motion.div variants={staggerChild}>
          <Link
            href={data?.buttonLink || "/vision"}
            className="btn btn--primary btn--pill"
          >
            {data?.buttonLabel || "View the Plan"}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
