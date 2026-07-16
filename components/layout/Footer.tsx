import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SITE, NAV_LINKS, LOCATIONS } from "@/constants/site";
import { CATEGORIES } from "@/constants/categories";

const footerCols = [
  {
    title: "Products",
    links: CATEGORIES.map((c) => ({
      label: c.name,
      href: `/products?category=${c.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Studios", href: "/contact" },
      { label: "Warranty", href: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Enquiries", href: "/contact" },
      { label: "Bulk orders", href: "/contact" },
      { label: "Care guides", href: "/products" },
      { label: "Assembly", href: "/products" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            {/* Locations */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {LOCATIONS.map((loc) => (
                <div key={loc.label}>
                  <p className="eyebrow mb-2.5">{loc.label}</p>
                  <p className="text-sm font-medium text-ink">{loc.name}</p>
                  <address className="mt-1.5 text-sm not-italic leading-relaxed text-muted">
                    {loc.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="text-muted transition-colors hover:text-ink"
                    >
                      {loc.phone}
                    </a>
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-accent"
                    >
                      <MapPin size={13} />
                      Get directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerCols.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            {SITE.email}
          </a>
          <div className="flex items-center gap-5">
            {SITE.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name} Studio. All rights reserved.</p>
          <p className="display tracking-widest">{SITE.tagline.toUpperCase()}</p>
        </div>

        {/* Wordmark sign-off */}
        <div className="mt-8 flex justify-center border-t border-line pt-8 -mb-6">
          <Image
            src="/images/logo.webp"
            alt={SITE.name}
            width={640}
            height={84}
            className="h-10 w-auto object-contain opacity-80 md:h-14"
          />
        </div>
      </div>
    </footer>
  );
}
