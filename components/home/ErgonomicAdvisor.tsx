"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";
import { getQuestion } from "@/constants/advisor";
import { Reveal } from "@/components/common/Reveal";
import { EASE } from "@/lib/motion";

/**
 * The AI Ergonomic Advisor's first question, asked directly on the homepage.
 * Answering here starts the flow — there's deliberately no "start" button to
 * click first, since every extra step before question one costs entries.
 */
export function ErgonomicAdvisor() {
  const router = useRouter();
  const q = getQuestion("hours");

  return (
    <section className="bg-surface py-14 md:py-16">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-sage-soft px-3 py-1.5 text-xs font-semibold text-sage-ink">
              Officemate AI Ergonomic Advisor
            </span>

            <h2 className="display mt-5 text-3xl font-semibold leading-[1.08] text-ink sm:text-4xl md:text-[2.75rem]">
              Answer four questions.
              <br />
              Get the right chair.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              A digital ergonomic consultant. Tell us how you work and where it
              hurts, and we'll match you against the Chair Health Score — no
              showroom visit, no sales pitch.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted">
                <Clock3 size={13} className="text-sage-ink" />
                Under 30 seconds
              </span>
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted">
                Free · No sign-up
              </span>
            </div>
          </Reveal>

          {/* Question one, live */}
          <Reveal>
            <div className="rounded-3xl bg-card p-7 shadow-soft md:p-9">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-xs font-bold text-white">
                  1
                </span>
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
                  of 4
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-ink md:text-2xl">
                {q.question}
              </h3>
              <p className="mt-2 text-sm text-muted">{q.helper}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {q.options.map((option, i) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                    onClick={() => router.push(`/advisor?hours=${option.value}`)}
                    className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-line bg-canvas px-4 py-4 text-left text-sm font-semibold text-ink transition-all duration-300 hover:border-sage hover:bg-sage-soft"
                  >
                    {option.label}
                    <ArrowRight
                      size={15}
                      className="shrink-0 -translate-x-1 text-sage-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
