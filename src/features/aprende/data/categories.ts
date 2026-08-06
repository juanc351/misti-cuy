import type { LearnCategory } from "../types/learn.types";

export const categories: LearnCategory[] = [
  {
    id: "alimentacion",
    name: "Alimentación",
    slug: "alimentacion",
    description:
      "Nutrición y alimentación de cuyes.",
    icon: "leaf",
    cover: {
      url: "/images/categories/alimentacion.jpg",
      alt: "Alimentación de cuyes",
    },
  },

  {
    id: "genetica",
    name: "Genética",
    slug: "genetica",
    description:
      "Selección y mejoramiento genético.",
    icon: "dna",
    cover: {
      url: "/images/categories/genetica.jpg",
      alt: "Genética de cuyes",
    },
  },

  {
    id: "reproduccion",
    name: "Reproducción",
    slug: "reproduccion",
    description:
      "Empadre, gestación y lactancia.",
    icon: "heart",
    cover: {
      url: "/images/categories/reproduccion.jpg",
      alt: "Reproducción de cuyes",
    },
  },

  {
    id: "infraestructura",
    name: "Infraestructura",
    slug: "infraestructura",
    description:
      "Galpones, jaulas y equipos.",
    icon: "building",
    cover: {
      url: "/images/categories/infraestructura.jpg",
      alt: "Infraestructura",
    },
  },

  {
    id: "sanidad",
    name: "Sanidad",
    slug: "sanidad",
    description:
      "Prevención y control de enfermedades.",
    icon: "shield",
    cover: {
      url: "/images/categories/sanidad.jpg",
      alt: "Sanidad de cuyes",
    },
  },

  {
    id: "forrajes",
    name: "Forrajes",
    slug: "forrajes",
    description:
      "Producción de alimento verde.",
    icon: "sprout",
    cover: {
      url: "/images/categories/forrajes.jpg",
      alt: "Forrajes",
    },
  },

  {
    id: "manejo",
    name: "Manejo",
    slug: "manejo",
    description:
      "Buenas prácticas de manejo.",
    icon: "clipboard",
    cover: {
      url: "/images/categories/manejo.jpg",
      alt: "Manejo de cuyes",
    },
  },

  {
    id: "economia",
    name: "Economía",
    slug: "economia",
    description:
      "Costos, rentabilidad y comercialización.",
    icon: "chart-line",
    cover: {
      url: "/images/categories/economia.jpg",
      alt: "Economía de cuyes",
    },
  },
];