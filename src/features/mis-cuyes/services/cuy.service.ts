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
 * Cuy Service
 * ----------------------------------------------------------------------------
 * Responsable de obtener la información del módulo Mis Cuyes.
 *
 * Actualmente obtiene los datos desde archivos Mock.
 *
 * En el futuro esta implementación será reemplazada por llamadas
 * al Backend sin modificar los componentes.
 * ============================================================================
 */
class CuyService {
  /**
   * Obtiene todas las categorías.
   */
  getCuyCategories(): CuyCategory[] {
    return cuyCategories;
  }

  /**
   * Obtiene todas las variedades.
   */
  getCuyVariants(): CuyVariant[] {
    return cuyVariants;
  }

  /**
   * Obtiene todas las ciudades.
   */
  getCuyCities(): CuyCity[] {
    return cuyCities;
  }

  /**
   * Obtiene el inventario.
   */
  getCuyInventory(): CuyInventoryItem[] {
    return cuyInventory;
  }

  /**
   * Obtiene todos los productos publicados.
   */
  getCuyProducts(): CuyProduct[] {
    return cuyProducts;
  }

  /**
   * Obtiene un producto por su ID.
   */
  getCuyProductById(id: string): CuyProduct | null {
    return (
      cuyProducts.find((product) => product.id === id) ?? null
    );
  }
}

/**
 * Instancia única del servicio.
 */
export const cuyService = new CuyService();