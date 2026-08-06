import { useEffect, useId, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconClose, IconMenu } from "./icons";
import "./Header.css";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/vision", label: "Vision" },
  { to: "/ward-1", label: "Ward 1" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner liquid-glass">
        <Link to="/" className="brand" onClick={close}>
          <img
            src="/images/logo.png"
            alt="A. Salam Shinwary — City Councillor Ward 1 Oshawa"
            className="brand__logo"
            width={52}
            height={52}
          />
          <span className="brand__text">
            <span className="brand__vote">
              VOTE <span className="brand__name">SHINWARY</span>
            </span>
            <span className="brand__sub">WARD 1 · OSHAWA</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? "is-active" : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className="btn btn--primary site-header__cta">
          Get Involved
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div
        id={menuId}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} onClick={close}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--primary" onClick={close}>
            Get Involved
          </Link>
        </nav>
      </div>
    </header>
  );
}
