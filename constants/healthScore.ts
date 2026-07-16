/**
 * The Officemate Chair Health Score
 * ---------------------------------
 * A proprietary ergonomic rating. Six measured dimensions are combined into a
 * single 0–10 figure using the fixed weights below.
 *
 * The weighting is deliberately biased toward the things that matter over an
 * eight-hour day (long-sitting comfort, lumbar and posture support account for
 * 65% of the score) rather than showroom impressions.
 *
 * IMPORTANT: sub-scores are assessed per model; the overall figure is always
 * derived — never hand-written — so the rating stays internally consistent and
 * defensible if a customer asks how it was reached.
 */

export interface HealthMetric {
  key: MetricKey;
  label: string;
  weight: number;
  /** Plain-English description of what the dimension measures. */
  blurb: string;
}

export type MetricKey =
  | "longSitting"
  | "lumbar"
  | "posture"
  | "neck"
  | "breathability"
  | "productivity";

export const HEALTH_METRICS: HealthMetric[] = [
  {
    key: "longSitting",
    label: "Long Sitting Comfort",
    weight: 0.25,
    blurb: "Pressure distribution and comfort measured across a full working day.",
  },
  {
    key: "lumbar",
    label: "Lumbar Support",
    weight: 0.2,
    blurb: "How evenly the lower back stays loaded through recline and movement.",
  },
  {
    key: "posture",
    label: "Posture Support",
    weight: 0.2,
    blurb: "How well the chair holds the spine in a neutral, upright position.",
  },
  {
    key: "neck",
    label: "Neck Support",
    weight: 0.15,
    blurb: "Headrest geometry and shoulder support during screen work.",
  },
  {
    key: "breathability",
    label: "Breathability",
    weight: 0.1,
    blurb: "Heat and moisture dissipation through the back and seat.",
  },
  {
    key: "productivity",
    label: "Productivity",
    weight: 0.1,
    blurb: "Adjustment range and how quickly the chair adapts to a new task.",
  },
];

export type MetricScores = Record<MetricKey, number>;

/**
 * Per-model sub-scores (0–10).
 * Add an entry here as each model is assessed — anything without an entry
 * simply renders without a score rather than showing a fabricated one.
 */
export const CHAIR_HEALTH_SCORES: Record<string, MetricScores> = {
  zenpro: {
    longSitting: 9.6,
    lumbar: 9.5,
    posture: 9.4,
    neck: 9.2,
    breathability: 9.1,
    productivity: 9.0,
  },
  webstar: {
    longSitting: 8.9,
    lumbar: 9.0,
    posture: 8.8,
    neck: 9.1,
    breathability: 9.4,
    productivity: 8.6,
  },
  ferro: {
    longSitting: 8.4,
    lumbar: 8.6,
    posture: 8.7,
    neck: 7.9,
    breathability: 8.2,
    productivity: 8.8,
  },
};

/** The model featured in the homepage Health Score section. */
export const FLAGSHIP_SCORED_SLUG = "zenpro";

/** Weighted overall score, rounded to one decimal. */
export function overallScore(slug: string): number | null {
  const scores = CHAIR_HEALTH_SCORES[slug];
  if (!scores) return null;

  const total = HEALTH_METRICS.reduce(
    (sum, m) => sum + scores[m.key] * m.weight,
    0
  );
  return Math.round(total * 10) / 10;
}

/** Star rating (0–5) derived from the overall score. */
export function starRating(slug: string): number {
  const overall = overallScore(slug);
  return overall ? Math.round(overall / 2) : 0;
}

export const hasHealthScore = (slug: string) => Boolean(CHAIR_HEALTH_SCORES[slug]);
