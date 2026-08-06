"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import "./PageHero.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Smooth zigzag bottom edge */
  withWave?: boolean;
  /** Wave fill — match the section below */
  waveColor?: string;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  image = "/images/hero-bg.jpg",
  ctaHref = "/contact",
  ctaLabel = "Get Involved",
  withWave = false,
  waveColor = "#F7F3EA",
}: Props) {
  const isExternal =
    ctaHref.startsWith("mailto:") || ctaHref.startsWith("tel:");

  return (
    <section
      className={`page-hero${withWave ? " page-hero--wave" : ""}`}
      aria-labelledby="page-hero-title"
    >
      <div className="page-hero__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image || "/images/hero-bg.jpg"} alt="" />
      </div>
      <div className="container page-hero__inner">
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1 id="page-hero-title" className="page-hero__title">
          {title}
        </h1>
        <p className="page-hero__lead">{lead}</p>
        <div className="page-hero__actions">
          {isExternal ? (
            <a href={ctaHref} className="btn btn--primary btn--pill">
              {ctaLabel}
            </a>
          ) : (
            <Link href={ctaHref} className="btn btn--primary btn--pill">
              {ctaLabel}
            </Link>
          )}
          <Link href="/" className="btn btn--ghost btn--pill">
            Back to Home
          </Link>
        </div>
      </div>

      {withWave ? (
        <svg
          className="page-hero__wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,48 C180,95 300,8 480,52 C660,96 780,12 960,48 C1140,84 1260,18 1440,55 L1440,100 L0,100 Z"
            fill={waveColor}
          />
        </svg>
      ) : null}
    </section>
  );
}
