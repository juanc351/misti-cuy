import type { Variants } from "framer-motion";

import { SPRING } from "../spring";

export const itemVariants: Variants = {
  closed: {
    opacity: 0,
    x: 18,
    filter: "blur(4px)",
  },

  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",

    transition: {
      ...SPRING.gentle,
    },
  },
};