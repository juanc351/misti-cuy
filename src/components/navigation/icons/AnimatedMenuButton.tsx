"use client";

import { useState } from "react";

import { navigationItems } from "../navigation.constants";

export default function AnimatedMenuButton() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((previous) => !previous);
  };

  return (
    <div className="relative z-[60]">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/20 bg-black p-3">
          {navigationItems
            .filter((item) => item.isEnabled)
            .map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-white hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
        </div>
      )}
    </div>
  );
}