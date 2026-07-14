import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "office-chairs",
    name: "Office Chairs",
    tagline: "All-day seating engineered for focus.",
  },
  {
    slug: "ergonomic-chairs",
    name: "Ergonomic Chairs",
    tagline: "Posture support down to the millimetre.",
  },
  {
    slug: "executive-chairs",
    name: "Executive Chairs",
    tagline: "Presence and comfort in equal measure.",
  },
  {
    slug: "gaming-chairs",
    name: "Gaming Chairs",
    tagline: "Built to hold you through the long sessions.",
  },
  {
    slug: "standing-desks",
    name: "Standing Desks",
    tagline: "Effortless movement between sit and stand.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The details that finish the workspace.",
  },
];

export const categoryName = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
