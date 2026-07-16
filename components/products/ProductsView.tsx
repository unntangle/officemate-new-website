"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { CategorySlug, Product } from "@/types";
import { CATEGORIES } from "@/constants/categories";
import { CHAIR_MODELS } from "@/constants/chairs";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import { ModelCard } from "@/components/products/ModelCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
];

export function ProductsView({ products }: { products: Product[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = (params.get("category") as CategorySlug | null) ?? "all";
  const activeSub = params.get("sub");

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  /* Categories with a real model catalogue are listed from CHAIR_MODELS
     rather than the demo PRODUCTS data. */
  const isCatalogue = activeCategory === "office-chairs";

  const setCategory = (slug: CategorySlug | "all") => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (slug === "all") next.delete("category");
    else next.set("category", slug);
    next.delete("sub");
    const qs = next.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  };

  const setSub = (sub: string | null) => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (sub) next.set("sub", sub);
    else next.delete("sub");
    router.replace(`/products?${next.toString()}`, { scroll: false });
  };

  /* Real chair models, filtered by series and search. */
  const models = useMemo(() => {
    if (!isCatalogue) return [];
    let list = CHAIR_MODELS.filter((m) => m.category === activeCategory);

    if (activeSub) list = list.filter((m) => m.subcategory === activeSub);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.subcategory.toLowerCase().includes(q)
      );
    }

    return list;
  }, [isCatalogue, activeCategory, activeSub, query]);

  const filtered = useMemo(() => {
    let list = products.slice();

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.badges.some((b) => b.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        );
    }

    return list;
  }, [products, activeCategory, query, sort]);

  const tabs: { slug: CategorySlug | "all"; name: string }[] = [
    { slug: "all", name: "All products" },
    ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div>
      {/* Category tabs */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {tabs.map((tab) => {
          const isActive = tab.slug === activeCategory;
          return (
            <button
              key={tab.slug}
              onClick={() => setCategory(tab.slug)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-muted hover:text-ink"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Series filter — only for categories with a real catalogue */}
      {isCatalogue && (
        <div className="-mx-1 mt-4 flex flex-wrap gap-2 px-1">
          <button
            onClick={() => setSub(null)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              !activeSub
                ? "border-ink bg-ink text-white"
                : "border-line text-muted hover:border-ink hover:text-ink"
            )}
          >
            All series
          </button>
          {CATEGORIES.find((c) => c.slug === activeCategory)?.subcategories?.map(
            (sub) => (
              <button
                key={sub}
                onClick={() => setSub(sub)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeSub === sub
                    ? "border-ink bg-ink text-white"
                    : "border-line text-muted hover:border-ink hover:text-ink"
                )}
              >
                {sub}
              </button>
            )
          )}
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chairs, desks, features…"
            aria-label="Search products"
            className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="hidden text-sm text-muted sm:inline">
            {isCatalogue
              ? `${models.length} ${models.length === 1 ? "model" : "models"}`
              : `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
          </span>
          {/* The catalogue has no pricing or ratings yet, so sorting doesn't apply */}
          {!isCatalogue && (
            <div className="relative flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort products"
                className="h-11 cursor-pointer rounded-full border border-line bg-white pl-3 pr-8 text-sm outline-none transition-colors focus:border-ink"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {isCatalogue ? (
        models.length > 0 ? (
          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {models.map((model) => (
                <ModelCard key={model.slug} model={model} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="display text-lg font-semibold text-ink">
              Nothing matches that yet
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Try a different search term, or view every model in the range.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSub(null);
              }}
              className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Reset filters
            </button>
          </div>
        )
      ) : filtered.length > 0 ? (
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
          <p className="display text-lg font-semibold text-ink">
            Nothing matches that yet
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Try a different search term or clear the filters to see the full range.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
              setSort("featured");
            }}
            className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
