import { Link } from "react-router-dom";
import { IconMail, IconPhone } from "./icons";
import "./Footer.css";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/vision", label: "Vision" },
  { to: "/ward-1", label: "Ward 1" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__glow" aria-hidden="true" />

      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <img
              src="/images/logo.png"
              alt="A. Salam Shinwary — City Councillor Ward 1 Oshawa"
              className="site-footer__logo-img"
              width={72}
              height={72}
            />
            <span className="site-footer__logo-text">
              <span>
                VOTE <span className="site-footer__name">SHINWARY</span>
              </span>
              <span className="site-footer__sub">WARD 1 · OSHAWA</span>
            </span>
          </Link>
          <p className="site-footer__tagline">
            Strong leadership. Better Oshawa. A practical voice for Ward 1.
          </p>
          <Link to="/contact" className="btn btn--primary btn--pill site-footer__cta">
            Get Involved
          </Link>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <h3 className="site-footer__heading">Explore</h3>
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <h3 className="site-footer__heading">Contact</h3>
          <ul>
            <li>
              <a href="mailto:salam.jan111@gmail.com">
                <IconMail size={18} />
                <span>salam.jan111@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+14164192457">
                <IconPhone size={18} />
                <span>416 419 2457</span>
              </a>
            </li>
          </ul>
          <p className="site-footer__vote">Vote A. Salam Shinwary</p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>© {year} Vote Shinwary · Ward 1 · Oshawa</p>
          <p>Authorized by the official agent for A. Salam Shinwary.</p>
        </div>
      </div>
    </footer>
  );
}
