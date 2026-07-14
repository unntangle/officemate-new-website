import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_LINKS } from "@/constants/site";
import { CATEGORIES } from "@/constants/categories";
import { EnquireButton } from "@/components/common/EnquireButton";

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
            <Image
              src="/images/logo.webp"
              alt={SITE.name}
              width={160}
              height={21}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-muted leading-relaxed">
              Ergonomic seating and workspaces engineered around how the body
              actually moves.
            </p>
            <div className="mt-6">
              <EnquireButton variant="primary" withArrow label="Start an enquiry" />
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
          <div className="text-sm text-muted">
            <p>{SITE.address.line1}, {SITE.address.line2}</p>
            <p>
              {SITE.email} · {SITE.phone}
            </p>
          </div>
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
      </div>
    </footer>
  );
}
