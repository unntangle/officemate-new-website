"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import {
  HEALTH_METRICS,
  CHAIR_HEALTH_SCORES,
  FLAGSHIP_SCORED_SLUG,
  overallScore,
  starRating,
} from "@/constants/healthScore";
import { PRODUCT_IMAGES, getProduct } from "@/constants/products";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { EASE } from "@/lib/motion";

export function ChairHealthScore() {
  const reduce = useReducedMotion();

  const slug = FLAGSHIP_SCORED_SLUG;
  const product = getProduct(slug);
  const scores = CHAIR_HEALTH_SCORES[slug];
  const overall = overallScore(slug);
  const stars = starRating(slug);

  if (!product || !scores || !overall) return null;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Proprietary to Officemate"
          title="The Chair Health Score"
          description="Every chair rated across six ergonomic dimensions, then weighted into a single number — so you can compare like for like."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Flagship score card */}
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink p-8 text-white">
              {/* hairline sight-line motif, as used on the CTA banner */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden>
                <defs>
                  <pattern id="health-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M48 0H0V48" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#health-grid)" />
              </svg>

              <div className="relative">
                <span className="eyebrow text-white/45">{product.name}</span>
                <p className="mt-2 text-sm text-white/70">Overall Chair Health Score</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <motion.span
                    initial={reduce ? undefined : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="display text-7xl font-semibold leading-none tracking-tightest"
                  >
                    {overall.toFixed(1)}
                  </motion.span>
                  <span className="display text-xl font-medium text-white/40">/ 10</span>
                </div>

                <div className="mt-4 flex gap-1" aria-label={`${stars} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < stars ? "fill-accent text-accent" : "text-white/20"}
                    />
                  ))}
                </div>
              </div>

              {/* The shot ships on a white ground, so give it a white tile
                 rather than letting it float as a box on the dark card. */}
              <div className="relative mt-8 h-56 overflow-hidden rounded-xl bg-white lg:h-64">
                <Image
                  src={PRODUCT_IMAGES[slug]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-contain p-3"
                />
              </div>

              <div className="relative mt-auto border-t border-white/15 pt-6">
                <p className="text-xs leading-relaxed text-white/50">
                  Weighted across six dimensions. Long-sitting comfort, lumbar and
                  posture support account for 65% of the total.
                </p>
                <Link
                  href={`/products/${slug}`}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white"
                >
                  See the full breakdown
                  <ArrowUpRight
                    size={16}
                    className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Metric bars */}
          <Reveal className="flex flex-col justify-center divide-y divide-line rounded-2xl border border-line bg-card px-8 md:px-10">
            {HEALTH_METRICS.map((metric, i) => {
              const value = scores[metric.key];
              return (
                <div key={metric.key} className="py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-semibold text-ink">
                      {metric.label}
                      <span className="ml-2 text-xs font-normal text-muted">
                        {Math.round(metric.weight * 100)}% weight
                      </span>
                    </h3>
                    <span className="display text-lg font-semibold tabular-nums text-ink">
                      {value.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      className="h-full rounded-full bg-ink"
                      initial={reduce ? undefined : { width: 0 }}
                      whileInView={{ width: `${value * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.08 }}
                    />
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-muted">{metric.blurb}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
