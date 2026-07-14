"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquireButton } from "@/components/common/EnquireButton";
import { EASE } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-bleed hero image */}
      <div className="relative w-full" style={{ aspectRatio: "16/7", minHeight: "420px" }}>
        <Image
          src="/images/hero.png"
          alt="Ergonomic office chairs for every workspace"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark gradient overlay on the left so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Text overlay — bottom-left, matching AFC India style */}
        <div className="absolute inset-0 flex items-end pb-10 md:pb-14">
          <div className="container">
            <div className="max-w-md lg:max-w-xl">

              <motion.h1
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
              >
                Ergonomic Office Chairs for Every Workspace
              </motion.h1>

              <motion.p
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                className="mt-4 text-sm leading-relaxed text-white/80 md:text-base"
              >
                Modular office furniture, engineered for enterprise scale.
              </motion.p>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Button asChild variant="primary" size="lg" className="group">
                  <Link href="/products">
                    Explore the range
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
                <EnquireButton size="lg" variant="ghost" label="Enquire Now" className="border border-white/60 text-white hover:bg-white/10 hover:text-white hover:border-white" />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom-right category pill — like AFC's "Mesh Chairs →" */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="absolute bottom-10 right-6 md:bottom-14 md:right-10"
        >
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/25"
          >
            All Products
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink">
              <ArrowRight size={13} />
            </span>
          </Link>
        </motion.div>

        {/* Dot indicators — like AFC's carousel dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:bottom-5">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-5 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Stats strip below hero */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
        className="border-b border-line bg-white"
      >
        <div className="container">
          <dl className="grid grid-cols-3 divide-x divide-line py-5 md:py-6">
            {[
              { v: "12yr", l: "Warranty" },
              { v: "120k+", l: "Customers seated" },
              { v: "4.8★", l: "Average rating" },
            ].map((s) => (
              <div key={s.l} className="px-6 first:pl-0 last:pr-0 md:px-10">
                <dt className="text-xl font-bold text-ink md:text-2xl">{s.v}</dt>
                <dd className="mt-0.5 text-xs text-muted md:text-sm">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
