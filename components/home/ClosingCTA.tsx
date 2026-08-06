"use client";

import Link from "next/link";
import { LiquidGlass } from "@/components/LiquidGlass";
import { IconMail, IconPhone } from "@/components/icons";
import type { CmsSection } from "@/lib/cms";
import "./ClosingCTA.css";

type Props = {
  email?: string;
  phone?: string;
  data?: CmsSection;
};

export function ClosingCTA({
  email = "salam.jan111@gmail.com",
  phone = "416 419 2457",
  data,
}: Props) {
  const tel = phone.replace(/\s/g, "");

  return (
    <section id="contact" className="closing" aria-labelledby="contact-title">
      <div className="closing__glow" aria-hidden="true" />
      <div className="closing__skyline" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/skyline.svg" alt="" />
      </div>

      <div className="container closing__inner">
        <LiquidGlass hover={false} className="closing__panel">
          <p className="closing__vote">
            {data?.body || "Vote A. Salam Shinwary"}
          </p>
          <h2 id="contact-title" className="closing__title">
            {data?.title || "Let’s move Ward 1 forward."}
          </h2>
          <p className="closing__lead">
            {data?.subtitle || "Your voice. Your neighbourhood. Your future."}
          </p>
          <Link
            href={data?.buttonLink || "/contact"}
            className="btn btn--navy closing__cta"
          >
            {data?.buttonLabel || "Join the Campaign"}{" "}
            <span className="btn__chevron" aria-hidden="true" />
          </Link>

          <ul className="closing__contacts">
            <li>
              <a href={`mailto:${email}`}>
                <IconMail size={18} />
                <span>{email}</span>
              </a>
            </li>
            <li>
              <a href={`tel:${tel.startsWith("+") ? tel : `+1${tel}`}`}>
                <IconPhone size={18} />
                <span>{phone}</span>
              </a>
            </li>
          </ul>
        </LiquidGlass>
      </div>
    </section>
  );
}
