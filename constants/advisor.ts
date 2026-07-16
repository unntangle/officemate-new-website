import type { MetricKey } from "@/constants/healthScore";

export type QuestionId = "hours" | "concern" | "style" | "budget";

export interface AdvisorOption {
  value: string;
  label: string;
  /** Extra weight applied to Health Score dimensions when this is picked. */
  weights?: Partial<Record<MetricKey, number>>;
  /** Inclusive rupee ceiling used to filter the catalogue. */
  maxPrice?: number;
}

export interface AdvisorQuestion {
  id: QuestionId;
  question: string;
  helper: string;
  options: AdvisorOption[];
}

/**
 * The AI Ergonomic Advisor's inputs.
 *
 * Question one is asked inline on the homepage; the rest run on /advisor.
 * Each option carries the ergonomic weighting it implies, so the ranking logic
 * lives with the question rather than in a tangle of conditionals.
 */
export const ADVISOR_QUESTIONS: AdvisorQuestion[] = [
  {
    id: "hours",
    question: "How many hours a day do you sit?",
    helper: "The single biggest factor in which chair will actually suit you.",
    options: [
      { value: "under-4", label: "Under 4 hours", weights: { productivity: 0.1 } },
      { value: "4-6", label: "4 – 6 hours", weights: { longSitting: 0.1, posture: 0.05 } },
      { value: "6-8", label: "6 – 8 hours", weights: { longSitting: 0.2, lumbar: 0.1 } },
      { value: "8-plus", label: "8+ hours", weights: { longSitting: 0.3, lumbar: 0.15 } },
    ],
  },
  {
    id: "concern",
    question: "What bothers you most by the end of the day?",
    helper: "Tell us where it hurts and we'll weight the recommendation accordingly.",
    options: [
      { value: "back", label: "Lower back pain", weights: { lumbar: 0.35, posture: 0.2 } },
      { value: "neck", label: "Neck & shoulders", weights: { neck: 0.35, posture: 0.1 } },
      { value: "heat", label: "Getting hot and restless", weights: { breathability: 0.35 } },
      { value: "none", label: "Nothing in particular", weights: { productivity: 0.1 } },
    ],
  },
  {
    id: "style",
    question: "How would you describe your working day?",
    helper: "A day of deep focus asks different things of a chair than back-to-back calls.",
    options: [
      { value: "focus", label: "Deep focus at a desk", weights: { posture: 0.12, longSitting: 0.1 } },
      { value: "meetings", label: "Meetings and calls", weights: { productivity: 0.15, breathability: 0.05 } },
      { value: "hybrid", label: "A bit of both", weights: { productivity: 0.1, longSitting: 0.05 } },
      { value: "long", label: "Long days, often into the evening", weights: { longSitting: 0.2, lumbar: 0.1 } },
    ],
  },
  {
    id: "budget",
    question: "What's your budget per chair?",
    helper: "We'll only recommend what you can actually buy.",
    options: [
      { value: "under-15k", label: "Under ₹15,000", maxPrice: 15000 },
      { value: "15-25k", label: "₹15,000 – ₹25,000", maxPrice: 25000 },
      { value: "25k-plus", label: "₹25,000+" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
];

export const getQuestion = (id: QuestionId) =>
  ADVISOR_QUESTIONS.find((q) => q.id === id)!;

export const findOption = (id: QuestionId, value?: string | null) =>
  value ? getQuestion(id).options.find((o) => o.value === value) : undefined;
