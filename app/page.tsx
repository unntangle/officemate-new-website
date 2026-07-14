import { Hero } from "@/components/home/Hero";
import { ClientsCarousel } from "@/components/home/ClientsCarousel";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Showcase } from "@/components/home/Showcase";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsCarousel />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <Showcase />
      <Stats />
      <Process />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
