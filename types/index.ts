export type CategorySlug =
  | "office-chairs"
  | "ergonomic-chairs"
  | "executive-chairs"
  | "gaming-chairs"
  | "standing-desks"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Download {
  label: string;
  type: "brochure" | "manual" | "warranty";
  size: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Product {
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  /** One-line hook used on cards. */
  tagline: string;
  /** Longer overview paragraph used on the detail page. */
  description: string;
  /** Accent color used for the generated product "render" placeholder. */
  swatch: string;
  colors: { name: string; hex: string }[];
  /** Short capability badges shown on the product card. */
  badges: string[];
  features: { title: string; description: string }[];
  benefits: Benefit[];
  materials: string[];
  dimensions: SpecRow[];
  specifications: SpecRow[];
  usage: string;
  warranty: string;
  care: string[];
  faqs: ProductFAQ[];
  downloads: Download[];
  relatedSlugs: string[];
  featured?: boolean;
  isNew?: boolean;
}
