import type { LearnCategory } from "../types/learn.types";

export const categories: LearnCategory[] = [
  {
    id: "alimentacion",
    name: "Alimentación",
    slug: "alimentacion",
    description: "Nutrición y alimentación de cuyes.",
    icon: "leaf",
  },
  {
    id: "genetica",
    name: "Genética",
    slug: "genetica",
    description: "Selección y mejoramiento genético.",
    icon: "dna",
  },
  {
    id: "reproduccion",
    name: "Reproducción",
    slug: "reproduccion",
    description: "Empadre, gestación y lactancia.",
    icon: "heart",
  },
  {
    id: "infraestructura",
    name: "Infraestructura",
    slug: "infraestructura",
    description: "Galpones, jaulas y equipos.",
    icon: "building",
  },
  {
    id: "sanidad",
    name: "Sanidad",
    slug: "sanidad",
    description: "Prevención y control de enfermedades.",
    icon: "shield",
  },
  {
    id: "forrajes",
    name: "Forrajes",
    slug: "forrajes",
    description: "Producción de alimento verde.",
    icon: "sprout",
  },
  {
    id: "manejo",
    name: "Manejo",
    slug: "manejo",
    description: "Buenas prácticas de manejo.",
    icon: "clipboard",
  },
  {
    id: "economia",
    name: "Economía",
    slug: "economia",
    description: "Costos, rentabilidad y comercialización.",
    icon: "chart-line",
  },
];