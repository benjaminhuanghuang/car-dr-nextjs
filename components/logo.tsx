import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Car Doctor mark: a gear with a crossed wrench and screwdriver above the front
 * of a car. Drawn in `currentColor`, so it takes the surrounding text color.
 * Size it with a width class, e.g. `w-8`.
 */
export function Logo({ className }: { className?: string }) {
  // Unique mask ids per instance, so several logos on one page don't collide.
  const id = useId();
  const gearCut = `${id}-gear-cut`;
  const wrenchCut = `${id}-wrench-cut`;

  return (
    <svg
      viewBox="0 0 200 212"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        {/* Masks punch gaps where shapes overlap: white = keep, black = cut. */}
        <mask
          id={gearCut}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="212"
        >
          <rect width="200" height="212" fill="#fff" />
          <g fill="#000" stroke="#000" strokeWidth="7" strokeLinejoin="round">
            <path d="M62 160L74 138Q76 134 82 134H118Q124 134 126 138L138 160Z" />
            <path d="M44 190V170Q44 158 56 158H144Q156 158 156 170V190Q156 196 150 196H50Q44 196 44 190Z" />
          </g>
        </mask>
        <mask
          id={wrenchCut}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="212"
        >
          <rect width="200" height="212" fill="#fff" />
          <g
            transform="translate(100,76) rotate(45)"
            fill="#000"
            stroke="#000"
            strokeWidth="5"
            strokeLinejoin="round"
          >
            <rect x="-6" y="2" width="12" height="28" rx="6" />
            <rect x="-4" y="-2" width="8" height="6" rx="1" />
            <rect x="-1.8" y="-28" width="3.6" height="28" />
            <path d="M-3.5 -28H3.5L2.5 -33H-2.5Z" />
          </g>
        </mask>
      </defs>

      {/* Gear, with the car's outline cut out of it */}
      <g mask={`url(#${gearCut})`} fill="currentColor">
        <circle
          cx="100"
          cy="76"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="-10"
            y="-70"
            width="20"
            height="18"
            rx="3"
            transform={`translate(100,76) rotate(${angle})`}
          />
        ))}
      </g>

      {/* Wrench, with the screwdriver's outline cut out of it */}
      <g mask={`url(#${wrenchCut})`}>
        <g transform="translate(100,76) rotate(-45)" fill="currentColor">
          <path d="M-3.5 -31.36L-3.5 -24L3.5 -24L3.5 -31.36A10 10 0 1 1 -3.5 -31.36Z" />
          <path
            d="M-3.5 -31.36L-3.5 -24L3.5 -24L3.5 -31.36A10 10 0 1 1 -3.5 -31.36Z"
            transform="rotate(180)"
          />
          <rect x="-4" y="-22" width="8" height="44" rx="2" />
        </g>
      </g>

      {/* Screwdriver */}
      <g transform="translate(100,76) rotate(45)" fill="currentColor">
        <rect x="-6" y="2" width="12" height="28" rx="6" />
        <rect x="-4" y="-2" width="8" height="6" rx="1" />
        <rect x="-1.8" y="-28" width="3.6" height="28" />
        <path d="M-3.5 -28H3.5L2.5 -33H-2.5Z" />
      </g>

      {/* Front of the car */}
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          d="M62 160L74 138Q76 134 82 134H118Q124 134 126 138L138 160Z M71 157L79 142Q80 140 83 140H117Q120 140 121 142L129 157Z"
        />
        <path
          fillRule="evenodd"
          d="M44 190V170Q44 158 56 158H144Q156 158 156 170V190Q156 196 150 196H50Q44 196 44 190Z M52 168Q61 165 73 171Q67 178 55 177Q50 175 52 168Z M148 168Q139 165 127 171Q133 178 145 177Q150 175 148 168Z M78 178H122V190Q122 192 120 192H80Q78 192 78 190Z"
        />
        <ellipse cx="48" cy="160" rx="6" ry="4" />
        <ellipse cx="152" cy="160" rx="6" ry="4" />
        <rect x="50" y="192" width="18" height="14" rx="5" />
        <rect x="132" y="192" width="18" height="14" rx="5" />
      </g>
    </svg>
  );
}
