/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Navigation System
 *
 * Contratos oficiales del sistema de navegación.
 *
 * Este módulo será utilizado por toda la aplicación:
 *
 * • Inicio
 * • Mis Cuyes
 * • Aprende
 * • Futuras páginas
 * ============================================================================
 */

/**
 * Página disponible dentro del menú principal.
 */
export interface NavigationItem {
  /**
   * Identificador único.
   */
  id: string;

  /**
   * Texto visible.
   */
  label: string;

  /**
   * Ruta.
   */
  href: string;

  /**
   * Indica si la opción está habilitada.
   */
  isEnabled: boolean;
}

/**
 * Propiedades del componente principal.
 */
export interface NavigationProps {
  /**
   * Título mostrado en la versión móvil.
   */
  title: string;
}