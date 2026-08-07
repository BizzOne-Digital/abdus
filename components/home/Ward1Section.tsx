"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { DonateQR } from "@/components/DonateQR";
import { IconLeaf, IconPeople, IconRoad } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CmsSection } from "@/lib/cms";
import "./Ward1Section.css";

const WardMap = dynamic(
  () => import("./WardMap").then((m) => m.WardMap),
  {
    ssr: false,
    loading: () => (
      <div className="ward-map ward-map--loading">
        <p>Loading Ward 1 map…</p>
      </div>
    ),
  },
);

const ICONS = [IconRoad, IconLeaf, IconPeople];

const DEFAULT_POINTS = [
  { title: "Safe Streets", body: "Roads, lighting and school routes." },
  { title: "Green Spaces", body: "Parks and welcoming community spaces." },
  { title: "Strong Services", body: "Reliable neighbourhood services." },
];

type Props = {
  data?: CmsSection;
};

export function Ward1Section({ data }: Props) {
  const reduced = usePrefersReducedMotion();
  const points = (data?.items?.length ? data.items : DEFAULT_POINTS).map(
    (item, i) => ({
      title: item.title || "",
      body: item.body || "",
      Icon: ICONS[i % ICONS.length],
    }),
  );

  return (
    <section id="ward1" className="section ward-section" aria-labelledby="ward-title">
      <div className="container ward-layout">
        <motion.div
          className="ward-map-wrap"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <WardMap />
        </motion.div>

        <div className="ward-copy">
          <SectionHeading
            id="ward-title"
            eyebrow="Ward 1 · Oshawa"
            title={
              <>
                Ward 1 is <span className="accent">Home</span>
              </>
            }
            lead={
              data?.body ||
              "North Oshawa needs a councillor who shows up and takes your voice to City Hall."
            }
          />

          <ul className="ward-points">
            {points.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduced ? 0 : i * 0.06, duration: 0.4 }}
              >
                <div className="ward-point">
                  <div className="ward-point__icon">
                    <item.Icon size={22} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="ward-donate-row"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <DonateQR size={96} label="Donate" />
            <div className="ward-donate-row__copy">
              <h3>Support the campaign</h3>
              <p>
                Scan the QR or use Interac e-Transfer to{" "}
                <strong>Vote4shinwary@gmail.com</strong>
              </p>
              <Link href="/donate" className="btn btn--primary btn--pill">
                How to donate
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
