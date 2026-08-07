"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";

const DONATE_PATH = "/donate";
const FALLBACK_ORIGIN = "https://a-shinwary.vercel.app";

type Props = {
  size?: number;
  className?: string;
  label?: string;
};

export function DonateQR({
  size = 112,
  className = "",
  label = "Scan to donate",
}: Props) {
  const [url, setUrl] = useState(
    `${process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_ORIGIN}${DONATE_PATH}`,
  );

  useEffect(() => {
    setUrl(`${window.location.origin}${DONATE_PATH}`);
  }, []);

  return (
    <Link
      href={DONATE_PATH}
      className={`donate-qr ${className}`}
      aria-label="Donate by Interac e-Transfer"
    >
      <span className="donate-qr__frame">
        <QRCode
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#06152f"
          level="M"
        />
      </span>
      {label ? <span className="donate-qr__label">{label}</span> : null}
    </Link>
  );
}
