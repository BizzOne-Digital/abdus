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
};

export function PageHero({
  eyebrow,
  title,
  lead,
  image = "/images/hero-bg.jpg",
  ctaHref = "/contact",
  ctaLabel = "Get Involved",
}: Props) {
  const isExternal =
    ctaHref.startsWith("mailto:") || ctaHref.startsWith("tel:");

  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image || "/images/hero-bg.jpg"} alt="" />
        <div className="page-hero__shade" />
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
    </section>
  );
}

