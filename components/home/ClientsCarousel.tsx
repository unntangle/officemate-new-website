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
          <div className="flex w-max items-center justify-around gap-6 md:gap-10 px-3 md:px-5">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={`logo-1-${idx}`}
                className="w-40 h-24 md:w-56 md:h-32 shrink-0 bg-[#f7f7f7] border border-black/5 rounded-2xl p-4 md:p-6 transition-transform hover:-translate-y-1"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`/images/clients/${logo}`}
                    alt={`${logo.replace(".png", "")} logo`}
                    fill
                    className="object-contain drop-shadow-sm"
                    sizes="(max-width: 768px) 160px, 224px"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-max items-center justify-around gap-6 md:gap-10 px-3 md:px-5">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={`logo-2-${idx}`}
                className="w-40 h-24 md:w-56 md:h-32 shrink-0 bg-[#f7f7f7] border border-black/5 rounded-2xl p-4 md:p-6 transition-transform hover:-translate-y-1"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`/images/clients/${logo}`}
                    alt={`${logo.replace(".png", "")} logo`}
                    fill
                    className="object-contain drop-shadow-sm"
                    sizes="(max-width: 768px) 160px, 224px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
