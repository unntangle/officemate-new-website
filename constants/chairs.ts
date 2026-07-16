import type { CategorySlug } from "@/types";

/**
 * The real Officemate chair catalogue.
 *
 * Source: officemate.in/category.php?id=office-chairs (44 models), plus Zenpro.
 * Names and series are taken verbatim from the live site — please keep them
 * that way, and add `image` as photography becomes available.
 */
export interface ChairModel {
  name: string;
  slug: string;
  category: CategorySlug;
  subcategory: string;
  image?: string;
}

export const CHAIR_MODELS: ChairModel[] = [
  // ---- Executive Series ----
  { name: "Zenpro", slug: "zenpro", category: "office-chairs", subcategory: "Executive Series", image: "/images/products/chairs/zenpro.webp" },
  { name: "Ergohuman", slug: "ergohuman", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Basel", slug: "basel", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Desire", slug: "desire", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Ergonmesh", slug: "ergonmesh", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Prestige", slug: "prestige", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Winner", slug: "winner", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Cross", slug: "cross", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Norway", slug: "norway", category: "office-chairs", subcategory: "Executive Series" },
  { name: "Acosta", slug: "acosta", category: "office-chairs", subcategory: "Executive Series" },

  // ---- Leather Series ----
  { name: "Benteley", slug: "benteley", category: "office-chairs", subcategory: "Leather Series" },
  { name: "Calvin", slug: "calvin", category: "office-chairs", subcategory: "Leather Series" },

  // ---- Leatherette Series ----
  { name: "Stanley", slug: "stanley", category: "office-chairs", subcategory: "Leatherette Series" },
  { name: "Oyster", slug: "oyster", category: "office-chairs", subcategory: "Leatherette Series" },
  { name: "Epson", slug: "epson", category: "office-chairs", subcategory: "Leatherette Series" },
  { name: "Daisy", slug: "daisy", category: "office-chairs", subcategory: "Leatherette Series" },
  { name: "Venus", slug: "venus", category: "office-chairs", subcategory: "Leatherette Series" },
  { name: "Boss", slug: "boss", category: "office-chairs", subcategory: "Leatherette Series" },
  { name: "V Flexi", slug: "v-flexi", category: "office-chairs", subcategory: "Leatherette Series" },

  // ---- Task Series ----
  { name: "Divine", slug: "divine", category: "office-chairs", subcategory: "Task Series" },
  { name: "Libra", slug: "libra", category: "office-chairs", subcategory: "Task Series" },
  { name: "Smart", slug: "smart", category: "office-chairs", subcategory: "Task Series" },
  { name: "Bravo", slug: "bravo", category: "office-chairs", subcategory: "Task Series" },
  { name: "Reflex", slug: "reflex", category: "office-chairs", subcategory: "Task Series" },
  { name: "Dynamic", slug: "dynamic", category: "office-chairs", subcategory: "Task Series" },
  { name: "Webstar", slug: "webstar", category: "office-chairs", subcategory: "Task Series", image: "/images/products/chairs/webstar.webp" },
  { name: "Sitwell", slug: "sitwell", category: "office-chairs", subcategory: "Task Series" },
  { name: "Bence", slug: "bence", category: "office-chairs", subcategory: "Task Series" },
  { name: "Leo", slug: "leo", category: "office-chairs", subcategory: "Task Series" },
  { name: "Colt", slug: "colt", category: "office-chairs", subcategory: "Task Series" },
  { name: "Jupiter", slug: "jupiter", category: "office-chairs", subcategory: "Task Series", image: "/images/products/chairs/Jupiter.webp" },

  // ---- Training Series ----
  { name: "Oslo", slug: "oslo", category: "office-chairs", subcategory: "Training Series" },
  { name: "Ocean", slug: "ocean", category: "office-chairs", subcategory: "Training Series" },
  { name: "Flip", slug: "flip", category: "office-chairs", subcategory: "Training Series" },
  { name: "@Sense", slug: "at-sense", category: "office-chairs", subcategory: "Training Series" },

  // ---- Cafe Chairs Series ----
  { name: "Miami", slug: "miami", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Kitkat", slug: "kitkat", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Sweden", slug: "sweden", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Bliss", slug: "bliss", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Charlie", slug: "charlie", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Fire", slug: "fire", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Madrid", slug: "madrid", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Swiss", slug: "swiss", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Switch", slug: "switch", category: "office-chairs", subcategory: "Cafe Chairs Series" },
  { name: "Winnie", slug: "winnie", category: "office-chairs", subcategory: "Cafe Chairs Series" },
];

/** Models within a subcategory, e.g. modelsIn("Task Series"). */
export const modelsIn = (subcategory: string) =>
  CHAIR_MODELS.filter((m) => m.subcategory === subcategory);

/** Models within a category, e.g. modelsFor("office-chairs"). */
export const modelsFor = (category: CategorySlug) =>
  CHAIR_MODELS.filter((m) => m.category === category);

/** How many models sit in a subcategory — used for menu counts. */
export const modelCount = (subcategory: string) => modelsIn(subcategory).length;
