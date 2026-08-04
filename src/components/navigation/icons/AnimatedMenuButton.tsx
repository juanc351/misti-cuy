"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { navigationItems } from "../navigation.constants";
import HamburgerIcon from "./HamburgerIcon";
import MenuOpenedIcon from "./MenuOpenedIcon";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const shellVariants = {
  closed: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.28)",
  },
  open: {
    width: 320,
    height: 260,
    borderRadius: 28,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.28)",
  },
};

export default function AnimatedMenuButton() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((previous) => !previous);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[55] bg-black/10"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.8,
        }}
        onClick={() => setOpen(false)}
      />

      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={shellVariants}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.8,
        }}
        className="relative z-[60] overflow-hidden border border-white/10 backdrop-blur-2xl"
        style={{ maxWidth: "min(86vw, 320px)" }}
      >
        <motion.button
          type="button"
          onClick={toggleMenu}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-14 w-full items-center justify-center text-white"
        >
          {open ? <MenuOpenedIcon /> : <HamburgerIcon />}
        </motion.button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="menu-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
                mass: 0.8,
                delay: 0.06,
              }}
              className="flex flex-col gap-1 px-3 pb-3"
            >
              {navigationItems
                .filter((item) => item.isEnabled)
                .map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="rounded-2xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10"
                    whileHover={{ x: 4, scale: 1.01 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
