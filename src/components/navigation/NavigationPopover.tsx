"use client";

import { AnimatePresence, motion } from "framer-motion";

import NavigationItem from "./NavigationItem";
import { navigationItems } from "./navigation.constants";
import { useNavigation } from "./NavigationProvider";

import {
  menuVariants,
  itemVariants,
} from "@/motion";

interface NavigationPopoverProps {
  open: boolean;
  currentPath: string;
  onClose: () => void;
}

export default function NavigationPopover({
  open,
  currentPath,
  onClose,
}: NavigationPopoverProps) {
  useNavigation();

  const width = 320;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          />

          {/* Popover */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              top: 0,
              right: 0,
              width,
            }}
            className="
              fixed
              z-50
              origin-top-right
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-black/75
              backdrop-blur-2xl
              shadow-2xl
            "
          >
            <motion.nav
              variants={menuVariants}
              className="flex flex-col p-3"
            >
              {navigationItems
                .filter((item) => item.isEnabled)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                  >
                    <NavigationItem
                      item={item}
                      active={currentPath === item.href}
                      onClick={onClose}
                      className="
                        rounded-xl
                        px-5
                        py-5
                        text-lg
                      "
                    />
                  </motion.div>
                ))}
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}