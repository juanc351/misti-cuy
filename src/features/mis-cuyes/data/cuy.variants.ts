import type { CuyVariant } from "../types/cuy.types";
import { CuyVariantType } from "../types/cuy.types";

export const cuyVariants: CuyVariant[] = [
  {
    id: "variant-peru",
    name: "Perú",
    type: CuyVariantType.RAZA,
    isActive: true,
    order: 1,
  },

  {
    id: "variant-andina",
    name: "Andina",
    type: CuyVariantType.RAZA,
    isActive: true,
    order: 2,
  },

  {
    id: "variant-inti",
    name: "Inti",
    type: CuyVariantType.RAZA,
    isActive: true,
    order: 3,
  },

  {
    id: "variant-kuri",
    name: "Kuri",
    type: CuyVariantType.RAZA,
    isActive: true,
    order: 4,
  },

  {
    id: "variant-mantaro",
    name: "Mantaro",
    type: CuyVariantType.LINEA,
    isActive: true,
    order: 5,
  },

  {
    id: "variant-hibrido-misti",
    name: "Híbrido Misti",
    type: CuyVariantType.HIBRIDO,
    isActive: true,
    order: 6,
  },

  {
    id: "variant-consumo",
    name: "Consumo",
    type: CuyVariantType.HIBRIDO,
    isActive: true,
    order: 7,
  },
];