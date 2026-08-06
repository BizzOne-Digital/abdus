import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 28, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };
}

export function IconDollar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5v11M15 9.2c0-1.2-1.3-2-3-2s-3 .8-3 2 1.3 1.8 3 2.2 3 1 3 2.2-1.3 2-3 2-3-.8-3-2" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 5 6.5v5.2c0 4.2 2.9 7.4 7 8.8 4.1-1.4 7-4.6 7-8.8V6.5L12 3.5Z" />
      <path d="m9.2 12 1.9 1.9 3.7-3.8" />
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

export function IconPeople(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="2.5" />
      <circle cx="16" cy="9" r="2" />
      <path d="M3.5 18.5c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <path d="M14 14c2 .2 3.6 1.3 4.2 3.5" />
    </svg>
  );
}

export function IconRoad(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 21 10.5 3h3L16 21" />
      <path d="M12 7v2.5M12 12.5V15M12 18v2" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 14.5C5 8.5 10 4 19 4c0 9-4.5 14-10.5 14S5 18 5 14.5Z" />
      <path d="M9 15c2-2 4.5-4.5 8-7" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 3.5h3l1.2 4.2-2 1.2a11 11 0 0 0 5 5l1.2-2 4.2 1.2v3A2 2 0 0 1 18.5 18 14.5 14.5 0 0 1 4 3.5 2 2 0 0 1 6 2.5h2Z" />
    </svg>
  );
}

export function IconVisible(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function IconUpdates(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6.5h16v12H4z" />
      <path d="M4 9.5h16M8 4.5v2M16 4.5v2" />
    </svg>
  );
}

export function IconAccountable(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 12.5 10.2 15.7 17 8.5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function IconEducation(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 10 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12.2v4.3c0 .8 2.2 2.5 5 2.5s5-1.7 5-2.5v-4.3" />
      <path d="M21 10v6" />
    </svg>
  );
}

export function IconExperience(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="7" width="16" height="12" rx="1.5" />
      <path d="M8 7V5.5A2 2 0 0 1 10 3.5h4A2 2 0 0 1 16 5.5V7" />
    </svg>
  );
}

export function IconLeadership(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3.5 1.8 4.2L18.5 9l-3.4 3 1 4.7L12 14.5 7.9 16.7l1-4.7L5.5 9l4.7-1.3L12 3.5Z" />
    </svg>
  );
}

export function IconWhy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20.5s-7-4.2-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 3.3c0 5-7 9.2-7 9.2Z" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base({ size: 24, ...props })}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base({ size: 24, ...props })}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
