"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CategorySlug } from "@/types";
import { galleryFor } from "@/constants/products";
import { cn } from "@/lib/utils";
import { ProductRender } from "@/components/common/ProductRender";

const RENDER_VARIANTS = [0, 1, 2, 3];

export function ProductGallery({
  slug,
  category,
  color,
  name,
}: {
  slug: string;
  category: CategorySlug;
  color: string;
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(false);

  /* Real photography when it exists; the generated render only as a fallback. */
  const photos = galleryFor(slug);
  const hasPhotos = photos.length > 0;
  const views = hasPhotos ? photos.map((_, i) => i) : RENDER_VARIANTS;
  const current = Math.min(active, views.length - 1);

  const step = useCallback(
    (dir: number) => setActive((i) => (i + dir + views.length) % views.length),
    [views.length]
  );

  /* Keyboard control while the preview is open, plus a scroll lock */
  useEffect(() => {
    if (!preview) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(false);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };

    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [preview, step]);

  const Thumb = ({ v }: { v: number }) => (
    <button
      onClick={() => setActive(v)}
      aria-label={`View ${v + 1} of ${name}`}
      aria-pressed={current === v}
      className={cn(
        "relative aspect-square shrink-0 overflow-hidden rounded-lg bg-surface transition-all duration-200",
        current === v ? "ring-1 ring-ink" : "ring-1 ring-line hover:ring-ink/40"
      )}
    >
      {hasPhotos ? (
        <Image src={photos[v]} alt="" fill sizes="80px" className="object-contain" />
      ) : (
        <ProductRender
          category={category}
          color={color}
          variant={v}
          blueprint={v === RENDER_VARIANTS.length - 1}
          label={`${name} thumbnail ${v + 1}`}
        />
      )}
    </button>
  );

  return (
    /* self-start is what makes the sticky work: as a grid item this column
       would otherwise stretch to the full row height, leaving it nothing to
       travel within, and sticky would silently do nothing. */
    <div className="lg:sticky lg:top-20 lg:self-start">
      <div className="flex gap-3">
        {/* Thumbnail rail — vertical alongside the shot on desktop */}
        {views.length > 1 && (
          <div className="thin-scrollbar hidden max-h-[calc(100vh-11rem)] w-[5rem] shrink-0 flex-col gap-3 overflow-y-auto p-1 lg:flex">
            {views.map((v) => (
              <Thumb key={v} v={v} />
            ))}
          </div>
        )}

        {/* Main shot — click to preview. Square, sized from the viewport
           height, so the frame is exactly as wide as the shot inside it. */}
        <div className="group relative aspect-square w-full flex-1 overflow-hidden rounded-xl bg-surface lg:h-[min(calc(100vh-11rem),48rem)] lg:w-auto lg:flex-none">
          <button
            onClick={() => setPreview(true)}
            aria-label={`Preview ${name}`}
            className="absolute inset-0 z-10 cursor-zoom-in"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                {hasPhotos ? (
                  <Image
                    src={photos[current]}
                    alt={`${name} — view ${current + 1}`}
                    fill
                    priority={current === 0}
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-contain"
                  />
                ) : (
                  <ProductRender
                    category={category}
                    color={color}
                    variant={current}
                    blueprint={current === RENDER_VARIANTS.length - 1}
                    label={`${name} — view ${current + 1}`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Step through views */}
          {views.length > 1 && (
            <>
              <button
                onClick={() => step(-1)}
                aria-label="Previous view"
                className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-soft backdrop-blur transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next view"
                className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-soft backdrop-blur transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail row — horizontal below the shot on mobile */}
      {views.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 lg:hidden">
          {views.map((v) => (
            <Thumb key={v} v={v} />
          ))}
        </div>
      )}

      {/* Preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreview(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} preview`}
          >
            <button
              onClick={() => setPreview(false)}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>

            {/* The shot itself — contained here, so nothing is cropped */}
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full w-full max-w-4xl"
            >
              {hasPhotos ? (
                <Image
                  src={photos[current]}
                  alt={`${name} — view ${current + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              ) : (
                <ProductRender
                  category={category}
                  color={color}
                  variant={current}
                  blueprint={current === RENDER_VARIANTS.length - 1}
                  label={`${name} — view ${current + 1}`}
                />
              )}
            </motion.div>

            {views.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous view"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next view"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                  {current + 1} / {views.length}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
