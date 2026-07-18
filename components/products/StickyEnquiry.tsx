"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EnquireButton } from "@/components/common/EnquireButton";

/** Anchors mirror the section ids on the product detail page. */
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "benefits", label: "Benefits" },
  { id: "specs", label: "Tech specs" },
  { id: "faqs", label: "FAQs" },
];

export function StickyEnquiry({
  name,
  price,
  compareAtPrice,
}: {
  name: string;
  price: number;
  compareAtPrice?: number;
}) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(SECTIONS[0].id);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      /* The navbar hides on the way down and returns on the way up, and it's
         translucent — so this bar takes the same cue in reverse. The two swap
         at the top of the page instead of bleeding through one another. */
      const goingDown = y > lastY.current;
      if (Math.abs(y - lastY.current) > 4) {
        setShow(y > 620 && goingDown);
      }
      if (y <= 620) setShow(false);
      lastY.current = y;

      /* Whichever section has passed under the bar is the current one. */
      const line = y + 160;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };

    lastY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop — product sub-nav pinned to the top */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 hidden border-b border-white/10 bg-ink/90 backdrop-blur-xl md:block"
          >
            <div className="container flex h-14 items-center justify-between gap-6">
              <div className="flex items-center gap-7">
                <span className="display shrink-0 text-base font-semibold text-white">
                  {name}
                </span>
                <nav className="flex items-center gap-6">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={cn(
                        "text-sm transition-colors",
                        active === s.id
                          ? "text-white"
                          : "text-white/55 hover:text-white"
                      )}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <EnquireButton
                  product={name}
                  variant="accent"
                  size="sm"
                  withArrow
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile — a single reachable CTA stays at the bottom */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 px-4 py-3 backdrop-blur-xl md:hidden"
          >
            <EnquireButton
              product={name}
              variant="accent"
              size="lg"
              withArrow
              className="w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
