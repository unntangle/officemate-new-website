import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE } from "@/constants/site";
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
        <div>
          <Suspense
            fallback={
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProductsView />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
