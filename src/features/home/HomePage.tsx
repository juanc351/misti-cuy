import { Hero } from "./sections/Hero";
import { Story } from "./sections/Story";
import { Cuyes } from "./sections/Cuyes";
import { Footer } from "./sections/Footer";

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