import type { ReactElement } from "react";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroContainer from "./HeroContainer";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function Hero(): ReactElement {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <HeroContainer>
        <div className="flex flex-col items-start">
          <HeroContent />

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <HeroScrollIndicator />
          </div>
        </div>
      </HeroContainer>
    </section>
  );
}
