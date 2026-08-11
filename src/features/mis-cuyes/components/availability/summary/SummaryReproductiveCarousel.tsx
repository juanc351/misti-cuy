"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";

import type { ReproductorPublication } from "../../../publications/types/publication.types";

/* ================================================================
   PROPS
   ================================================================ */

interface SummaryReproductiveCarouselProps {
  catalog: UseCuyReturn;
}

/* ================================================================
   IMÁGENES OFICIALES
   ================================================================ */

const variantImages: Record<string, string> = {
  Kuri: "/images/mis-cuyes/consumo/cabeza-kuri.png",
  Perú: "/images/mis-cuyes/consumo/cabeza-peru.png",
  Inti: "/images/mis-cuyes/consumo/cabeza-inti.png",
  Andina: "/images/mis-cuyes/consumo/cabeza-andina.png",
};

/* ================================================================
   ORDEN OFICIAL
   ================================================================ */

const allowedVariants = [
  "Kuri",
  "Perú",
  "Inti",
  "Andina",
];

/* ================================================================
   COMPONENTE
   ================================================================ */

export default function SummaryReproductiveCarousel({
  catalog,
}: SummaryReproductiveCarouselProps) {
  const {
    data: {
      publications,
      variants,
    },
    filters,
    actions,
  } = catalog;

  /* ================================================================
     REFERENCIA DEL CARRUSEL
     ================================================================ */

  const carouselRef =
    useRef<HTMLDivElement | null>(null);

  /* ================================================================
     PUBLICACIONES DE REPRODUCTORES
     
     Solo:
     
     - type = REPRODUCTOR
     - status = DISPONIBLE
     
     El type predicate le indica a TypeScript que
     después del filtro todas son ReproductorPublication.
     ================================================================ */

  const reproductivePublications =
    publications.filter(
      (
        publication
      ): publication is ReproductorPublication =>
        publication.type === "REPRODUCTOR" &&
        publication.status === "DISPONIBLE"
    );

  /* ================================================================
     AGRUPAR PUBLICACIONES POR RAZA / LÍNEA
     
     Ejemplo:

     Perú → 3
     Perú → 5
     Perú → 2

     Resultado:

     Perú → 10
     ================================================================ */

  const groupedByBreed =
    reproductivePublications.reduce(
      (groups, publication) => {
        const breed =
          publication.breed.trim();

        const current =
          groups.get(breed) ?? 0;

        groups.set(
          breed,
          current + publication.quantity
        );

        return groups;
      },
      new Map<string, number>()
    );

  /* ================================================================
     CONSTRUIR TARJETAS
     ================================================================ */

  const cards = allowedVariants
    .map((allowedName) => {
      const total =
        groupedByBreed.get(
          allowedName
        );

      if (
        total === undefined ||
        total <= 0
      ) {
        return null;
      }

      const variant =
        variants.find(
          (item) =>
            item.name === allowedName
        );

      return {
        id:
          variant?.id ??
          `breed-${allowedName}`,

        name: allowedName,

        image:
          variantImages[allowedName] ??
          "/images/mis-cuyes/consumo/cabeza-linea.png",

        total,
      };
    })
    .filter(
      (
        card
      ): card is {
        id: string;
        name: string;
        image: string;
        total: number;
      } => card !== null
    );

  /* ================================================================
     MOVIMIENTO DEL CARRUSEL
     ================================================================ */

  const scroll = (
    direction: "left" | "right"
  ) => {
    carouselRef.current?.scrollBy({
      left:
        direction === "left"
          ? -320
          : 320,
      behavior: "smooth",
    });
  };

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <section>
      {/* ==========================================================
          ENCABEZADO
      ========================================================== */}

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-[#F5F5F5]">
          Resumen de disponibilidad por línea genética
        </h2>

        <p className="mt-1 text-xs text-[#B8B8B8]">
          Disponibilidad total agrupada por línea.
        </p>
      </div>

      {/* ==========================================================
          SLIDER
      ========================================================== */}

      <div
        className="
          relative
          w-full
          max-w-full
          overflow-hidden
          px-12
        "
      >
        {/* ========================================================
            FLECHA IZQUIERDA
        ======================================================== */}

        <button
          type="button"
          aria-label="Ver líneas anteriores"
          onClick={() =>
            scroll("left")
          }
          className="
            absolute
            left-2
            top-1/2
            z-20
            hidden
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#292929]
            bg-[#0D0D0D]
            text-[#B8B8B8]
            shadow-sm
            transition-all
            hover:border-[#5FAF32]
            hover:text-[#5FAF32]
            md:flex
          "
        >
          <ChevronLeft size={18} />
        </button>

        {/* ========================================================
            CONTENEDOR HORIZONTAL
        ======================================================== */}

        <div
          ref={carouselRef}
          className="
            flex
            w-full
            max-w-full
            gap-1
            overflow-x-auto
            overflow-y-hidden
            scroll-smooth
            px-1
            pb-1
            scrollbar-none
          "
        >
          {cards.length > 0 ? (
            cards.map((card) => {
              const active =
                filters.selectedVariant ===
                card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() =>
                    actions.setVariant(
                      active
                        ? null
                        : card.id
                    )
                  }
                  className={`
                    group
                    flex
                    h-[82px]
                    w-max
                    shrink-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    text-left
                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          border-[#5FAF32]
                          bg-[#0D0D0D]
                          ring-1
                          ring-[#5FAF32]/30
                          shadow-sm
                        `
                        : `
                          border-[#292929]
                          bg-[#0D0D0D]
                          hover:border-[#5FAF32]/60
                          hover:bg-[#5FAF32]/10
                        `
                    }
                  `}
                >
                  {/* ==================================================
                      IMAGEN
                  ================================================== */}

                  <div
                    className="
                      relative
                      h-14
                      w-14
                      shrink-0
                      overflow-hidden
                      rounded-lg
                      bg-[#11110F]
                    "
                  >
                    <Image
                      src={card.image}
                      alt={`Cuy ${card.name}`}
                      fill
                      sizes="56px"
                      className="
                        object-contain
                        transition-transform
                        duration-200
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* ==================================================
                      INFORMACIÓN
                  ================================================== */}

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-[#F5F5F5]
                      "
                    >
                      {card.name}
                    </h3>

                    <p
                      className="
                        mt-0.5
                        text-2xl
                        font-bold
                        leading-none
                        text-[#5FAF32]
                      "
                    >
                      {card.total}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        text-[#B8B8B8]
                      "
                    >
                      disponibles
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <div
              className="
                flex
                min-h-[82px]
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-[#292929]
                bg-[#0D0D0D]
                text-sm
                text-[#777777]
              "
            >
              No hay reproductores disponibles.
            </div>
          )}
        </div>

        {/* ========================================================
            FLECHA DERECHA
        ======================================================== */}

        <button
          type="button"
          aria-label="Ver siguientes líneas"
          onClick={() =>
            scroll("right")
          }
          className="
            absolute
            right-2
            top-1/2
            z-20
            hidden
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#292929]
            bg-[#0D0D0D]
            text-[#B8B8B8]
            shadow-sm
            transition-all
            hover:border-[#5FAF32]
            hover:text-[#5FAF32]
            md:flex
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}