import type { CuyInventoryItem } from "../data/cuy.inventory";

import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
} from "./cuy.types";

export interface CuyFilters {
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

export interface CuyActions {
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

export interface CuyData {
  products: CuyProduct[];

  categories: CuyCategory[];

  variants: CuyVariant[];

  cities: CuyCity[];

  /**
   * Fuente central de disponibilidad.
   *
   * Contiene cantidades, estado, peso,
   * presentación, ciudad y fecha de actualización.
   */
  inventory: CuyInventoryItem[];
}

export interface UseCuyReturn {
  data: CuyData;

  loading: boolean;

  error: string | null;

  filters: CuyFilters;

  actions: CuyActions;
}