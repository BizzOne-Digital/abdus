"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./admin.css";

const NAV: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/priorities", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className={`admin-shell ${open ? "is-nav-open" : ""}`}>
      <div className="admin-topbar">
        <button
          type="button"
          className="admin-menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <strong>Shinwary CMS</strong>
        <Link href="/" target="_blank" className="admin-topbar__link">
          Site
        </Link>
      </div>

      {open ? (
        <button
          type="button"
          className="admin-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" width={40} height={40} />
          <div>
            <strong>Shinwary CMS</strong>
            <span>Admin Panel</span>
          </div>
        </div>
        <nav>
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar__foot">
          <Link href="/" target="_blank">
            View site
          </Link>
          <button type="button" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
