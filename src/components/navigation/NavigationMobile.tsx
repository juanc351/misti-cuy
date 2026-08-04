"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { useNavigation } from "./NavigationProvider";
import { AnimatedMenuButton } from "./icons";

interface NavigationMobileProps {
  title: string;
  showBackButton?: boolean;
  onMenuClick: () => void;
}

export default function NavigationMobile({
  title,
  showBackButton = false,
  onMenuClick,
}: NavigationMobileProps) {
  const router = useRouter();

  const {
    menuButtonRef,
    drawerOpen,
  } = useNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl lg:hidden">
      <div className="flex h-[68px] items-center justify-between px-5">
        {/* Botón volver */}
        <div className="flex w-10 justify-start">
          {showBackButton && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Volver"
              className="rounded-xl p-2 text-white transition-all duration-300 hover:bg-white/10"
            >
              <ArrowLeft size={22} />
            </button>
          )}
        </div>

        {/* Título */}
        <h1 className="text-base font-semibold tracking-wide text-white">
          {title}
        </h1>

        {/* Botón menú */}
        <div ref={menuButtonRef}>
          <AnimatedMenuButton
            open={drawerOpen}
            onClick={onMenuClick}
          />
        </div>
      </div>
    </header>
  );
}