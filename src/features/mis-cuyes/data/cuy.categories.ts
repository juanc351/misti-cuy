import type { CuyCategory } from "../types/cuy.types";

import { CuyCategoryType } from "../types/cuy.types";

export const cuyCategories: CuyCategory[] = [
  {
    id: "category-reproductores",
    name: "Reproductores",
    type: CuyCategoryType.REPRODUCTOR,
    description: "Animales destinados a reproducción.",
    isActive: true,
    order: 1,
  },
  {
    id: "category-consumo",
    name: "Consumo",
    type: CuyCategoryType.CONSUMO,
    description: "Animales destinados al consumo.",
    isActive: true,
    order: 2,
  },
];