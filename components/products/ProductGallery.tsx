"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { CategorySlug } from "@/types";
import { cn } from "@/lib/utils";
import { ProductRender } from "@/components/common/ProductRender";

const VARIANTS = [0, 1, 2, 3];

export function ProductGallery({
  category,
  color,
  name,
  isNew,
}: {
  category: CategorySlug;
  color: string;
  name: string;
  isNew?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  return (
    <div className="lg:sticky lg:top-28">
      <div
        ref={frameRef}
        onMouseEnter={() => !reduce && setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="group relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface"
      >
        {isNew && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-ink px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white">
            New
          </span>
        )}
        <span className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[0.7rem] font-medium text-muted backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
          <ZoomIn size={13} /> Hover to zoom
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <div
              className="h-full w-full transition-transform duration-300 ease-out"
              style={{
                transform: zoom ? "scale(1.7)" : "scale(1)",
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
            >
              <ProductRender
                category={category}
                color={color}
                variant={active}
                blueprint={active === VARIANTS.length - 1}
                label={`${name} — view ${active + 1}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {VARIANTS.map((v) => (
          <button
            key={v}
            onClick={() => setActive(v)}
            aria-label={`View ${v + 1}`}
            aria-pressed={active === v}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border bg-surface transition-all duration-200",
              active === v
                ? "border-ink ring-1 ring-ink"
                : "border-line hover:border-ink/30"
            )}
          >
            <ProductRender
              category={category}
              color={color}
              variant={v}
              blueprint={v === VARIANTS.length - 1}
              label={`${name} thumbnail ${v + 1}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
