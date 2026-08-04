"use client";

import { usePathname } from "next/navigation";

import NavigationLogo from "./NavigationLogo";
import NavigationItem from "./NavigationItem";

import { navigationItems } from "./navigation.constants";

export default function NavigationDesktop() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="rounded-full border border-white/15 bg-black/10 px-5 py-3 backdrop-blur-sm">
          <NavigationLogo />
        </div>

        <nav className="flex items-center gap-8 rounded-full border border-white/15 bg-black/10 px-6 py-3 backdrop-blur-sm">
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
    </header>
  );
}
