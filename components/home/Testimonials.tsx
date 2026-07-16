"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants/site";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count]
  );

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(t);
  }, [count]);

  const t = TESTIMONIALS[index];

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Client testimonials"
            title="Trusted by workplace teams"
          />
          <div className="flex gap-2">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative mt-10 min-h-[280px] overflow-hidden rounded-3xl bg-lilac-soft p-8 md:min-h-[240px] md:p-14">
          <Quote className="absolute right-8 top-8 text-lilac/30" size={64} />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <span className="rounded-full bg-canvas/70 px-2.5 py-1 text-xs font-medium text-lilac-ink">
                  {t.detail}
                </span>
              </div>
              <p className="display text-2xl font-medium leading-snug text-ink md:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-4">
                <span className="relative h-11 w-24 shrink-0 rounded-xl bg-canvas p-1.5">
                  <Image
                    src={`/images/clients/${t.logo}`}
                    alt={t.company}
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </span>
                <div>
                  <p className="font-semibold text-ink">{t.company}</p>
                  <p className="text-sm text-muted">
                    {t.name} · {t.role}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8,
                  background: i === index ? "#C62828" : "#E5E5E5",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
