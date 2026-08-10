/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Settings } from "@/models/Settings";

async function getSettings(): Promise<any> {
  await connectDB();
  return (
    (await Settings.findOne({ key: "site" }).lean()) || {
      siteName: "Vote Shinwary",
      logo: "/images/logo.png",
      email: "Vote4shinwary@gmail.com",
      phone: "416 419 2457",
      tagline: "Strong leadership. Better Oshawa.",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    }
  );
}

const NAV = [
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/ward-1", label: "Ward 1" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export async function SiteFooter() {
  const settings = await getSettings();
  const email = "Vote4shinwary@gmail.com";
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={settings.logo || "/images/logo.png"}
              alt=""
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
          <p className="site-footer__tagline">{settings.tagline}</p>
          <Link href="/contact" className="btn btn--primary btn--pill site-footer__cta">
            Get Involved
          </Link>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <h3 className="site-footer__heading">Explore</h3>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <h3 className="site-footer__heading">Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <a href={`tel:${String(settings.phone).replace(/\s/g, "")}`}>
                {settings.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © {year} {settings.siteName} · Ward 1 · Oshawa
          </p>
          <p>Authorized by the official agent for A. Salam Shinwary.</p>
        </div>
      </div>
    </footer>
  );
}
