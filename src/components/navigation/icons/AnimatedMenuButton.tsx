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

export default function AnimatedMenuButton() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((previous) => !previous);
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[55] bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.8,
            }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        layout
        layoutId="mobile-menu-shell"
        initial={false}
        animate={{
          width: open ? 320 : 56,
          height: open ? 260 : 56,
          borderRadius: open ? 28 : 9999,
          scale: open ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.8,
        }}
        className="relative z-[60] overflow-hidden border border-white/10 bg-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
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
                stiffness: 320,
                damping: 28,
                mass: 0.8,
              }}
            >
              {open ? <MenuOpenedIcon /> : <HamburgerIcon />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <motion.nav
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
            y: open ? 0 : 12,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
            mass: 0.8,
            delay: open ? 0.12 : 0,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.12,
              },
            },
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
                className="rounded-2xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10"
                whileHover={{ x: 4, scale: 1.01 }}
              >
                {item.label}
              </motion.a>
            ))}
        </motion.nav>
      </motion.div>
    </>
  );
}
