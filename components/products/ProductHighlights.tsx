"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Highlight {
  title: string;
  description: string;
  image: string;
}

/**
 * Product Highlights — a horizontal, snapping carousel of image + statement
 * cards, with prev/next controls in the header. Each card pairs a shot with a
 * bold headline and a muted supporting line.
 */
export function ProductHighlights({
  items,
  id,
  title = "Product Highlights",
}: {
  items: Highlight[];
  id?: string;
  title?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section id={id} className="section scroll-mt-24 pt-0">
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous highlight"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-surface"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next highlight"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-surface"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((it, i) => (
            <article
              key={i}
              className="w-[280px] shrink-0 snap-start sm:w-[340px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={it.image}
                  alt={it.title || "Product highlight"}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>
              {(it.title || it.description) && (
                <p className="mt-4 text-[0.95rem] leading-relaxed">
                  {it.title && (
                    <span className="font-semibold text-ink">{it.title} </span>
                  )}
                  {it.description && (
                    <span className="text-muted">{it.description}</span>
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
