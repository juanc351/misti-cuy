import type { LearnArticle } from "../types/learn.types";

export const articles: LearnArticle[] = [
  {
    id: "001",

    slug: "como-construir-un-galpon",

    title: "Cómo construir un galpón para cuyes",

    summary:
      "Guía completa para diseñar un galpón tecnificado para la crianza de cuyes.",

    cover: {
      url: "/images/aprende/galpon.jpg",
      alt: "Cómo construir un galpón para cuyes",
    },

    blocks: [
      {
        id: "1",
        type: "heading",
        content: "Introducción",
      },
      {
        id: "2",
        type: "paragraph",
        content:
          "Este es un artículo de prueba para validar el nuevo motor de Aprende.",
      },
      {
        id: "3",
        type: "image",
        content: {
          url: "/images/aprende/galpon.jpg",
          alt: "Galpón",
        },
      },
      {
        id: "4",
        type: "paragraph",
        content:
          "Más adelante este contenido será creado desde el panel administrador.",
      },
    ],

    categoryId: "infraestructura",

    subcategoryId: "galpones",

    readingTime: 8,

    publishedAt: "2026-08-05",

    updatedAt: "2026-08-05",

    featured: true,

    tags: [],

    references: [],

    history: [],

    relatedArticles: ["002", "003"],
  },

  {
    id: "002",

    slug: "alimentacion-en-crecimiento",

    title: "Alimentación en cuyes de crecimiento",

    summary:
      "Requerimientos nutricionales para maximizar la ganancia de peso.",

    cover: {
      url: "/images/aprende/alimentacion.jpg",
      alt: "Alimentación",
    },

    blocks: [
      {
        id: "1",
        type: "heading",
        content: "Introducción",
      },
      {
        id: "2",
        type: "paragraph",
        content:
          "Artículo de prueba para validar diferentes bloques.",
      },
    ],

    categoryId: "alimentacion",

    subcategoryId: "nutricion",

    readingTime: 6,

    publishedAt: "2026-08-05",

    updatedAt: "2026-08-05",

    featured: false,

    tags: [],

    references: [],

    history: [],

    relatedArticles: ["001", "003"],
  },

  {
    id: "003",

    slug: "bioseguridad",

    title: "Bioseguridad en granjas de cuyes",

    summary:
      "Medidas preventivas para reducir enfermedades en la producción.",

    cover: {
      url: "/images/aprende/bioseguridad.jpg",
      alt: "Bioseguridad",
    },

    blocks: [
      {
        id: "1",
        type: "heading",
        content: "Bioseguridad",
      },
      {
        id: "2",
        type: "paragraph",
        content:
          "Artículo de prueba para el nuevo visor de Aprende.",
      },
    ],

    categoryId: "sanidad",

    subcategoryId: "bioseguridad",

    readingTime: 5,

    publishedAt: "2026-08-05",

    updatedAt: "2026-08-05",

    featured: false,

    tags: [],

    references: [],

    history: [],

    relatedArticles: ["001", "002"],
  },
];