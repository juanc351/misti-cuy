import type { Variants } from "framer-motion";

import { SPRING } from "../spring";

export const menuVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.92,
    y: -18,
    filter: "blur(10px)",
    transition: {
      ...SPRING.gentle,
    },
  },

  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      ...SPRING.smooth,

      staggerChildren: 0.03,
      delayChildren: 0.01,
    },
  },
};