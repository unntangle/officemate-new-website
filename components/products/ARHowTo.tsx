/**
 * Looping illustration for the AR hand-off: a phone pointed at the floor, with
 * the chair dropping onto a pulsing placement reticle.
 *
 * Drawn rather than shipped as a GIF — it's a handful of shapes, so this stays
 * sharp at any size, weighs nothing, and takes its colours from the palette
 * instead of baking them into pixels. The motion lives in globals.css, which
 * means the site's prefers-reduced-motion rule already covers it: the chair
 * simply sits in place rather than animating.
 */
export function ARHowTo() {
  return (
    <svg
      viewBox="0 0 220 170"
      role="img"
      aria-label="Illustration: point your phone at the floor and the chair is placed in the room"
      className="h-36 w-auto"
    >
      {/* Ground shadow, anchoring the phone in space */}
      <ellipse cx="110" cy="162" rx="62" ry="6" className="fill-ink/5" />

      {/* Phone */}
      <rect
        x="62"
        y="6"
        width="96"
        height="150"
        rx="14"
        className="fill-canvas stroke-ink/20"
        strokeWidth="2"
      />
      <rect x="70" y="18" width="80" height="126" rx="8" className="fill-surface" />
      <rect x="99" y="10" width="22" height="3.5" rx="1.75" className="fill-ink/20" />

      {/* The room, seen through the camera */}
      <path
        d="M74 120 H146"
        className="stroke-ink/15"
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />

      {/* Placement reticle */}
      <ellipse
        cx="110"
        cy="120"
        rx="25"
        ry="7"
        className="ar-reticle fill-none stroke-azure"
        strokeWidth="2"
      />

      {/* Chair — a silhouette, not a portrait; it reads at 36px tall */}
      <g className="ar-place fill-ink">
        <rect x="100" y="58" width="20" height="29" rx="5" />
        <rect x="95" y="87" width="30" height="7" rx="3.5" />
        <rect x="108" y="94" width="4" height="13" />
        <path
          d="M97 116 L110 107 L123 116"
          className="fill-none stroke-ink"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
