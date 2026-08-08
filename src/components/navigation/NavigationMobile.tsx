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
      {/* =====================================
          BARRA SUPERIOR MOBILE

          Degradado negro tenue.
          Sin blur.
          Se desvanece hacia abajo.
      ====================================== */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
          lg:hidden
          bg-gradient-to-b
          from-black/45
          via-black/25
          to-transparent
        "
      >
        <div
          className="
            grid
            h-16
            grid-cols-[1fr_auto_1fr]
            items-center
            px-3
          "
        >
          {/* =================================
              BOTÓN VOLVER
          ================================= */}

          <div
            className="
              flex
              items-center
              justify-start
            "
          >
            <NavigationBackButton
              visible={
                showBackButton &&
                canGoBack
              }
              onClick={goBack}
            />
          </div>

          {/* =================================
              TÍTULO
          ================================= */}

          <div
            className="
              flex
              items-center
              justify-center
            "
          >
            <span
              className="
                text-sm
                font-semibold
                text-white/90
              "
            >
              {currentPageTitle}
            </span>
          </div>

          {/* =================================
              ESPACIO RESERVADO
              PARA EL MENÚ
          ================================= */}

          <div
            className="
              h-10
              w-10
            "
          />
        </div>
      </header>

      {/* =====================================
          BOTÓN / MENÚ PRINCIPAL MOBILE
      ====================================== */}

      <div
        className="
          fixed
          right-3
          top-1
          z-[60]
          lg:hidden
        "
      >
        <AnimatedMenuButton />
      </div>
    </>
  );
}