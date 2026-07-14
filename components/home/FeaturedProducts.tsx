"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FEATURED } from "@/constants/products";
import { ProductCard } from "@/components/products/ProductCard";
import { fadeUp } from "@/lib/motion";

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section bg-surface overflow-hidden">
      <div className="container">
        {/* Inline header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="display text-2xl font-bold text-ink">Best Sellers</h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline transition-colors"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Horizontal scroll strip */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {FEATURED.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex-none w-[260px] sm:w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
