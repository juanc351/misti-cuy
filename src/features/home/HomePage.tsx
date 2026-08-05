import { Hero } from "./sections/Hero";
import { Story } from "./sections/Story";
import { Cuyes } from "./sections/Cuyes";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Cuyes />
      <Footer />
    </>
  );
}