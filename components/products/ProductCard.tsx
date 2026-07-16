"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";

import { categoryName } from "@/constants/categories";
import { PRODUCT_IMAGES } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { EnquireButton } from "@/components/common/EnquireButton";
import { HealthScoreBadge } from "@/components/common/HealthScoreBadge";
import { ProductRender } from "@/components/common/ProductRender";

export function ProductCard({ product }: { product: Product }) {
  const imageSrc = PRODUCT_IMAGES[product.slug];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:border-ink/15 hover:shadow-lift"
    >
      {/* Square image area */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80vw, 280px"
            />
          ) : (
            <ProductRender
              category={product.category}
              color={product.swatch}
              label={product.name}
            />
          )}
        </div>

        <HealthScoreBadge slug={product.slug} className="absolute left-3 top-3 z-10" />
      </Link>

      {/* Text content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Short red accent separator */}
        <div className="mb-3 h-0.5 w-8 bg-accent" />
        <span className="eyebrow">{categoryName(product.category)}</span>
        <Link href={`/products/${product.slug}`} className="mt-2">
          <h3 className="display text-lg font-semibold leading-tight transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.tagline}</p>

        <div className="mt-auto flex gap-2 pt-5">
          <Button asChild variant="primary" size="sm" className="flex-1 group/view">
            <Link href={`/products/${product.slug}`}>
              View
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5"
              />
            </Link>
          </Button>
          <EnquireButton
            product={product.name}
            size="sm"
            variant="outline"
            className="flex-1"
          />
        </div>
      </div>
    </motion.article>
  );
}
