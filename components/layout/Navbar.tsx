"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/constants/site";
import { CATEGORIES } from "@/constants/categories";
import { FEATURED } from "@/constants/products";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductRender } from "@/components/common/ProductRender";

/* Links shown directly in the navbar */
const PRIMARY_HREFS = ["/", "/company", "/products", "/career"];
const primaryLinks = NAV_LINKS.filter((l) => PRIMARY_HREFS.includes(l.href));
const moreLinks = NAV_LINKS.filter(
  (l) => !PRIMARY_HREFS.includes(l.href) && l.href !== "/contact"
);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 bg-transparent"
      onMouseLeave={() => {
        setMegaOpen(false);
        setMoreOpen(false);
      }}
    >
      <div
        className={cn(
          "glass border border-line rounded-full max-w-6xl mx-auto px-6 h-14 md:h-16 md:px-8 flex items-center justify-between transition-all duration-300",
          scrolled ? "shadow-lift bg-white/95" : "shadow-soft bg-white/80"
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

        <nav className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <button
                  key={link.href}
                  onMouseEnter={() => {
                    setMegaOpen(true);
                    setMoreOpen(false);
                  }}
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink group",
                    megaOpen && "text-ink"
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
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-ink",
                  pathname === link.href ? "text-ink" : "text-ink/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* More dropdown trigger */}
          <div ref={moreRef} className="relative">
            <button
              onMouseEnter={() => {
                setMoreOpen(true);
                setMegaOpen(false);
              }}
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink",
                moreOpen && "text-ink"
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
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-line glass shadow-lift"
                  onMouseEnter={() => setMoreOpen(true)}
                >
                  <div className="py-2">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface hover:text-ink",
                          pathname === link.href ? "text-ink" : "text-ink/70"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden md:block">
          <EnquireButton size="sm" variant="primary" withArrow label="Enquire" />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mega menu (Products) */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mx-auto top-full mt-3 hidden md:block max-w-4xl w-full rounded-2xl border border-line glass shadow-lift"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <div className="px-8 py-7">
              <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                {CATEGORIES.map((cat) => (
                  <div key={cat.slug}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="text-sm font-semibold text-accent"
                    >
                      {cat.name}
                    </Link>
                    <ul className="mt-2 space-y-1.5 border-l-2 border-line pl-3">
                      {cat.subcategories?.map((sub) => (
                        <li key={sub}>
                          <Link
                            href={`/products?category=${cat.slug}&sub=${encodeURIComponent(sub)}`}
                            className="relative text-sm text-ink/70 transition-colors hover:text-ink group/item inline-block pb-0.5"
                          >
                            {sub}
                            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent transition-all duration-300 group-hover/item:w-full" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
