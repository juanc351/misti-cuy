import type {
  CatalogCategory,
  CatalogCity,
  CatalogProduct,
  CatalogVariant,
} from "../types/catalog.types";

import type { CatalogInventoryItem } from "../data/catalog.inventory.mock";

import { catalogCategories } from "../data/catalog.categories.mock";
import { catalogVariants } from "../data/catalog.variants.mock";
import { catalogCities } from "../data/catalog.cities.mock";
import { catalogProducts } from "../data/catalog.products.mock";
import { catalogInventory } from "../data/catalog.inventory.mock";

/**
 * ============================================================================
 * Catalog Service
 * ----------------------------------------------------------------------------
 * Responsable de obtener la información del módulo Catalog.
 *
 * Actualmente obtiene los datos desde archivos Mock.
 *
 * En el futuro esta implementación será reemplazada por llamadas
 * al Backend sin modificar los componentes.
 * ============================================================================
 */
class CatalogService {
  /**
   * Obtiene todas las categorías.
   */
  getCatalogCategories(): CatalogCategory[] {
    return catalogCategories;
  }

  /**
   * Obtiene todas las variedades.
   */
  getCatalogVariants(): CatalogVariant[] {
    return catalogVariants;
  }

  /**
   * Obtiene todas las ciudades.
   */
  getCatalogCities(): CatalogCity[] {
    return catalogCities;
  }

  /**
   * Obtiene el inventario del catálogo.
   */
  getCatalogInventory(): CatalogInventoryItem[] {
    return catalogInventory;
  }

  /**
   * Obtiene todos los productos publicados.
   */
  getCatalogProducts(): CatalogProduct[] {
    return catalogProducts;
  }

  /**
   * Obtiene un producto por su ID.
   */
  getCatalogProductById(id: string): CatalogProduct | null {
    return (
      catalogProducts.find((product) => product.id === id) ?? null
    );
  }
}

/**
 * Instancia única del servicio.
 */
export const catalogService = new CatalogService();