"use client";

import Image from "next/image";

/* Filenames are extension-less; the .webp is applied at the call site so the
   list survives any future format change. */
const CLIENT_LOGOS = [
  "access-healthcare",
  "ags-health",
  "asv",
  "basshyaam",
  "bosch",
  "cure",
  "daimler",
  "danfoss",
  "data-patterns",
  "flipkart",
  "freshworks",
  "ge",
  "hitachi",
  "mahindra",
  "nestle",
  "puma",
  "renault",
  "royal-enfield",
  "saint-gobain",
  "schneider",
  "start-health",
  "sutherland",
  "synergy",
  "tafe",
  "tata",
  "trimble",
  "tvh",
  "visteon",
  "yamaha",
  "zee",
  "zf",
];

/* Split into two rows that scroll in opposite directions. */
const MID = Math.ceil(CLIENT_LOGOS.length / 2);
const ROW_ONE = CLIENT_LOGOS.slice(0, MID);
const ROW_TWO = CLIENT_LOGOS.slice(MID);

function LogoRow({ logos, reverse }: { logos: string[]; reverse?: boolean }) {
  return (
    <div className="group relative flex w-full overflow-hidden whitespace-nowrap">
      {/* Two identical blocks animating by -50% for a seamless loop */}
      <div
        className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex w-max items-center justify-around gap-6 px-3 md:gap-10 md:px-5"
          >
            {logos.map((logo, idx) => (
              <div
                key={`${copy}-${idx}`}
                className="h-20 w-40 shrink-0 rounded-2xl border border-black/5 bg-[#f7f7f7] p-2 transition-transform hover:-translate-y-1 md:h-28 md:w-52 md:p-3"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={`/images/clients/${logo}.webp`}
                    alt={`${logo} logo`}
                    fill
                    className="object-contain drop-shadow-sm"
                    sizes="(max-width: 768px) 160px, 208px"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsCarousel() {
  return (
    <section className="overflow-hidden border-b border-line bg-white py-12 md:py-16">
      <div className="container mb-8 px-4 text-center md:px-6">
        <p className="eyebrow">Trusted by industry leaders</p>
      </div>

      <div className="flex flex-col gap-5 md:gap-6">
        <LogoRow logos={ROW_ONE} />
        <LogoRow logos={ROW_TWO} reverse />
      </div>
    </section>
  );
}
