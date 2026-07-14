"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED } from "@/constants/products";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductRender } from "@/components/common/ProductRender";
import { Button } from "@/components/ui/button";

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const product = FEATURED[2]; // Flow Executive

  return (
    <section ref={ref} className="section bg-ink text-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div style={{ y }} className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10">
              <ProductRender
                category={product.category}
                color={product.swatch}
                blueprint
                label={product.name}
              />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow text-white/60">In focus</span>
            </div>
            <h2 className="display text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.75rem]">
              {product.name}. The boardroom, re-engineered.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              {product.description}
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
              {product.features.slice(0, 4).map((f) => (
                <div key={f.title}>
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-1 text-sm text-white/55">{f.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <EnquireButton product={product.name} variant="accent" withArrow />
              <Button
                asChild
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Link href={`/products/${product.slug}`}>
                  Full details
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
