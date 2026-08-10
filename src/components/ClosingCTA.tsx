import { Link } from "react-router-dom";
import { LiquidGlass } from "./LiquidGlass";
import { IconMail, IconPhone } from "./icons";
import "./ClosingCTA.css";

export function ClosingCTA() {
  return (
    <section id="contact" className="closing" aria-labelledby="contact-title">
      <div className="closing__glow" aria-hidden="true" />
      <div className="closing__skyline" aria-hidden="true">
        <img src="/images/skyline.svg" alt="" />
      </div>

      <div className="container closing__inner">
        <LiquidGlass hover={false} className="closing__panel">
          <p className="closing__vote">Vote A. Salam Shinwary</p>
          <h2 id="contact-title" className="closing__title">
            Let’s move Ward 1 forward.
          </h2>
          <p className="closing__lead">
            Your voice. Your neighbourhood. Your future.
          </p>
          <Link to="/contact" className="btn btn--navy closing__cta">
            Join the Campaign <span className="btn__chevron" aria-hidden="true" />
          </Link>

          <ul className="closing__contacts">
            <li>
              <a href="mailto:Vote4shinwary@gmail.com">
                <IconMail size={18} />
                <span>Vote4shinwary@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+14164192457">
                <IconPhone size={18} />
                <span>416 419 2457</span>
              </a>
            </li>
          </ul>
        </LiquidGlass>
      </div>
    </section>
  );
}
