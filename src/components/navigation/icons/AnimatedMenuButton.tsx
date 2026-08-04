"use client";

import { AnimatePresence, motion } from "framer-motion";

import HamburgerIcon from "./HamburgerIcon";
import MenuOpenedIcon from "./MenuOpenedIcon";

interface AnimatedMenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function AnimatedMenuButton({
  open,
  onClick,
}: AnimatedMenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        transition-colors
        hover:bg-white/10
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={open ? "opened" : "closed"}
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            rotate: 10,
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 30,
          }}
        >
          {open ? <MenuOpenedIcon /> : <HamburgerIcon />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}