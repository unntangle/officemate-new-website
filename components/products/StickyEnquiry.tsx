"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { EnquireButton } from "@/components/common/EnquireButton";

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

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop sticky bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-line bg-white/85 backdrop-blur-xl md:block"
          >
            <div className="container flex items-center justify-between gap-6 py-3.5">
              <div className="flex items-baseline gap-3">
                <span className="display text-base font-semibold text-ink">
                  {name}
                </span>
                <span className="display text-base font-semibold text-ink">
                  {formatPrice(price)}
                </span>
                {compareAtPrice && (
                  <span className="text-sm text-muted line-through">
                    {formatPrice(compareAtPrice)}
                  </span>
                )}
              </div>
              <EnquireButton product={name} variant="accent" withArrow />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile floating button */}
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
              label={`Enquire — ${formatPrice(price)}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
