"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { getQuestion, type AdvisorOption } from "@/constants/advisor";
import { Reveal } from "@/components/common/Reveal";
import { EASE } from "@/lib/motion";

/**
 * The AI Ergonomic Advisor's opening, staged as a live chat on the homepage.
 *
 * The first question is asked here directly — there's no "start" button to
 * click first, since every extra step before question one costs entries. The
 * chat framing is deliberate: tapping an answer shows it as your message, the
 * advisor "types" back, and the flow carries straight on to /advisor with the
 * answer already in hand.
 *
 * Palette: warm neutral (cream + walnut) rather than the advisor's usual sage,
 * so the card sits with the rest of the site's warm-neutral grounds.
 */

const bubble =
  "max-w-[86%] rounded-2xl rounded-tl-md bg-cream px-4 py-3 text-sm leading-relaxed text-ink";

/* Messages arrive one after another, like a real conversation loading in. */
const thread: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.15 } },
};
const message: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function Typing({ still }: { still: boolean }) {
  return (
    <div
      aria-hidden
      className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-cream px-4 py-3.5"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-walnut/40"
          animate={still ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function ErgonomicAdvisor() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const q = getQuestion("hours");

  const [picked, setPicked] = useState<AdvisorOption | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const choose = (option: AdvisorOption) => {
    if (picked) return;
    setPicked(option);
    // Let the reply land and the advisor "think" before handing off.
    timer.current = setTimeout(
      () => router.push(`/advisor?hours=${option.value}`),
      reduce ? 0 : 1150
    );
  };

  return (
    <section className="bg-surface py-14 md:py-16">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Left — the pitch */}
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-walnut">
              Officemate AI Ergonomic Advisor
            </span>

            <h2 className="display mt-5 text-3xl font-semibold leading-[1.08] text-ink sm:text-4xl md:text-[2.75rem]">
              Chat your way to
              <br />
              the right chair.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              A digital ergonomic consultant you can talk to. Tell us how you
              work and where it hurts, and we&apos;ll match you against the Chair
              Health Score — no showroom visit, no sales pitch.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted">
                Under 30 seconds
              </span>
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted">
                Free · No sign-up
              </span>
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted">
                4 quick questions
              </span>
            </div>
          </Reveal>

          {/* Right — the live chat */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-line/70">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-line/70 bg-cream px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">
                    Officemate Advisor
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="relative flex h-1.5 w-1.5">
                      {!reduce && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-walnut opacity-75" />
                      )}
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-walnut" />
                    </span>
                    Online · replies instantly
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-walnut/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-walnut">
                  AI
                </span>
              </div>

              {/* Messages */}
              <div className="px-5 py-6">
                <motion.div
                  variants={thread}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  {/* Greeting */}
                  <motion.div variants={message} className="flex">
                    <div className={bubble}>
                      Hi! I&apos;m your ergonomic advisor. Four quick questions
                      and I&apos;ll match you to the right chair. 👋
                    </div>
                  </motion.div>

                  {/* Question one */}
                  <motion.div variants={message} className="flex flex-col gap-1">
                    <div className={bubble}>
                      <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-eyebrow text-walnut">
                        Question 1 of 4
                      </span>
                      {q.question}
                    </div>
                    <p className="pl-1 text-xs text-muted">{q.helper}</p>
                  </motion.div>

                  {/* The reply + the advisor thinking */}
                  <AnimatePresence>
                    {picked && (
                      <motion.div
                        key="reply"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[86%] rounded-2xl rounded-br-md bg-walnut px-4 py-2.5 text-sm font-semibold text-cream">
                          {picked.label}
                        </div>
                      </motion.div>
                    )}
                    {picked && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: EASE, delay: 0.35 }}
                        className="flex"
                      >
                        <Typing still={!!reduce} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Quick replies + composer */}
              <div className="border-t border-line/70 px-5 pb-5 pt-4">
                <AnimatePresence mode="wait">
                  {!picked && (
                    <motion.div
                      key="replies"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="mb-2.5 text-[0.68rem] font-medium uppercase tracking-eyebrow text-muted">
                        Tap to answer
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {q.options.map((option, i) => (
                          <motion.button
                            key={option.value}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: EASE,
                              delay: 0.85 + i * 0.06,
                            }}
                            onClick={() => choose(option)}
                            className="rounded-full border border-line bg-canvas px-4 py-3 text-left text-sm font-semibold text-ink transition-all duration-300 hover:border-walnut hover:bg-cream"
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Composer — decorative; the quick replies drive the flow */}
                <div
                  aria-hidden
                  className="mt-3 flex items-center rounded-full border border-line bg-canvas px-4 py-3"
                >
                  <span className="truncate text-sm text-muted">
                    {picked
                      ? "Lining up your next question…"
                      : "Tap an option above to reply…"}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
