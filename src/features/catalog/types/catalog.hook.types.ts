import type { CatalogInventoryItem } from "../data/catalog.inventory.mock";
import type {
  CatalogCategory,
  CatalogCity,
  CatalogProduct,
  CatalogVariant,
} from "./catalog.types";

export interface CatalogFilters {
  selectedCategory: string | null;

  selectedCity: string | null;

  /**
   * Solo reproductores.
   */
  selectedVariant: string | null;

  /**
   * Solo consumo.
   */
  selectedPresentation: string | null;

  search: string;
}

export interface CatalogActions {
  setCategory: (id: string | null) => void;

  setCity: (id: string | null) => void;

  /**
   * Solo reproductores.
   */
  setVariant: (id: string | null) => void;

  /**
   * Solo consumo.
   */
  setPresentation: (value: string | null) => void;

  setSearch: (value: string) => void;

  clearFilters: () => void;
}

export interface CatalogData {
  products: CatalogProduct[];

  categories: CatalogCategory[];

  variants: CatalogVariant[];

  cities: CatalogCity[];

  inventory: CatalogInventoryItem[];
}

export interface UseCatalogReturn {
  data: CatalogData;

  loading: boolean;

  error: string | null;

  filters: CatalogFilters;

  actions: CatalogActions;
}