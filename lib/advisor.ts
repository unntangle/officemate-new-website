import {
  CHAIR_HEALTH_SCORES,
  HEALTH_METRICS,
  type MetricKey,
} from "@/constants/healthScore";
import { ADVISOR_QUESTIONS, findOption, type QuestionId } from "@/constants/advisor";
import { PRODUCTS } from "@/constants/products";
import type { Product } from "@/types";

export type AnswerMap = Partial<Record<QuestionId, string>>;

export interface Recommendation {
  product: Product;
  /** Weighted ergonomic fit for these answers, 0–10. */
  fit: number;
  /** The dimensions that drove this recommendation, strongest first. */
  reasons: { label: string; score: number }[];
  overBudget: boolean;
}

/**
 * Turn a set of answers into ergonomic weightings.
 *
 * Starts from the Chair Health Score's own weights, then adds whatever each
 * answer implies. Deliberately a transparent rules engine, not a black box:
 * every recommendation can be explained back to the customer in plain English.
 */
function weightsFor(answers: AnswerMap): Record<MetricKey, number> {
  const weights = Object.fromEntries(
    HEALTH_METRICS.map((m) => [m.key, m.weight])
  ) as Record<MetricKey, number>;

  for (const q of ADVISOR_QUESTIONS) {
    const option = findOption(q.id, answers[q.id]);
    if (!option?.weights) continue;

    for (const [key, extra] of Object.entries(option.weights)) {
      weights[key as MetricKey] += extra ?? 0;
    }
  }

  return weights;
}

/** Ranked recommendations across every model that has been assessed. */
export function recommend(answers: AnswerMap): Recommendation[] {
  const weights = weightsFor(answers);
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const budget = findOption("budget", answers.budget);
  const ceiling = budget?.maxPrice;

  const scored = PRODUCTS.filter((p) => CHAIR_HEALTH_SCORES[p.slug]).map((product) => {
    const scores = CHAIR_HEALTH_SCORES[product.slug];

    const weighted = HEALTH_METRICS.reduce(
      (sum, m) => sum + scores[m.key] * weights[m.key],
      0
    );

    // Rank the dimensions by how much they contributed to this result.
    const reasons = [...HEALTH_METRICS]
      .sort((a, b) => scores[b.key] * weights[b.key] - scores[a.key] * weights[a.key])
      .slice(0, 3)
      .map((m) => ({ label: m.label, score: scores[m.key] }));

    return {
      product,
      // Weighted average of the sub-scores, kept on the same 0–10 scale as the
      // Health Score itself so the two numbers stay comparable.
      fit: Math.round((weighted / totalWeight) * 10) / 10,
      reasons,
      overBudget: ceiling ? product.price > ceiling : false,
    };
  });

  // In-budget models first, then by ergonomic fit.
  return scored.sort(
    (a, b) => Number(a.overBudget) - Number(b.overBudget) || b.fit - a.fit
  );
}

/** True once every question has an answer. */
export const isComplete = (answers: AnswerMap) =>
  ADVISOR_QUESTIONS.every((q) => Boolean(answers[q.id]));

/** Human-readable summary of what was asked for, e.g. "8+ hours · Lower back pain". */
export function summarise(answers: AnswerMap): string[] {
  return ADVISOR_QUESTIONS.map((q) => findOption(q.id, answers[q.id])?.label).filter(
    (l): l is string => Boolean(l)
  );
}
