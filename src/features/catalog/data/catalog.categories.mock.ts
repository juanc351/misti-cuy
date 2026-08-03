import type { CatalogCategory } from "../types/catalog.types";

import { CatalogCategoryType } from "../types/catalog.types";

export const catalogCategories: CatalogCategory[] = [
  {
    id: "category-reproductores",
    name: "Reproductores",
    type: CatalogCategoryType.REPRODUCTOR,
    description: "Animales destinados a reproducción.",
    isActive: true,
    order: 1,
  },
  {
    id: "category-consumo",
    name: "Consumo",
    type: CatalogCategoryType.CONSUMO,
    description: "Animales destinados al consumo.",
    isActive: true,
    order: 2,
  },
];