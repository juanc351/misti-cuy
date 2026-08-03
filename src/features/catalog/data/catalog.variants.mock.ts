import type { CatalogVariant } from "../types/catalog.types";

import { CatalogVariantType } from "../types/catalog.types";

export const catalogVariants: CatalogVariant[] = [
  {
    id: "variant-peru",
    name: "Perú",
    type: CatalogVariantType.RAZA,
    isActive: true,
    order: 1,
  },
  {
    id: "variant-andina",
    name: "Andina",
    type: CatalogVariantType.RAZA,
    isActive: true,
    order: 2,
  },
  {
    id: "variant-inti",
    name: "Inti",
    type: CatalogVariantType.RAZA,
    isActive: true,
    order: 3,
  },
  {
    id: "variant-kuri",
    name: "Kuri",
    type: CatalogVariantType.RAZA,
    isActive: true,
    order: 4,
  },
  {
    id: "variant-mantaro",
    name: "Mantaro",
    type: CatalogVariantType.LINEA,
    isActive: true,
    order: 5,
  },
  {
    id: "variant-hibrido-misti",
    name: "Híbrido Misti",
    type: CatalogVariantType.HIBRIDO,
    isActive: true,
    order: 6,
  },
];