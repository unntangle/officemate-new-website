import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactForm } from "@/components/common/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Officemate team about products, bulk workspace orders or a live demo. Find our studio address, business hours, phone and email — or send a message.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${SITE.name}`,
    description: "Talk to the Officemate team about products, bulk orders or a live demo.",
    url: `${SITE.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Get in touch</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            Let&rsquo;s find your fit
          </h1>
          <p className="lede mt-6">
            Questions about a product, kitting out a whole floor, or booking a live
            demo? Tell us what you need and a specialist will be in touch within one
            business day.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Info column */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={Mail} title="Email">
                <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                  {SITE.email}
                </a>
              </InfoCard>
              <InfoCard icon={Phone} title="Phone">
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {SITE.phone}
                </a>
              </InfoCard>
              <InfoCard icon={MapPin} title="Studio">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
                <br />
                {SITE.address.city}
              </InfoCard>
              <InfoCard icon={Clock} title="Hours">
                {SITE.hours.map((h) => (
                  <span key={h.day} className="block">
                    <span className="text-ink">{h.day}</span> · {h.time}
                  </span>
                ))}
              </InfoCard>
            </div>

            {/* Map placeholder */}
            <Reveal delay={0.1}>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface">
                <svg className="absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <pattern id="map-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                      <path d="M44 0H0V44" fill="none" stroke="#E5E5E5" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                  <path
                    d="M0 190 Q 160 120 300 200 T 640 170"
                    fill="none"
                    stroke="#C62828"
                    strokeWidth="3"
                    strokeOpacity="0.35"
                  />
                  <path
                    d="M120 0 L 180 240"
                    fill="none"
                    stroke="#C62828"
                    strokeWidth="3"
                    strokeOpacity="0.2"
                  />
                </svg>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-accent">
                    <MapPin size={22} />
                  </span>
                  <span className="mt-3 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-ink backdrop-blur">
                    Officemate Studio · Indiranagar
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
                <MessageSquare size={18} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted">
                  Furnishing an office?{" "}
                  <span className="font-medium text-ink">Mention your headcount</span>{" "}
                  and we&apos;ll arrange a workspace assessment with volume pricing.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon size={18} />
      </span>
      <h3 className="mt-4 font-semibold text-ink">{title}</h3>
      <div className="mt-1.5 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}
