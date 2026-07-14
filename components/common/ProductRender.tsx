import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/types";

interface ProductRenderProps {
  category: CategorySlug;
  color: string;
  /** 0-3, produces different "angles"/framing for the gallery. */
  variant?: number;
  blueprint?: boolean;
  className?: string;
  label?: string;
}

/**
 * Original, generated product artwork — a soft studio platform with a
 * category silhouette and the Aeris hairline "sight-line" motif.
 * No third-party imagery is used anywhere in this project.
 */
export function ProductRender({
  category,
  color,
  variant = 0,
  blueprint = false,
  className,
  label,
}: ProductRenderProps) {
  const flip = variant % 2 === 1;
  const gid = `g-${category}-${variant}-${color.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 640 640"
      role="img"
      aria-label={label ?? `${category} product render`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id={`${gid}-plat`} cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F3F4F6" />
          <stop offset="100%" stopColor="#E9EBEE" />
        </radialGradient>
        <linearGradient id={`${gid}-obj`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={`${gid}-obj2`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="640" height="640" fill={`url(#${gid}-plat)`} />

      {/* soft contact shadow */}
      <ellipse cx="320" cy="512" rx="176" ry="30" fill="#111111" opacity="0.08" />

      <g transform={flip ? "translate(640,0) scale(-1,1)" : undefined}>
        {renderSilhouette(category, gid, variant)}
      </g>

      {blueprint && (
        <g stroke="#2E5BFF" strokeWidth="1" opacity="0.5" fill="none">
          <line x1="96" y1="120" x2="96" y2="520" strokeDasharray="2 6" />
          <line x1="544" y1="120" x2="544" y2="520" strokeDasharray="2 6" />
          <line x1="96" y1="120" x2="112" y2="120" />
          <line x1="96" y1="520" x2="112" y2="520" />
          <text
            x="72"
            y="324"
            fill="#2E5BFF"
            fontSize="13"
            fontFamily="var(--font-sans)"
            letterSpacing="2"
            transform="rotate(-90 72 324)"
            opacity="0.9"
          >
            SIGHT LINE
          </text>
        </g>
      )}
    </svg>
  );
}

function renderSilhouette(category: CategorySlug, gid: string, variant: number) {
  const fill = `url(#${gid}-obj)`;
  const fill2 = `url(#${gid}-obj2)`;

  if (category === "standing-desks") {
    return (
      <g>
        {/* desk top */}
        <rect x="150" y="286" width="340" height="26" rx="6" fill={fill} />
        <rect x="150" y="286" width="340" height="10" rx="5" fill="#FFFFFF" opacity="0.25" />
        {/* legs */}
        <rect x="182" y="312" width="18" height="150" rx="4" fill="#3A3F47" />
        <rect x="440" y="312" width="18" height="150" rx="4" fill="#3A3F47" />
        <rect x="176" y="458" width="34" height="10" rx="4" fill="#2B2F36" />
        <rect x="430" y="458" width="34" height="10" rx="4" fill="#2B2F36" />
        {/* monitor hint */}
        <rect x="286" y="196" width="120" height="74" rx="6" fill={fill2} opacity="0.85" />
        <rect x="336" y="270" width="20" height="16" fill="#3A3F47" />
      </g>
    );
  }

  if (category === "accessories") {
    return (
      <g>
        {/* lumbar cushion */}
        <path
          d="M214 214 q106 -34 212 0 q34 12 30 78 q-4 96 -30 150 q-106 34 -212 0 q-26 -54 -30 -150 q-4 -66 30 -78 Z"
          fill={fill}
        />
        <path
          d="M320 214 q-58 0 -106 12 q-26 12 -30 78 q-4 96 30 150 q52 12 106 12 Z"
          fill="#FFFFFF"
          opacity="0.12"
        />
        {/* stitch line */}
        <path
          d="M320 232 q0 200 0 214"
          stroke="#FFFFFF"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="4 8"
          fill="none"
        />
      </g>
    );
  }

  // chair families (office / ergonomic / executive / gaming)
  const gaming = category === "gaming-chairs";
  const backTop = gaming ? 150 : 176;
  const backWidth = gaming ? 176 : 150;
  return (
    <g>
      {/* backrest */}
      <rect
        x={320 - backWidth / 2}
        y={backTop}
        width={backWidth}
        height={gaming ? 210 : 186}
        rx={gaming ? 30 : 22}
        fill={fill}
      />
      {gaming && (
        <>
          <rect x={320 - backWidth / 2} y={backTop} width="22" height="210" rx="11" fill={fill2} />
          <rect x={320 + backWidth / 2 - 22} y={backTop} width="22" height="210" rx="11" fill={fill2} />
        </>
      )}
      <rect
        x={320 - backWidth / 2 + 14}
        y={backTop + 14}
        width={backWidth - 28}
        height="40"
        rx="14"
        fill="#FFFFFF"
        opacity="0.14"
      />
      {/* seat */}
      <rect x="220" y={backTop + (gaming ? 188 : 168)} width="200" height="40" rx="16" fill={fill} />
      {/* armrests */}
      <rect x="206" y={backTop + (gaming ? 150 : 130)} width="16" height="74" rx="6" fill="#3A3F47" />
      <rect x="418" y={backTop + (gaming ? 150 : 130)} width="16" height="74" rx="6" fill="#3A3F47" />
      {/* gas lift + base */}
      <rect x="312" y={backTop + (gaming ? 228 : 208)} width="16" height="70" rx="6" fill="#3A3F47" />
      <g stroke="#2B2F36" strokeWidth="14" strokeLinecap="round">
        <line x1="320" y1={backTop + (gaming ? 296 : 276)} x2="228" y2={backTop + (gaming ? 322 : 302)} />
        <line x1="320" y1={backTop + (gaming ? 296 : 276)} x2="412" y2={backTop + (gaming ? 322 : 302)} />
        <line x1="320" y1={backTop + (gaming ? 296 : 276)} x2="320" y2={backTop + (gaming ? 330 : 310)} />
      </g>
      {[228, 320, 412].map((cx, i) => (
        <circle key={i} cx={cx} cy={backTop + (gaming ? 330 : 310)} r="11" fill="#1C1C1E" />
      ))}
    </g>
  );
}
