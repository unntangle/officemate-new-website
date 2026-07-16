import { Hero } from "@/components/home/Hero";
import { ClientsCarousel } from "@/components/home/ClientsCarousel";
import { ErgonomicAdvisor } from "@/components/home/ErgonomicAdvisor";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ChairHealthScore } from "@/components/home/ChairHealthScore";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsCarousel />
      {/* Differentiators first — the advisor captures intent, the score backs it up */}
      <ErgonomicAdvisor />
      <Categories />
      <FeaturedProducts />
      <ChairHealthScore />
      {/* Table stakes below */}
      <Stats />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
