import type { Story } from "../types/story.types";

export const stories: Story[] = [
  {
    id: 1,
    chapter: 1,
    title: "Todo comenzó con una pregunta.",
    description:
      "¿Era posible construir una granja de cuyes moderna desde cero y documentar cada paso del camino?",
    conclusion:
      "Ese día nació Misti Cuy.",
    image: "/images/story/chapter-01.webp",
    layout: "right",
    status: "published",
  },

  {
    id: 2,
    chapter: 2,
    title: "La planificación fue el primer desafío.",
    description:
      "Antes de construir, fue necesario estudiar, investigar y comprender cómo debía funcionar una granja tecnificada.",
    conclusion:
      "Cada decisión definiría el futuro del proyecto.",
    image: "/images/story/chapter-02.webp",
    layout: "left",
    status: "published",
  },

  {
    id: 3,
    chapter: 3,
    title: "Comenzamos a construir.",
    description:
      "Cada avance, por pequeño que fuera, representaba un paso más hacia el objetivo de crear una granja modelo.",
    conclusion:
      "La historia apenas comenzaba.",
    image: "/images/story/chapter-03.webp",
    layout: "right",
    status: "published",
  },

  {
    id: 4,
    chapter: 4,
    title: "El camino continúa.",
    description:
      "La historia de Misti Cuy seguirá creciendo capítulo tras capítulo junto con cada nuevo logro alcanzado.",
    conclusion:
      "Este no es el final, es solo el comienzo.",
    image: "/images/story/chapter-04.webp",
    layout: "left",
    status: "published",
  },
];