import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "office-chairs",
    name: "Office Chairs",
    tagline: "Executive, Leather, Task & more.",
    subcategories: [
      "Executive Series",
      "Leather Series",
      "Leatherette Series",
      "Task Series",
      "Training Series",
      "Cafe Chairs Series",
    ],
  },
  {
    slug: "office-tables",
    name: "Office Tables",
    tagline: "Conference, cabin & collaborative tables.",
    subcategories: [
      "Executive Table Series",
      "Conference Table Series",
      "Discussion Tables",
      "Cabin Tables",
      "Cafe / Training Tables",
    ],
  },
  {
    slug: "work-stations",
    name: "Work Stations",
    tagline: "Modular & linear workstations.",
    subcategories: ["Modular Workstations", "Linear Workstations", "Zenlift"],
  },
  {
    slug: "soft-sofas",
    name: "Soft Sofas",
    tagline: "Premium reception & lounge sofas.",
    subcategories: ["Sofas"],
  },
  {
    slug: "leisure-lounges",
    name: "Leisure Lounges",
    tagline: "Lounge seating for collaborative spaces.",
    subcategories: ["Lounge Series", "Barstool"],
  },
  {
    slug: "tele-pods",
    name: "Tele Pods",
    tagline: "Focused acoustic privacy pods.",
    subcategories: ["Phone Booth"],
  },
  {
    slug: "work-wellness",
    name: "Work Wellness",
    tagline: "Active furniture for healthier workdays.",
    subcategories: ["Wellness Cycles"],
  },
  {
    slug: "office-storage",
    name: "Office Storage",
    tagline: "Smart storage for every workspace.",
    subcategories: ["Pedestal & Storage"],
  },
];

export const categoryName = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
