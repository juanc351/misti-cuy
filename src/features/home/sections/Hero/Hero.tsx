"use client";

import type { ReactElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroContainer from "./HeroContainer";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function Hero(): ReactElement {
  const { scrollYProgress } = useScroll();

  // Solo afecta el primer tramo del Hero
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.98]);

  return (
    <motion.section
      id="hero"
      style={{
        opacity,
        scale,
      }}
      className="relative min-h-screen overflow-hidden"
    >
      <HeroBackground />

      <HeroContainer>
        <div className="flex flex-col items-start">
          <HeroContent />

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <HeroScrollIndicator />
          </div>
        </div>
      </HeroContainer>
    </motion.section>
  );
}
