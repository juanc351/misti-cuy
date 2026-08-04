import type { NavigationItem } from "./navigation.types";

/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Navigation System
 *
 * Fuente oficial de la navegación pública.
 *
 * Todas las páginas públicas deben registrarse aquí.
 * ============================================================================
 */

export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Inicio",
    title: "Inicio",
    href: "/",
    isEnabled: true,
  },

  {
    id: "mis-cuyes",
    label: "Mis Cuyes",
    title: "Mis Cuyes",
    href: "/mis-cuyes",
    isEnabled: true,
  },

  {
    id: "aprende",
    label: "Aprende",
    title: "Aprende",
    href: "/aprende",
    isEnabled: true,
  },
];