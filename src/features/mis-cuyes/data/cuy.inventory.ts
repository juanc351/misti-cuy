import {
  CuyAvailabilityStatus,
  CuyCategoryType,
} from "../types/cuy.types";

export interface CuyInventoryItem {
  id: string;

  category: CuyCategoryType;

  variantId: string;

  cityId: string;

  status: CuyAvailabilityStatus;

  /**
   * Solo reproductores.
   */
  ageRange?: string;

  /**
   * Solo consumo.
   * Peso promedio en gramos.
   */
  averageWeight?: number;

  /**
   * Presentación comercial.
   *
   * Ejemplos:
   * 500 g
   * 700 g
   * 900 g
   * 1 kg
   * 1.2 kg
   */
  presentation?: string;

  /**
   * Solo reproductores.
   */
  males?: number;

  /**
   * Solo reproductores.
   */
  females?: number;

  /**
   * Solo consumo.
   */
  quantity?: number;

  updatedAt: string;
}

export const cuyInventory: CuyInventoryItem[] = [
  // ======================================================
  // REPRODUCTORES
  // ======================================================

  {
    id: "inventory-001",
    category: CuyCategoryType.REPRODUCTOR,
    variantId: "variant-peru",
    cityId: "city-arequipa",
    status: CuyAvailabilityStatus.DISPONIBLE,
    males: 12,
    females: 16,
    ageRange: "4 - 5 meses",
    updatedAt: "Hoy",
  },

  {
    id: "inventory-002",
    category: CuyCategoryType.REPRODUCTOR,
    variantId: "variant-andina",
    cityId: "city-arequipa",
    status: CuyAvailabilityStatus.DISPONIBLE,
    males: 8,
    females: 10,
    ageRange: "4 - 5 meses",
    updatedAt: "Hoy",
  },

  {
    id: "inventory-003",
    category: CuyCategoryType.REPRODUCTOR,
    variantId: "variant-inti",
    cityId: "city-arequipa",
    status: CuyAvailabilityStatus.DISPONIBLE,
    males: 6,
    females: 9,
    ageRange: "4 - 5 meses",
    updatedAt: "Hoy",
  },

  // ======================================================
  // CONSUMO
  // ======================================================

  {
    id: "inventory-101",
    category: CuyCategoryType.CONSUMO,
    variantId: "variant-peru",
    cityId: "city-arequipa",
    status: CuyAvailabilityStatus.DISPONIBLE,
    quantity: 85,
    averageWeight: 900,
    presentation: "900 g",
    updatedAt: "Hoy",
  },

  {
    id: "inventory-102",
    category: CuyCategoryType.CONSUMO,
    variantId: "variant-andina",
    cityId: "city-arequipa",
    status: CuyAvailabilityStatus.DISPONIBLE,
    quantity: 52,
    averageWeight: 1000,
    presentation: "1 kg",
    updatedAt: "Hoy",
  },

  {
    id: "inventory-103",
    category: CuyCategoryType.CONSUMO,
    variantId: "variant-inti",
    cityId: "city-arequipa",
    status: CuyAvailabilityStatus.DISPONIBLE,
    quantity: 36,
    averageWeight: 1200,
    presentation: "1.2 kg",
    updatedAt: "Hoy",
  },
];