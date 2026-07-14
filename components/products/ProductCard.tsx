"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { categoryName } from "@/constants/categories";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductRender } from "@/components/common/ProductRender";
import { Rating } from "@/components/common/Rating";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:border-ink/15 hover:shadow-lift"
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white">
            New
          </span>
        )}
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <ProductRender
            category={product.category}
            color={product.swatch}
            label={product.name}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="eyebrow">{categoryName(product.category)}</span>
        <Link href={`/products/${product.slug}`} className="mt-2">
          <h3 className="display text-lg font-semibold leading-tight transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 3).map((b) => (
            <span
              key={b}
              className="rounded-full bg-surface px-2.5 py-1 text-[0.7rem] text-muted"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <Rating value={product.rating} size={13} />
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="display text-lg font-semibold text-ink">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="text-xs text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
          <EnquireButton
            product={product.name}
            size="sm"
            variant="outline"
            className="shrink-0"
          />
        </div>
      </div>
    </motion.article>
  );
}
