import type { Metadata } from "next";
import { Suspense } from "react";
import { PRODUCTS } from "@/constants/products";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductsView } from "@/components/products/ProductsView";
import { ProductCardSkeleton } from "@/components/common/Skeleton";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full Officemate range — ergonomic and office chairs, executive and gaming seating, standing desks and workspace accessories, all engineered around how the body moves.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Products — ${SITE.name}`,
    description:
      "Ergonomic chairs, standing desks and accessories engineered around how the body moves.",
    url: `${SITE.url}/products`,
  },
};

export default function ProductsPage() {
  return (
    <div className="section pt-28 md:pt-32">
      <div className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">The range</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            Seating and desks, engineered end to end
          </h1>
          <p className="lede mt-5">
            A deliberately tight catalogue. Every model is built to be lived in for
            years — filter by category, search by feature, and enquire on anything
            that fits how you work.
          </p>
        </Reveal>

        <div className="mt-12">
          <Suspense
            fallback={
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProductsView products={PRODUCTS} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
