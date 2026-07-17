"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/constants/site";
import { CATEGORIES } from "@/constants/categories";
import {
  FEATURED,
  PLACEHOLDER_IMAGES,
  PRODUCT_IMAGES,
  SUBCATEGORY_IMAGES,
  productsByCategory,
} from "@/constants/products";
import type { CategorySlug } from "@/types";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductRender } from "@/components/common/ProductRender";

/* Links shown directly in the navbar */
const PRIMARY_HREFS = ["/", "/company", "/products", "/career"];
const primaryLinks = NAV_LINKS.filter((l) => PRIMARY_HREFS.includes(l.href));
const moreLinks = NAV_LINKS.filter(
  (l) => !PRIMARY_HREFS.includes(l.href) && l.href !== "/contact"
);

interface Tile {
  key: string;
  label: string;
  href: string;
  image?: string;
  category: CategorySlug;
  swatch: string;
}

/**
 * Up to three preview tiles for a category — one per subcategory, illustrated
 * with whatever product photography exists for that category.
 */
function tilesFor(slug: CategorySlug): Tile[] {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const products = productsByCategory(slug);

  return (cat?.subcategories ?? []).slice(0, 3).map((sub, i) => {
    const p = products[i];
    return {
      key: `${slug}-${sub}`,
      label: sub,
      href: `/products?category=${slug}&sub=${encodeURIComponent(sub)}`,
      image:
        SUBCATEGORY_IMAGES[`${slug}:${sub}`] ??
        (p ? PRODUCT_IMAGES[p.slug] : undefined) ??
        PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
      category: slug,
      swatch: p?.swatch ?? "#C62828",
    };
  });
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<CategorySlug>(CATEGORIES[0].slug);
  const moreRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      /* Hide once past 10% of the viewport height, reveal on scroll up */
      const threshold = window.innerHeight * 0.1;
      const goingDown = y > lastY.current;

      if (y <= threshold) {
        setHidden(false);
      } else if (Math.abs(y - lastY.current) > 4) {
        setHidden(goingDown);
      }

      lastY.current = y;
    };
    lastY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Never hide the bar while a menu is open */
  const isHidden = hidden && !megaOpen && !moreOpen && !mobileOpen;

  /* Hover only counts once the bar has settled.

     Scrolling up animates the bar back down onto wherever the cursor already
     is. The pointer never moves, but the element arrives underneath it, and the
     browser reports that as a hover — which sprang the menus open on their own.
     Two guards, because either alone leaves a gap: the triggers open on
     mousemove rather than mouseenter, so a stationary cursor can't open
     anything; and hover is disarmed across the reveal in case a browser
     synthesises a move as the page settles. */
  const hoverArmed = useRef(true);
  useEffect(() => {
    hoverArmed.current = false;
    /* Just past the 300ms reveal transition. */
    const t = setTimeout(() => {
      hoverArmed.current = true;
    }, 350);
    return () => clearTimeout(t);
  }, [isHidden]);

  /* Product detail pages carry the bar edge-to-edge rather than as a
     floating pill — the gallery already starts near the top of the page. */
  const isProductDetail = /^\/products\/[^/]+$/.test(pathname);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  /* Close "More" dropdown on outside click */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-transparent",
        isProductDetail ? "p-0" : "py-3 px-4 md:px-6",
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        /* pointer-events-none while parked: an off-screen bar shouldn't be
           catching hovers meant for the page. */
        isHidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
      )}
      onMouseLeave={() => {
        setMegaOpen(false);
        setMoreOpen(false);
      }}
    >
      <div
        className={cn(
          "glass-light border border-ink/5 h-12 md:h-14 flex items-center justify-between transition-all duration-300 relative",
          isProductDetail
            ? "w-full rounded-none border-x-0 border-t-0 px-5 md:px-10"
            : "rounded-full max-w-6xl mx-auto px-6 md:px-8",
          /* The full-width bar carries the darker tint from the start —
             at 0.28 it washes out against the product page's white ground. */
          scrolled || isProductDetail ? "is-scrolled" : "",
          /* Full-width sits on the page, so it only needs a hairline edge;
             the floating pill keeps its lift. */
          isProductDetail
            ? "shadow-hairline"
            : scrolled
              ? "shadow-lift"
              : "shadow-soft"
        )}
      >
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
          <Image
            src="/images/logo.webp"
            alt={SITE.name}
            width={150}
            height={20}
            priority
            className="h-6 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex h-full">
          {primaryLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <button
                  key={link.href}
                  onMouseMove={() => {
                    if (!hoverArmed.current) return;
                    setMegaOpen(true);
                    setMoreOpen(false);
                  }}
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-accent group",
                    megaOpen && "text-accent"
                  )}
                >
                  {link.label} +
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-[calc(100%-32px)]" />
                </button>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => {
                  setMegaOpen(false);
                  setMoreOpen(false);
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-accent group",
                  pathname === link.href ? "text-accent" : "text-ink"
                )}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-[calc(100%-32px)]" />
              </Link>
            );
          })}

          {/* More dropdown trigger */}
          <div ref={moreRef} className="relative h-full flex items-center">
            <button
              onMouseMove={() => {
                if (!hoverArmed.current) return;
                setMoreOpen(true);
                setMegaOpen(false);
              }}
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className={cn(
                "relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-accent group",
                moreOpen && "text-accent"
              )}
            >
              More
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  moreOpen && "rotate-180"
                )}
              />
              <span className="absolute bottom-1 left-4 right-4 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-[calc(100%-32px)]" />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-ink/5 glass-light is-scrolled shadow-lift z-50"
                  onMouseEnter={() => setMoreOpen(true)}
                >
                  <div className="py-2 relative z-10">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center px-5 py-2.5 text-sm font-medium transition-colors hover:text-accent group/more",
                          pathname === link.href ? "text-accent" : "text-ink"
                        )}
                      >
                        <span className="relative pb-0.5">
                          {link.label}
                          <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-300 group-hover/more:w-full" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden md:block">
          <EnquireButton
            size="sm"
            variant="primary"
            withArrow
            label="Enquire"
            className="bg-ink text-white hover:bg-ink/90"
          />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

      {/* Mega menu (Products) */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mx-auto top-full mt-2 hidden md:block max-w-5xl w-full overflow-hidden rounded-2xl border border-ink/5 glass-light is-scrolled shadow-lift pointer-events-auto z-50"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <div className="relative z-10 grid grid-cols-[15rem_1fr]">
              {/* Left — category rail */}
              <div className="border-r border-ink/10 py-3">
                {CATEGORIES.map((cat) => {
                  const isActive = cat.slug === activeCat;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      onMouseEnter={() => setActiveCat(cat.slug)}
                      onFocus={() => setActiveCat(cat.slug)}
                      className="group/cat relative flex items-center justify-between gap-2 px-3 py-1.5 text-sm font-medium"
                    >
                      {/* Sliding pill — echoes the navbar's own rounded bar */}
                      {isActive && (
                        <motion.span
                          layoutId="cat-marker"
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-x-2 inset-y-1 rounded-full bg-gradient-to-r from-ink/[0.07] via-ink/[0.03] to-transparent"
                        />
                      )}

                      <span
                        className={cn(
                          "relative flex items-center gap-2 py-1 pl-3 transition-colors duration-300",
                          isActive ? "text-accent" : "text-muted group-hover/cat:text-ink"
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                            isActive ? "scale-100 bg-accent" : "scale-0 bg-ink/30"
                          )}
                        />
                        {cat.name}
                      </span>
                      <ChevronRight
                        size={14}
                        className={cn(
                          "relative mr-3 transition-all duration-300",
                          isActive
                            ? "translate-x-0 text-accent opacity-100"
                            : "-translate-x-2 opacity-0"
                        )}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Right — preview tiles for the hovered category */}
              <div className="p-6">
                {/* Keyed, with no exit animation: an exit transition would keep
                   the previous category's tiles on screen while the rail had
                   already moved on, so the two panes disagreed mid-hover. */}
                <motion.div
                  key={activeCat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="grid grid-cols-3 gap-4">
                      {tilesFor(activeCat).map((tile) => (
                        <Link
                          key={tile.key}
                          href={tile.href}
                          className="group/tile flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 transition-all duration-300 hover:ring-2 hover:ring-accent hover:-translate-y-0.5"
                        >
                          {/* Product shot — contained, never cropped */}
                          <div className="relative flex-1 overflow-hidden">
                            {tile.image ? (
                              <Image
                                src={tile.image}
                                alt={tile.label}
                                fill
                                sizes="260px"
                                className="object-contain p-3 transition-transform duration-500 group-hover/tile:scale-[1.05]"
                              />
                            ) : (
                              <div className="h-full w-full transition-transform duration-500 group-hover/tile:scale-[1.05]">
                                <ProductRender
                                  category={tile.category}
                                  color={tile.swatch}
                                  label={tile.label}
                                />
                              </div>
                            )}
                          </div>

                          {/* Caption bar */}
                          <div className="flex shrink-0 items-center justify-between gap-2 border-t border-line px-3.5 py-3">
                            <span className="truncate text-xs font-semibold text-ink transition-colors group-hover/tile:text-accent">
                              {tile.label}
                            </span>
                            <span className="flex h-6 w-6 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-ink text-white opacity-0 transition-all duration-300 group-hover/tile:translate-x-0 group-hover/tile:opacity-100">
                              <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-end">
                      <Link
                        href={`/products?category=${activeCat}`}
                        className="group/all inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
                      >
                        <span className="relative pb-0.5">
                          Explore all
                          <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-300 group-hover/all:w-full" />
                        </span>
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-300 group-hover/all:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[60] flex w-[86%] max-w-sm flex-col bg-canvas p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/images/logo.webp"
                  alt={SITE.name}
                  width={120}
                  height={16}
                  className="h-5 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-lg font-medium text-ink hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <p className="eyebrow mt-8 mb-2 px-3">Categories</p>
              <div className="flex flex-col">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface hover:text-ink"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                <EnquireButton size="lg" variant="accent" className="w-full" withArrow />
                <p className="mt-4 text-center text-xs text-muted">{SITE.phone}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
