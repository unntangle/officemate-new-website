"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ChairModel } from "@/constants/chairs";
import { getProduct } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { EnquireButton } from "@/components/common/EnquireButton";

/* Stand-in chair photography, cycled across models that don't have their own
   shot yet, so every card shows a chair rather than a "coming soon" tile. */
const FALLBACK_IMAGES = [
  "/images/products/chairs/zenpro.webp",
  "/images/products/chairs/altura.webp",
  "/images/products/chairs/ferro.webp",
];

/* Deterministic pick from the slug, so a given model always shows the same
   stand-in rather than shuffling between renders. */
function fallbackImage(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

/**
 * Catalogue card for a real chair model.
 *
 * The product sits on a rounded, outlined image tile filling the box, with the
 * details below on the page ground — a clean, borderless card.
 */
export function ModelCard({ model }: { model: ChairModel }) {
  /* Only a handful of models have a detail page so far. */
  const hasPage = Boolean(getProduct(model.slug));
  const imageSrc = model.image ?? fallbackImage(model.slug);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      {/* Whole-card link to the detail page (when one exists) */}
      {hasPage && (
        <Link
          href={`/products/${model.slug}`}
          aria-label={`View ${model.name}`}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Image tile — rounded, outlined, product covers the box */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/20 bg-surface transition-colors duration-300 group-hover:border-accent">
        <Image
          src={imageSrc}
          alt={model.name}
          fill
          sizes="(max-width: 640px) 90vw, 320px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-4">
        <span className="eyebrow">{model.subcategory}</span>
        <h3 className="display mt-1.5 text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
          {model.name}
        </h3>

        <div className="relative z-20 mt-4 flex gap-2">
          {hasPage && (
            <Button asChild variant="primary" size="sm" className="flex-1 group/view">
              <Link href={`/products/${model.slug}`}>
                View
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5"
                />
              </Link>
            </Button>
          )}
          <EnquireButton
            product={model.name}
            size="sm"
            variant="outline"
            label="Enquire"
            className={hasPage ? "flex-1" : "w-full"}
          />
        </div>
      </div>
    </motion.article>
  );
}
