"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import type { CuyCard as CuyCardType } from "../../types/cuy.types";

interface CuyCardProps {
  card: CuyCardType;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CuyCard({ card }: CuyCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
        ease: easing,
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-primary/20 bg-black"
    >
      {/* Imagen */}
      <motion.div
        initial={{
          scale: 1.12,
          opacity: 0.75,
          filter: "blur(8px)",
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1.1,
          ease: easing,
        }}
        className="absolute inset-0"
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width:1024px)100vw,50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/15 transition-all duration-500 group-hover:from-black group-hover:via-black/60" />

      {/* Contenido */}
      <div className="relative flex min-h-[38svh] flex-col justify-between p-[clamp(1.5rem,2vw,2rem)] lg:min-h-[42svh]">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: easing,
          }}
          className="space-y-4"
        >
          <h3 className="text-[clamp(1.8rem,2.2vw,2.3rem)] font-black text-white">
            {card.title}
          </h3>

          <p className="max-w-sm leading-8 text-white/80">
            {card.description}
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            delay: 0.35,
            duration: 0.7,
            ease: easing,
          }}
        >
          <Link
            href={card.href}
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-background"
          >
            {card.buttonLabel}

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}