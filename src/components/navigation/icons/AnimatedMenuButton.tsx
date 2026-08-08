"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { navigationItems } from "../navigation.constants";

export default function AnimatedMenuButton() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => {
    setOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const enabledItems = navigationItems.filter(
    (item) => item.isEnabled
  );

  return (
    <div
      className="
        relative
        flex
        items-start
        justify-end
      "
    >
      <AnimatePresence mode="wait">

        {/* =====================================
            BOTÓN HAMBURGUESA
            Solo aparece cuando el menú está cerrado
        ====================================== */}

        {!open && (
          <motion.button
            key="menu-button"
            type="button"
            onClick={toggleMenu}
            aria-label="Abrir menú"
            aria-expanded={false}
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              duration: 0.18,
            }}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-[#050505]
              text-white
              shadow-lg
            "
          >
            <span
              className="
                text-2xl
                leading-none
              "
            >
              ☰
            </span>
          </motion.button>
        )}

        {/* =====================================
            MENÚ ABIERTO
        ====================================== */}

        {open && (
          <>
            {/* =================================
                CAPA PARA CERRAR AL TOCAR FUERA
            ================================== */}

            <motion.button
              key="menu-overlay"
              type="button"
              aria-label="Cerrar menú"
              onClick={closeMenu}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                fixed
                inset-0
                z-[59]
                cursor-default
                bg-black/10
              "
            />

            {/* =================================
                SUBMENÚ
            ================================== */}

            <motion.nav
              key="navigation-menu"
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              aria-label="Menú principal"
              className="
                relative
                z-[60]
                w-64
                rounded-2xl
                border
                border-white/10
                bg-black/90
                p-2
                shadow-2xl
              "
            >
              {enabledItems.map(
                (item, index) => {
                  const isActive =
                    pathname === item.href;

                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      initial={{
                        opacity: 0,
                        x: 8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.18,
                      }}
                      onClick={closeMenu}
                      className={`
                        block
                        rounded-xl
                        px-4
                        py-3
                        transition-colors
                        active:bg-white/15
                        ${
                          isActive
                            ? "text-[#7CB342]"
                            : "text-white"
                        }
                      `}
                    >
                      {item.label}
                    </motion.a>
                  );
                }
              )}
            </motion.nav>
          </>
        )}

      </AnimatePresence>
    </div>
  );
}