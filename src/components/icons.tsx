import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...p,
});

/** VOXA mark — sound wave identity mark (black/ink wave with teal trailing wave). */
export function VoxaMark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} fill="none" aria-hidden="true">
      <g fill="currentColor">
        <rect x="2.57" y="37.86" width="2.2" height="6.11" rx="1" />
        <rect x="6.04" y="36.03" width="2.2" height="9.77" rx="1" />
        <rect x="9.52" y="33.59" width="2.2" height="14.66" rx="1" />
        <rect x="12.29" y="29.92" width="2.2" height="21.37" rx="1" />
        <rect x="15.77" y="24.43" width="2.2" height="31.76" rx="1" />
        <rect x="19.93" y="18.32" width="2.2" height="45.19" rx="1" />
        <rect x="24.10" y="10.99" width="2.2" height="59.24" rx="1" />
        <rect x="28.27" y="4.27" width="2.2" height="71.45" rx="1" />
        <rect x="32.43" y="0.61" width="2.2" height="78.78" rx="1" />
        <rect x="37.99" y="6.72" width="2.2" height="67.79" rx="1" />
        <rect x="42.16" y="13.44" width="2.2" height="54.96" rx="1" />
        <rect x="46.32" y="21.37" width="2.2" height="39.69" rx="1" />
        <rect x="50.49" y="28.70" width="2.2" height="24.43" rx="1" />
        <rect x="53.96" y="34.20" width="2.2" height="12.82" rx="1" />
        <rect x="58.13" y="31.76" width="2.2" height="17.10" rx="1" />
        <rect x="62.29" y="25.04" width="2.2" height="31.15" rx="1" />
        <rect x="66.46" y="17.10" width="2.2" height="46.41" rx="1" />
        <rect x="69.93" y="12.82" width="2.2" height="54.35" rx="1" />
      </g>
      <g fill="#4e7e87">
        <rect x="74.10" y="9.77" width="2.2" height="59.85" rx="1" />
        <rect x="78.27" y="13.44" width="2.2" height="50.69" rx="1" />
        <rect x="81.74" y="20.76" width="2.2" height="37.25" rx="1" />
        <rect x="83.82" y="18.93" width="2.2" height="41.53" rx="1" />
        <rect x="87.29" y="23.82" width="2.2" height="31.76" rx="1" />
        <rect x="90.77" y="28.70" width="2.2" height="23.21" rx="1" />
        <rect x="94.24" y="32.37" width="2.2" height="16.49" rx="1" />
        <rect x="97.02" y="34.81" width="2.2" height="10.99" rx="1" />
      </g>
    </svg>
  );
}

/** Video: viewfinder corners + play. */
export const IconVideo = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3" />
    <path d="M10 9l5 3-5 3z" fill="currentColor" />
  </svg>
);

/** Photo: aperture. */
export const IconPhoto = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
  </svg>
);

/** Graphic: vector pen tool. */
export const IconGraphic = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

/** Reel: portrait frame + play. */
export const IconReel = (p: P) => (
  <svg {...base(p)}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
    <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" />
  </svg>
);

export const IconGrid = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

/** Motion: orbit curve. */
export const IconMotion = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 17c4 0 4-10 9-10s5 10 9 10" />
    <circle cx="3" cy="17" r="1.4" fill="currentColor" />
    <circle cx="21" cy="17" r="1.4" fill="currentColor" />
  </svg>
);

/** Arrow pointing up-left (forward direction in RTL). */
export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M17 17 7 7M7 17V7h10" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h10" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconChevronLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const IconChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
  </svg>
);

export const IconFacebook = (p: P) => (
  <svg {...base(p)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const IconWhatsapp = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
    <path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export const IconBehance = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 6h5a3 3 0 0 1 0 6H3zM3 12h6a3 3 0 0 1 0 6H3zM14 8h6M14.5 15a3 3 0 0 0 5.5 1M14.5 15a3 3 0 1 1 5.9-.9" />
  </svg>
);

export const IconYoutube = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" />
  </svg>
);
