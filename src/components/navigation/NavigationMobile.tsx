"use client";

import { usePathname } from "next/navigation";

import { useLearnContext } from "@/features/aprende/LearnProvider";

import { navigationItems } from "./navigation.constants";
import NavigationBackButton from "./NavigationBackButton";
import { AnimatedMenuButton } from "./icons";

export default function NavigationMobile() {
  const pathname = usePathname();

  const {
    canGoBack,
    goBack,
  } = useLearnContext();

  const currentPageTitle =
    navigationItems.find(
      (item) => item.href === pathname
    )?.title ?? "Inicio";

  const showBackButton =
    pathname === "/aprende";

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 lg:hidden">
        <div className="mx-3 mt-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="grid h-14 grid-cols-3 items-center px-2">
            <NavigationBackButton
              visible={
                showBackButton &&
                canGoBack
              }
              onClick={goBack}
            />

            <div className="justify-self-center">
              <span className="text-sm font-semibold text-white/90">
                {currentPageTitle}
              </span>
            </div>

            <div className="h-10 w-10" />
          </div>
        </div>
      </header>

      <div className="fixed right-3 top-3 z-[60] lg:hidden">
        <AnimatedMenuButton />
      </div>
    </>
  );
}