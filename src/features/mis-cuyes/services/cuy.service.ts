import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
} from "../types/cuy.types";

import type { CuyInventoryItem } from "../data/cuy.inventory";

import { cuyCategories } from "../data/cuy.categories";
import { cuyVariants } from "../data/cuy.variants";
import { cuyCities } from "../data/cuy.cities";
import { cuyProducts } from "../data/cuy.products";
import { cuyInventory } from "../data/cuy.inventory";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Módulo:
 * Mis Cuyes
 *
 * Archivo:
 * cuy.service.ts
 *
 * Capa de acceso a datos del módulo Mis Cuyes.
 *
 * Actualmente utiliza datos Mock locales.
 *
 * La estructura del servicio está preparada para que posteriormente
 * la fuente de datos pueda ser reemplazada por Backend / Firebase
 * sin modificar los componentes visuales.
 *
 * ============================================================================
 *
 * ESTRATEGIA DE DATOS
 *
 * CATÁLOGOS — cambios poco frecuentes
 *
 * - categories
 * - variants
 * - cities
 * - products
 *
 * INVENTARIO — datos dinámicos
 *
 * - inventory
 *
 * El inventario es la única fuente central de disponibilidad.
 *
 * ============================================================================
 */

class CuyService {
  /* ========================================================================
     CATÁLOGOS
     ======================================================================== */

  /**
   * Obtiene todas las categorías.
   *
   * Datos de catálogo.
   */
  getCuyCategories(): CuyCategory[] {
    return cuyCategories;
  }

  /**
   * Obtiene todas las variedades o líneas.
   *
   * Datos de catálogo.
   */
  getCuyVariants(): CuyVariant[] {
    return cuyVariants;
  }

  /**
   * Obtiene todas las ciudades.
   *
   * Datos de catálogo.
   */
  getCuyCities(): CuyCity[] {
    return cuyCities;
  }

  /**
   * Obtiene todos los productos publicados.
   *
   * Datos de catálogo comercial.
   */
  getCuyProducts(): CuyProduct[] {
    return cuyProducts;
  }

  /**
   * Obtiene un producto por su ID.
   */
  getCuyProductById(id: string): CuyProduct | null {
    return (
      cuyProducts.find(
        (product) => product.id === id
      ) ?? null
    );
  }

  /* ========================================================================
     INVENTARIO
     ======================================================================== */

  /**
   * Obtiene el inventario central.
   *
   * Este es el único origen de información sobre disponibilidad.
   *
   * Contiene:
   *
   * - cantidad
   * - machos
   * - hembras
   * - peso
   * - presentación
   * - estado
   * - ciudad
   * - fecha de actualización
   */
  getCuyInventory(): CuyInventoryItem[] {
    return cuyInventory;
  }
}

/**
 * ============================================================================
 * INSTANCIA ÚNICA
 * ============================================================================
 */

export const cuyService = new CuyService();