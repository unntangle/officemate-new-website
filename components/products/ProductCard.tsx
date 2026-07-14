"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";

import { categoryName } from "@/constants/categories";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductRender } from "@/components/common/ProductRender";

/**
 * Map of slug → public image path.
 * Add an entry here whenever a real product photo is available.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  zenpro:   "/images/products/chairs/zenpro.png",
  jupiter:  "/images/products/chairs/Jupiter.png",
  webstar:  "/images/products/chairs/webstar.jpg",
  ferro:    "/images/products/chairs/ferro.jpg",
  altura:   "/images/products/chairs/altura.png",
};

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
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="eyebrow">{categoryName(product.category)}</span>
        <Link href={`/products/${product.slug}`} className="mt-2">
          <h3 className="display text-lg font-semibold leading-tight transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.tagline}</p>

        <div className="mt-auto pt-5">
          <EnquireButton
            product={product.name}
            size="sm"
            variant="outline"
            className="w-full"
          />
        </div>
      </div>
    </motion.article>
  );
}
