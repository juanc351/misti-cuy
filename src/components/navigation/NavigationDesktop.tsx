"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import NavigationLogo from "./NavigationLogo";
import NavigationItem from "./NavigationItem";

import { navigationItems } from "./navigation.constants";

export default function NavigationDesktop() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 hidden lg:block transition-all duration-300 ${
        scrolled ? "top-0" : "top-0"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled ? "max-w-[1440px] px-8" : "max-w-full"
        }`}
      >
        <div
          className={`
            flex items-center justify-between
            transition-all duration-300

            ${
              scrolled
                ? `
                    h-[76px]
                    rounded-3xl
                    border border-[#7CB342]/30
                    bg-[#0A0A0A]/90
                    px-10
                    backdrop-blur-xl
                    shadow-2xl
                  `
                : `
                    h-[126px]
                    border-b border-[#2A2A2A]
                    bg-[#0A0A0A]
                    px-12
                  `
            }
          `}
        >
          <NavigationLogo />

          <nav className="flex items-center gap-14">
            {navigationItems
              .filter((item) => item.isEnabled)
              .map((item) => (
                <NavigationItem
                  key={item.id}
                  item={item}
                  active={pathname === item.href}
                />
              ))}
          </nav>
        </div>
      </div>
    </header>
  );
}