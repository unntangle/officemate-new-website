"use client";

import { useEffect, useState } from "react";
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
  type MetricKey,
} from "@/constants/healthScore";
import { PRODUCT_IMAGES, getProduct } from "@/constants/products";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { EASE } from "@/lib/motion";

/* A colour per dimension, drawn from the ergonomics palette, so the six
   measures read as distinct rather than one long grey list. Written as full
   class literals so Tailwind picks them up. */
const METRIC_STYLE: Record<
  MetricKey,
  { fill: string; track: string; dot: string; chip: string }
> = {
  longSitting: {
    fill: "bg-accent",
    track: "bg-accent/10",
    dot: "bg-accent",
    chip: "bg-accent-soft text-accent",
  },
  lumbar: {
    fill: "bg-sage",
    track: "bg-sage/10",
    dot: "bg-sage",
    chip: "bg-sage-soft text-sage-ink",
  },
  posture: {
    fill: "bg-azure",
    track: "bg-azure/10",
    dot: "bg-azure",
    chip: "bg-azure-soft text-azure-ink",
  },
  neck: {
    fill: "bg-honey",
    track: "bg-honey/10",
    dot: "bg-honey",
    chip: "bg-honey-soft text-honey-ink",
  },
  breathability: {
    fill: "bg-lilac",
    track: "bg-lilac/10",
    dot: "bg-lilac",
    chip: "bg-lilac-soft text-lilac-ink",
  },
  productivity: {
    fill: "bg-walnut",
    track: "bg-walnut/10",
    dot: "bg-walnut",
    chip: "bg-walnut/10 text-walnut",
  },
};

/* Ease the overall figure up from zero once the dial scrolls into view. */
function useCountUp(target: number, active: boolean, reduce: boolean | null) {
  const [val, setVal] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!active || reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduce]);
  return val;
}

export function ChairHealthScore() {
  const reduce = useReducedMotion();

  const slug = FLAGSHIP_SCORED_SLUG;
  const product = getProduct(slug);
  const scores = CHAIR_HEALTH_SCORES[slug];
  const overall = overallScore(slug);
  const stars = starRating(slug);

  const [inView, setInView] = useState(false);
  const shown = useCountUp(overall ?? 0, inView, reduce);

  if (!product || !scores || !overall) return null;

  /* Dial geometry — a full ring, filled to score/10. */
  const R = 82;
  const C = 2 * Math.PI * R;
  const fraction = overall / 10;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Proprietary to Officemate"
          title="The Chair Health Score"
          description="Every chair rated across six ergonomic parameters, then weighted into a single number — so you can compare like for like."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* ---------- Left: the score dial ---------- */}
          <Reveal>
            <motion.div
              onViewportEnter={() => setInView(true)}
              viewport={{ once: true, amount: 0.4 }}
              className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-cream to-canvas p-8 shadow-soft ring-1 ring-line"
            >
              {/* soft colour bloom */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <span className="eyebrow text-walnut">{product.name}</span>
                  <p className="mt-1 text-sm text-muted">
                    Overall Chair Health Score
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-card px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-muted ring-1 ring-line">
                  6 parameters
                </span>
              </div>

              {/* The dial */}
              <div className="relative mx-auto mt-6 grid place-items-center">
                <svg viewBox="0 0 200 200" className="h-52 w-52 -rotate-90">
                  <defs>
                    <linearGradient id="score-arc" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C62828" />
                      <stop offset="100%" stopColor="#F2704E" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke="#EFE7DA"
                    strokeWidth="13"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke="url(#score-arc)"
                    strokeWidth="13"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={reduce ? undefined : { strokeDashoffset: C }}
                    whileInView={{ strokeDashoffset: C * (1 - fraction) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: EASE }}
                  />
                </svg>

                {/* upright centre readout (sibling of the rotated svg) */}
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="display text-6xl font-semibold leading-none tracking-tightest text-ink tabular-nums">
                        {shown.toFixed(1)}
                      </span>
                      <span className="display text-lg font-medium text-muted">
                        /10
                      </span>
                    </div>
                    <div
                      className="mt-2 flex justify-center gap-1"
                      aria-label={`${stars} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < stars
                              ? "fill-accent text-accent"
                              : "text-line"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chair image */}
              <div className="relative mt-6 h-48 overflow-hidden rounded-2xl bg-card ring-1 ring-line lg:h-52">
                <Image
                  src={PRODUCT_IMAGES[slug]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-contain p-3"
                />
              </div>

              <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                <p className="max-w-[58%] text-xs leading-relaxed text-muted">
                  Comfort, lumbar &amp; posture make up 65% of the score.
                </p>
                <Link
                  href={`/products/${slug}`}
                  className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink"
                >
                  Full breakdown
                  <ArrowUpRight
                    size={16}
                    className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </motion.div>
          </Reveal>

          {/* ---------- Right: the six dimensions ---------- */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 sm:p-8">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">
                  Rated across six parameters
                </h3>
                <span className="text-xs text-muted">Weighted · /10</span>
              </div>

              <div className="flex flex-col">
                {HEALTH_METRICS.map((metric, i) => {
                  const value = scores[metric.key];
                  const s = METRIC_STYLE[metric.key];
                  return (
                    <div
                      key={metric.key}
                      className="border-b border-line/70 py-4 last:border-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`}
                          />
                          <h4 className="truncate text-sm font-semibold text-ink">
                            {metric.label}
                          </h4>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[0.62rem] font-bold ${s.chip}`}
                          >
                            {Math.round(metric.weight * 100)}%
                          </span>
                        </div>
                        <span className="display shrink-0 text-base font-semibold tabular-nums text-ink">
                          {value.toFixed(1)}
                        </span>
                      </div>

                      <div
                        className={`mt-2.5 h-2 overflow-hidden rounded-full ${s.track}`}
                      >
                        <motion.div
                          className={`h-full rounded-full ${s.fill}`}
                          initial={reduce ? undefined : { width: 0 }}
                          whileInView={{ width: `${value * 10}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            ease: EASE,
                            delay: 0.1 + i * 0.07,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {metric.blurb}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
