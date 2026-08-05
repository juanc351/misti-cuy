"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Story } from "../../types/story.types";

interface StorySceneProps {
  story: Story;
  isReversed: boolean;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function StoryScene({
  story,
  isReversed,
}: StorySceneProps) {
  const textBlock = (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex flex-col justify-center gap-[clamp(1rem,2vh,2rem)] px-[clamp(2rem,5vw,5rem)] py-[clamp(3rem,8vh,6rem)]"
    >
      <motion.span
        variants={item}
        className="text-sm font-semibold uppercase tracking-[0.25em] text-primary"
      >
        Capítulo {story.chapter}
      </motion.span>

      <motion.h2
        variants={item}
        className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none text-foreground"
      >
        {story.title}
      </motion.h2>

      <motion.p
        variants={item}
        className="max-w-xl text-lg leading-8 text-muted-foreground"
      >
        {story.description}
      </motion.p>

      <motion.blockquote
        variants={item}
        className="border-l-2 border-primary pl-6 text-lg italic text-foreground"
      >
        {story.conclusion}
      </motion.blockquote>
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.08,
        clipPath: "inset(20% 0 20% 0)",
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0 0% 0)",
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-[60svh] overflow-hidden"
    >
      <Image
        src={story.image}
        alt={story.title}
        fill
        sizes="(max-width:768px)100vw,55vw"
        className="object-cover transition-transform duration-700"
      />
    </motion.div>
  );

  return (
    <article
      className="grid min-h-[100svh] grid-cols-1 overflow-hidden md:grid-cols-[45%_55%]"
      aria-label={`Capítulo ${story.chapter}`}
    >
      {/* MOBILE */}
      <div className="contents md:hidden">
        {textBlock}
        {imageBlock}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:contents">
        {isReversed ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </article>
  );
}