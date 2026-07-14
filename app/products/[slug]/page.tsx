import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Check,
  FileText,
  Play,
  ArrowRight,
  Ruler,
  Layers,
  Sparkles,
} from "lucide-react";
import { PRODUCTS, getProduct, getRelated } from "@/constants/products";
import { categoryName } from "@/constants/categories";
import { SITE } from "@/constants/site";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Rating } from "@/components/common/Rating";
import { Accordion } from "@/components/common/Accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { StickyEnquiry } from "@/components/products/StickyEnquiry";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${SITE.name}`,
      description: product.description,
      url: `${SITE.url}/products/${product.slug}`,
      type: "website",
    },
  };
}

const trust = [
  { icon: ShieldCheck, label: "Up to 12-yr warranty" },
  { icon: RotateCcw, label: "30-day home trial" },
  { icon: Truck, label: "Free carbon-neutral delivery" },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product.relatedSlugs).filter(
    (p) => p.slug !== product.slug
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categoryName(product.category),
    brand: { "@type": "Brand", name: SITE.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/products/${product.slug}`,
    },
  };

  return (
    <div className="pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
      </div>

      {/* Overview */}
      <section className="container mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          category={product.category}
          color={product.swatch}
          name={product.name}
          isNew={product.isNew}
        />

        <div className="lg:py-4">
          <span className="eyebrow">{categoryName(product.category)}</span>
          <h1 className="display mt-3 text-3xl font-semibold leading-[1.05] text-ink sm:text-4xl md:text-[2.75rem]">
            {product.name}
          </h1>

          <div className="mt-4">
            <Rating value={product.rating} count={product.reviewCount} />
          </div>

          <p className="mt-5 text-lg leading-relaxed text-muted">
            {product.tagline}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="display text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm text-muted">incl. taxes</span>
          </div>

          {/* Colours */}
          <div className="mt-7">
            <p className="text-sm font-medium text-ink">
              Colour ·{" "}
              <span className="text-muted">{product.colors[0]?.name}</span>
            </p>
            <div className="mt-3 flex gap-2.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-9 w-9 rounded-full border border-line ring-offset-2 ring-offset-canvas transition hover:ring-1 hover:ring-ink"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="mt-7 flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted"
              >
                {b}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EnquireButton
              product={product.name}
              variant="accent"
              size="lg"
              withArrow
              className="flex-1"
            />
            <EnquireButton
              product={`${product.name} — book a demo`}
              variant="outline"
              size="lg"
              label="Book a live demo"
              className="flex-1"
            />
          </div>

          {/* Trust row */}
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-3">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-muted">
                <Icon size={18} className="shrink-0 text-accent" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 border-t border-line pt-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeading eyebrow="Overview" title="Designed around you" />
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                {product.description}
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                {product.usage}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="section pt-0">
        <div className="container">
          <SectionHeading
            eyebrow="Key features"
            title="Every adjustment earns its place"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-card p-6 transition-colors hover:border-ink/15">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Benefits"
            title="What it does for your day"
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {product.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="flex gap-4">
                  <span className="display text-2xl font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{b.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {b.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specs / Dimensions / Materials */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2.5">
              <Ruler size={18} className="text-accent" />
              <h2 className="display text-2xl font-semibold text-ink">
                Specifications
              </h2>
            </div>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {product.specifications.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="text-sm font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex items-center gap-2.5">
              <Ruler size={18} className="text-accent" />
              <h2 className="display text-2xl font-semibold text-ink">
                Dimensions
              </h2>
            </div>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {product.dimensions.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="text-sm font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <Layers size={18} className="text-accent" />
              <h2 className="display text-2xl font-semibold text-ink">Materials</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {product.materials.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-muted">{m}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-card p-6">
                <ShieldCheck size={20} className="text-accent" />
                <h3 className="mt-3 font-semibold text-ink">Warranty</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {product.warranty}
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-card p-6">
                <Sparkles size={20} className="text-accent" />
                <h3 className="mt-3 font-semibold text-ink">Care</h3>
                <ul className="mt-2 space-y-1.5">
                  {product.care.map((c) => (
                    <li key={c} className="text-sm leading-relaxed text-muted">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads + Video */}
      <section className="section pt-0">
        <div className="container grid gap-8 lg:grid-cols-2">
          {/* Video */}
          <Reveal>
            <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-ink">
              <svg
                className="absolute inset-0 h-full w-full opacity-[0.12]"
                aria-hidden
              >
                <defs>
                  <pattern id="v-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="#fff" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#v-grid)" />
              </svg>
              <button
                className="relative z-10 flex flex-col items-center gap-3 text-white"
                aria-label="Play product film"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} className="translate-x-0.5 fill-white" />
                </span>
                <span className="text-sm font-medium">Watch the {product.name} film</span>
              </button>
            </div>
          </Reveal>

          {/* Downloads */}
          <Reveal>
            <h2 className="display text-2xl font-semibold text-ink">Downloads</h2>
            <p className="mt-2 text-muted">
              Full specifications, assembly and warranty details.
            </p>
            <div className="mt-6 space-y-3">
              {product.downloads.map((d) => (
                <button
                  key={d.label}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5 text-left transition-colors hover:border-ink/20"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-accent">
                      <FileText size={18} />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{d.label}</span>
                      <span className="block text-xs uppercase tracking-wide text-muted">
                        PDF · {d.size}
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="FAQs"
              title={`About the ${product.name}`}
            />
            <Reveal>
              <Accordion items={product.faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <SectionHeading eyebrow="Keep exploring" title="You might also like" />
              <Link
                href="/products"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent sm:flex"
              >
                All products <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyEnquiry
        name={product.name}
        price={product.price}
        compareAtPrice={product.compareAtPrice}
      />
    </div>
  );
}
