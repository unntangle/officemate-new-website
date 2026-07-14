import { FEATURED } from "@/constants/products";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { stagger, fadeUp } from "@/lib/motion";

export function FeaturedProducts() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Best sellers"
          title="The chairs people come back for"
          description="A tight, well-made range. Every model earns its place — no filler, no clutter."
        />

        <Reveal
          variants={stagger(0.08)}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURED.map((product) => (
            <Reveal key={product.slug} variants={fadeUp}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
