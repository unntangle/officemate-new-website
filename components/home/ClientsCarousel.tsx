"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const CLIENT_LOGOS = [
  "access-healthcare.png",
  "ags-health.png",
  "asv.png",
  "basshyaam.png",
  "bosch.png",
  "cure.png",
  "daimler.png",
  "danfoss.png",
  "data-patterns.png",
  "flipkart.png",
  "freshworks.png",
  "ge.png",
  "hitachi.png",
  "mahindra.png",
  "nestle.png",
  "puma.png",
  "renault.png",
  "royal-enfield.png",
  "saint-gobain.png",
  "schneider.png",
  "start-health.png",
  "sutherland.png",
  "synergy.png",
  "tafe.png",
  "tata.png",
  "trimble.png",
  "tvh.png",
  "visteon.png",
  "yamaha.png",
  "zee.png",
  "zf.png",
];

export function ClientsCarousel() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden border-b border-line">
      <div className="container px-4 md:px-6 mb-8 text-center">
        <p className="eyebrow">Trusted by industry leaders</p>
      </div>
      
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        {/* We use two identical blocks animating to -100% for a mathematically seamless loop */}
        <div className="flex animate-marquee w-max items-center">
          <div className="flex w-max items-center justify-around gap-12 md:gap-24 px-6 md:px-12">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={`logo-1-${idx}`}
                className="relative w-28 h-12 md:w-36 md:h-16 shrink-0"
              >
                <Image
                  src={`/images/clients/${logo}`}
                  alt={`${logo.replace(".png", "")} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ))}
          </div>
          <div className="flex w-max items-center justify-around gap-12 md:gap-24 px-6 md:px-12">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={`logo-2-${idx}`}
                className="relative w-28 h-12 md:w-36 md:h-16 shrink-0"
              >
                <Image
                  src={`/images/clients/${logo}`}
                  alt={`${logo.replace(".png", "")} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
