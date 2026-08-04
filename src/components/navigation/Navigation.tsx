"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";
import NavigationPopover from "./NavigationPopover";

import { useNavigation } from "./NavigationProvider";

import type { NavigationProps } from "./navigation.types";

/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Navigation System
 *
 * Punto de entrada oficial del sistema de navegación.
 * ============================================================================
 */

export default function Navigation({
  title,
}: NavigationProps) {
  const pathname = usePathname();

  const {
    drawerOpen,
    openDrawer,
    closeDrawer,
  } = useNavigation();

  /**
   * Determina automáticamente si debe mostrarse
   * el botón para volver.
   */
  const showBackButton = useMemo(() => {
    return pathname !== "/";
  }, [pathname]);

  return (
    <>
      {/* Desktop */}
      <NavigationDesktop />

      {/* Mobile */}
      <NavigationMobile
        title={title}
        showBackButton={showBackButton}
        onMenuClick={openDrawer}
      />

      {/* Popover */}
      <NavigationPopover
        open={drawerOpen}
        currentPath={pathname}
        onClose={closeDrawer}
      />
    </>
  );
}