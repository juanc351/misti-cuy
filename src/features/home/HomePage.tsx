import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import Availability from "./components/Availability";
import CTA from "./components/CTA";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
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
