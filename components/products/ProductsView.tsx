"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  LayoutGrid,
  Armchair,
  Table2,
  Monitor,
  Sofa,
  Coffee,
  DoorClosed,
  Activity,
  Archive,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/types";
import { CATEGORIES } from "@/constants/categories";
import { CHAIR_MODELS } from "@/constants/chairs";
import { cn } from "@/lib/utils";
import { ModelCard } from "@/components/products/ModelCard";

/* An icon per category so the sidebar reads at a glance rather than as a wall
   of text. Falls back to the grid glyph for anything unmapped. */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  all: LayoutGrid,
  "office-chairs": Armchair,
  "office-tables": Table2,
  "work-stations": Monitor,
  "soft-sofas": Sofa,
  "leisure-lounges": Coffee,
  "tele-pods": DoorClosed,
  "work-wellness": Activity,
  "office-storage": Archive,
};

/* Real Unsplash photos per category (small, cropped thumbnails). Plain <img>
   loads these directly, so no next.config remotePatterns entry is needed; the
   icon above stays as a graceful fallback if an image ever fails to load. */
const cdn = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=96&h=96&q=70`;

const CATEGORY_IMAGE: Record<string, string> = {
  all: cdn("1718220216044-006f43e3a9b1"),
  "office-chairs": cdn("1688578735352-9a6f2ac3b70a"),
  "office-tables": cdn("1517502884422-41eaead166d4"),
  "work-stations": cdn("1623177623442-979c1e42c255"),
  "soft-sofas": cdn("1524758631624-e2822e304c36"),
  "leisure-lounges": cdn("1633975846872-2bed7fd995f9"),
  "tele-pods": cdn("1589779256250-a8743f78f4af"),
  "work-wellness": cdn("1622126807280-9b5b32b28e77"),
  "office-storage": cdn("1577412647305-991150c7d163"),
};

function CategoryThumb({
  slug,
  Icon,
  active,
}: {
  slug: string;
  Icon: LucideIcon;
  active: boolean;
}) {
  const [err, setErr] = useState(false);
  const src = CATEGORY_IMAGE[slug];
  return (
    <span
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full transition-colors",
        active ? "bg-accent-soft text-accent" : "bg-surface text-muted"
      )}
    >
      {src && !err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setErr(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-300",
            active ? "" : "grayscale group-hover:grayscale-0"
          )}
        />
      ) : (
        <Icon size={16} />
      )}
    </span>
  );
}

export function ProductsView() {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = (params.get("category") as CategorySlug | null) ?? "all";
  const activeSub = params.get("sub");

  const [query, setQuery] = useState("");

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

  /* The real Officemate catalogue, filtered by category, series and search. */
  const models = useMemo(() => {
    let list = CHAIR_MODELS.slice();

    if (activeCategory !== "all") {
      list = list.filter((m) => m.category === activeCategory);
    }
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
  }, [activeCategory, activeSub, query]);

  const tabs: { slug: CategorySlug | "all"; name: string }[] = [
    { slug: "all", name: "All products" },
    ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  const subcategories =
    CATEGORIES.find((c) => c.slug === activeCategory)?.subcategories ?? [];
  /* Only worth a series row when the active category actually splits into
     more than one series. */
  const showSeries = activeCategory !== "all" && subcategories.length > 1;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
      {/* ---------- Sidebar: categories ---------- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-card p-3 sm:p-4">
          <h3 className="px-2 pb-3 text-sm font-semibold text-ink">Categories</h3>
          <nav className="flex flex-col gap-0.5">
            {tabs.map((tab) => {
              const isActive = tab.slug === activeCategory;
              const Icon = CATEGORY_ICON[tab.slug] ?? LayoutGrid;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setCategory(tab.slug)}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-4 text-left text-sm transition-colors",
                    isActive
                      ? "bg-surface font-semibold text-ink"
                      : "text-muted hover:bg-surface/60 hover:text-ink"
                  )}
                >
                  <CategoryThumb slug={tab.slug} Icon={Icon} active={isActive} />
                  <span className="truncate">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ---------- Content ---------- */}
      <div className="min-w-0">
        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chairs, series…"
              aria-label="Search products"
              className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-accent focus:border-accent focus-visible:rounded-full focus-visible:outline-none"
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

          <span className="flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-sm text-muted transition-colors hover:border-accent">
            <span className="font-semibold text-ink tabular-nums">
              {models.length}
            </span>
            {models.length === 1 ? "model" : "models"}
          </span>
        </div>

        {/* Series row — sits on top of the grid */}
        {showSeries && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <button
              onClick={() => setSub(null)}
              className={cn(
                "relative shrink-0 rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium transition-colors",
                !activeSub ? "text-white" : "text-muted hover:text-ink"
              )}
            >
              {!activeSub && (
                <motion.span
                  layoutId="series-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">All series</span>
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSub(sub)}
                className={cn(
                  "relative shrink-0 rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeSub === sub ? "text-white" : "text-muted hover:text-ink"
                )}
              >
                {activeSub === sub && (
                  <motion.span
                    layoutId="series-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{sub}</span>
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {models.length > 0 ? (
          <motion.div
            layout
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {models.map((model) => (
                <ModelCard key={model.slug} model={model} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="display text-lg font-semibold text-ink">
              Nothing matches that yet
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Try a different search term, or reset the filters to see the full
              range.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
