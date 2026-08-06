import type { LearnSubcategory } from "../types/learn.types";

export const subcategories: LearnSubcategory[] = [

  // Alimentación
  {
    id: "nutricion",
    categoryId: "alimentacion",
    name: "Nutrición",
    slug: "nutricion",
    description: "Principios nutricionales.",
  },
  {
    id: "forraje-verde",
    categoryId: "alimentacion",
    name: "Forraje Verde",
    slug: "forraje-verde",
    description: "Alimentación con forrajes.",
  },
  {
    id: "balanceados",
    categoryId: "alimentacion",
    name: "Balanceados",
    slug: "balanceados",
    description: "Concentrados y formulaciones.",
  },

  // Genética
  {
    id: "razas",
    categoryId: "genetica",
    name: "Razas",
    slug: "razas",
    description: "Características de las razas.",
  },
  {
    id: "seleccion",
    categoryId: "genetica",
    name: "Selección",
    slug: "seleccion",
    description: "Mejoramiento genético.",
  },

  // Reproducción
  {
    id: "empadre",
    categoryId: "reproduccion",
    name: "Empadre",
    slug: "empadre",
    description: "Manejo reproductivo.",
  },
  {
    id: "gestacion",
    categoryId: "reproduccion",
    name: "Gestación",
    slug: "gestacion",
    description: "Cuidados durante la gestación.",
  },

  // Infraestructura
  {
    id: "galpones",
    categoryId: "infraestructura",
    name: "Galpones",
    slug: "galpones",
    description: "Construcción de galpones.",
  },
  {
    id: "jaulas",
    categoryId: "infraestructura",
    name: "Jaulas",
    slug: "jaulas",
    description: "Tipos de jaulas.",
  },

  // Sanidad
  {
    id: "enfermedades",
    categoryId: "sanidad",
    name: "Enfermedades",
    slug: "enfermedades",
    description: "Enfermedades frecuentes.",
  },
  {
    id: "bioseguridad",
    categoryId: "sanidad",
    name: "Bioseguridad",
    slug: "bioseguridad",
    description: "Prevención y control.",
  },

  // Forrajes
  {
    id: "alfalfa",
    categoryId: "forrajes",
    name: "Alfalfa",
    slug: "alfalfa",
    description: "Producción de alfalfa.",
  },
  {
    id: "cultivos",
    categoryId: "forrajes",
    name: "Cultivos",
    slug: "cultivos",
    description: "Cultivos para alimentación.",
  },

  // Manejo
  {
    id: "registros",
    categoryId: "manejo",
    name: "Registros",
    slug: "registros",
    description: "Control productivo.",
  },
  {
    id: "bienestar",
    categoryId: "manejo",
    name: "Bienestar Animal",
    slug: "bienestar-animal",
    description: "Buenas prácticas.",
  },

  // Economía
  {
    id: "costos",
    categoryId: "economia",
    name: "Costos",
    slug: "costos",
    description: "Costos de producción.",
  },
  {
    id: "comercializacion",
    categoryId: "economia",
    name: "Comercialización",
    slug: "comercializacion",
    description: "Venta y mercado.",
  },
];