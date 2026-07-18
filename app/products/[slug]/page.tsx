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
  Armchair,
  Wind,
  Move3d,
  Phone,
} from "lucide-react";
import { PRODUCTS, getProduct, getRelated } from "@/constants/products";
import { categoryName } from "@/constants/categories";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Accordion } from "@/components/common/Accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EnquireButton } from "@/components/common/EnquireButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ColorProvider } from "@/components/products/ColorProvider";
import { ColorPicker } from "@/components/products/ColorPicker";
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

/* Pastel tiles, cycled positionally — same device as the Stats band */
const TRUST = [
  { icon: ShieldCheck, label: "1-yr warranty", tile: "bg-sage-soft text-sage-ink" },
  { icon: RotateCcw, label: "30-day trial", tile: "bg-honey-soft text-honey-ink" },
  { icon: Truck, label: "Free delivery", tile: "bg-lilac-soft text-lilac-ink" },
];

const FEATURE_DECOR = [
  { icon: Armchair, tile: "bg-sage-soft text-sage-ink" },
  { icon: Move3d, tile: "bg-honey-soft text-honey-ink" },
  { icon: Wind, tile: "bg-lilac-soft text-lilac-ink" },
  { icon: ShieldCheck, tile: "bg-accent-soft text-accent" },
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

  /* Buy-column panels. Every one is drawn from real product data — nothing
     here is invented copy. */
  const detailPanels = [
    { question: "Description", answer: product.description },
    {
      question: "Product details",
      answer: product.specifications
        .map((s) => `${s.label}: ${s.value}`)
        .join(" · "),
    },
    { question: "Care instructions", answer: product.care.join(" ") },
    { question: "Warranty details", answer: product.warranty },
  ];

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
    <div className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Overview — ColorProvider shares the selected colourway between the
          gallery and the picker. Children stay server-rendered. */}
      <ColorProvider colors={product.colors}>
        <section className="container grid gap-8 lg:grid-cols-[auto_minmax(0,36rem)] lg:gap-12">
          <ProductGallery
            slug={product.slug}
            category={product.category}
            name={product.name}
          />

          <div className="lg:py-4">
            <span className="eyebrow block">
              {categoryName(product.category)}
            </span>
            <h1 className="display mt-2 text-3xl font-semibold leading-[1.05] text-ink sm:text-4xl md:text-[2.75rem]">
              {product.name}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted">
              {product.tagline}
            </p>

            {/* Colours */}
            <ColorPicker />

            {/* CTA */}
            <div className="mt-6">
              <EnquireButton
                product={product.name}
                variant="accent"
                size="lg"
                withArrow
                className="w-full hover:shadow-none"
              />
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <EnquireButton
                  product={`${product.name} — book a demo`}
                  variant="outline"
                  size="lg"
                  label="Live demo"
                />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  <Phone size={16} />
                  Connect now
                </a>
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {TRUST.map(({ icon: Icon, label, tile }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-surface px-3 py-4 text-center"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${tile}`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="text-xs font-medium text-muted">{label}</span>
                </div>
              ))}
            </div>

            {/* Detail panels — the long-form copy, folded away until asked for */}
            <div className="mt-6 rounded-2xl border border-line px-5">
              <Accordion
                items={detailPanels}
                variant="divided"
                defaultOpen={null}
                className="border-y-0"
              />
            </div>
          </div>
        </section>
      </ColorProvider>

      {/* Description */}
      <section id="overview" className="section scroll-mt-24">
        <div className="container">
          <div className="grid gap-10 rounded-3xl bg-surface p-8 md:p-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:p-16">
            <SectionHeading eyebrow="Overview" title="Designed around you" />
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                {product.description}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{product.usage}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section id="features" className="section scroll-mt-24 pt-0">
        <div className="container">
          <SectionHeading
            eyebrow="Key features"
            title="Every adjustment earns its place"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {product.features.map((f, i) => {
              const { icon: Icon, tile } = FEATURE_DECOR[i % FEATURE_DECOR.length];
              return (
                <Reveal key={f.title} delay={i * 0.05}>
                  <div className="h-full rounded-3xl bg-surface p-7 transition-shadow duration-300 hover:shadow-soft">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tile}`}
                    >
                      <Icon size={19} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {f.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="section scroll-mt-24 pt-0">
        <div className="container">
          <SectionHeading eyebrow="Benefits" title="What it does for your day" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {product.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl bg-card p-7 shadow-soft">
                  <span className="display text-3xl font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specs / Dimensions / Materials */}
      <section id="specs" className="section scroll-mt-24 pt-0">
        <div className="container grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-surface p-8 md:p-10">
            <div className="flex items-center gap-2.5">
              <Ruler size={18} className="text-accent" />
              <h2 className="display text-2xl font-semibold text-ink">
                Specifications
              </h2>
            </div>
            <dl className="mt-6 divide-y divide-line/70">
              {product.specifications.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex items-center gap-2.5">
              <Ruler size={18} className="text-accent" />
              <h2 className="display text-2xl font-semibold text-ink">
                Dimensions
              </h2>
            </div>
            <dl className="mt-6 divide-y divide-line/70">
              {product.dimensions.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl bg-surface p-8 md:p-10">
            <div className="flex items-center gap-2.5">
              <Layers size={18} className="text-accent" />
              <h2 className="display text-2xl font-semibold text-ink">
                Materials
              </h2>
            </div>
            <ul className="mt-6 space-y-3">
              {product.materials.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-ink">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-muted">{m}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-soft text-sage-ink">
                  <ShieldCheck size={18} />
                </span>
                <h3 className="mt-3 font-bold text-ink">Warranty</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {product.warranty}
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-honey-soft text-honey-ink">
                  <Wind size={18} />
                </span>
                <h3 className="mt-3 font-bold text-ink">Care</h3>
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
        <div className="container grid gap-5 lg:grid-cols-2">
          {/* Video */}
          <Reveal>
            <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-ink">
              <svg
                className="absolute inset-0 h-full w-full opacity-[0.12]"
                aria-hidden
              >
                <defs>
                  <pattern
                    id="v-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
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
                <span className="text-sm font-medium">
                  Watch the {product.name} film
                </span>
              </button>
            </div>
          </Reveal>

          {/* Downloads */}
          <Reveal>
            <div className="h-full rounded-3xl bg-surface p-8 md:p-10">
              <h2 className="display text-2xl font-semibold text-ink">
                Downloads
              </h2>
              <p className="mt-2 text-muted">
                Full specifications, assembly and warranty details.
              </p>
              <div className="mt-6 space-y-3">
                {product.downloads.map((d) => (
                  <button
                    key={d.label}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-card p-5 text-left transition-shadow duration-300 hover:shadow-soft"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <FileText size={18} />
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">
                          {d.label}
                        </span>
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="section scroll-mt-24 pt-0">
        <div className="container">
          <div className="rounded-3xl bg-surface p-8 md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <SectionHeading eyebrow="FAQs" title={`About the ${product.name}`} />
              <Reveal>
                <Accordion items={product.faqs} variant="card" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section pt-0">
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
