import type { NavigationItem } from "./navigation.types";

/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Navigation System
 *
 * Opciones oficiales del menú principal.
 *
 * Cualquier nueva sección de la aplicación deberá registrarse aquí.
 * ============================================================================
 */

export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Inicio",
    href: "/",
    isEnabled: true,
  },

  {
    id: "catalog",
    label: "Mis Cuyes",
    href: "/catalog",
    isEnabled: true,
  },

  {
    id: "learning",
    label: "Aprende",
    href: "/learning",
    isEnabled: true,
  },
];