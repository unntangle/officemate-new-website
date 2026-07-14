import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";
import { PRODUCTS } from "@/constants/products";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ProductRender } from "@/components/common/ProductRender";
import { stagger, fadeUp } from "@/lib/motion";

export function Categories() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Shop by category"
            title="A workspace, considered end to end"
          />
          <Reveal>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              View all products
              <ArrowUpRight
                size={16}
                className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal
          variants={stagger(0.06)}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {CATEGORIES.map((cat) => {
            const sample = PRODUCTS.find((p) => p.category === cat.slug);
            return (
              <Reveal key={cat.slug} variants={fadeUp}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all duration-300 hover:border-ink/15 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="display text-lg font-semibold">{cat.name}</h3>
                      <p className="mt-1 max-w-[16ch] text-sm text-muted">
                        {cat.tagline}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <div className="mt-6 h-28 self-end">
                    {sample && (
                      <div className="h-full transition-transform duration-500 group-hover:scale-105">
                        <ProductRender
                          category={cat.slug}
                          color={sample.swatch}
                          className="h-28 w-auto"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
