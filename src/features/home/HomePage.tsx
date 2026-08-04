import Navigation from "@/components/navigation";
import Footer from "@/components/layout/Footer";

import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import Availability from "./components/Availability";
import CTA from "./components/CTA";

export default function HomePage() {
  return (
    <>
      <Navigation title="Inicio" />

      <main className="pt-32">
        <Hero />
        <FeaturedProducts />
        <WhyChooseUs />
        <Availability />
        <CTA />
      </main>

      <Footer />
    </>
  );
}