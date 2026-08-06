"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = {
  pages: number;
  priorities: number;
  gallery: number;
  testimonials: number;
  faqs: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of campaign website content.</p>
        </div>
        <Link className="btn-admin primary" href="/" target="_blank">
          Open website
        </Link>
      </div>

      <div className="admin-grid">
        {(
          [
            ["Pages", stats?.pages],
            ["Priorities", stats?.priorities],
            ["Gallery", stats?.gallery],
            ["Testimonials", stats?.testimonials],
            ["FAQs", stats?.faqs],
          ] as const
        ).map(([label, value]) => (
          <div className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value ?? "—"}</strong>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Quick links</h2>
        <div className="admin-actions">
          <Link className="btn-admin" href="/admin/pages">
            Edit pages
          </Link>
          <Link className="btn-admin" href="/admin/priorities">
            Edit priorities
          </Link>
          <Link className="btn-admin" href="/admin/gallery">
            Manage gallery
          </Link>
          <Link className="btn-admin" href="/admin/settings">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
