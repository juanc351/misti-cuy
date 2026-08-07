"use client";

import { AnimatePresence, motion } from "framer-motion";

interface NavigationBackButtonProps {
  visible: boolean;
  onClick: () => void;
}

export default function NavigationBackButton({
  visible,
  onClick,
}: NavigationBackButtonProps) {
  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.button
          key="navigation-back-button"
          type="button"
          aria-label="Volver"
          onClick={onClick}
          initial={{
            opacity: 0,
            x: -12,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -12,
            scale: 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
            mass: 0.8,
          }}
          whileHover={{
            x: -3,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/20
            text-lg
            text-white
            backdrop-blur-xl
          "
        >
          ←
        </motion.button>
      ) : (
        <div className="h-10 w-10" />
      )}
    </AnimatePresence>
  );
}