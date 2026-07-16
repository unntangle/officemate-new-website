"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { ChairModel } from "@/constants/chairs";
import { getProduct } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { EnquireButton } from "@/components/common/EnquireButton";
import { HealthScoreBadge } from "@/components/common/HealthScoreBadge";

/**
 * Catalogue card for a real chair model.
 *
 * Most models have no photography yet, so the tile falls back to a neutral
 * placeholder rather than a stand-in shot of a different chair — showing the
 * wrong chair under the right name is worse than showing none.
 */
export function ModelCard({ model }: { model: ChairModel }) {
  /* Only a handful of models have a detail page so far. */
  const hasPage = Boolean(getProduct(model.slug));

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:border-ink/15 hover:shadow-lift"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        {model.image ? (
          <Image
            src={model.image}
            alt={model.name}
            fill
            sizes="(max-width: 640px) 90vw, 320px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted/50">
            <ImageOff size={22} strokeWidth={1.5} />
            <span className="text-xs font-medium">Photo coming soon</span>
          </div>
        )}

        <HealthScoreBadge slug={model.slug} className="absolute left-3 top-3 z-10" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 h-0.5 w-8 bg-accent" />
        <span className="eyebrow">{model.subcategory}</span>
        <h3 className="display mt-2 text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
          {model.name}
        </h3>

        <div className="mt-auto flex gap-2 pt-5">
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
            className={hasPage ? "flex-1" : "w-full"}
          />
        </div>
      </div>
    </motion.article>
  );
}
