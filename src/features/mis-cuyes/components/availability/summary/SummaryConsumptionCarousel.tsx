"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";

interface SummaryConsumptionCarouselProps {
  catalog: UseCuyReturn;
}

/* ================================================================
   IMAGEN OFICIAL
   ================================================================ */

const consumptionImage =
  "/images/mis-cuyes/consumo/cabeza-linea.png";

/* ================================================================
   COMPONENTE
   ================================================================ */

export default function SummaryConsumptionCarousel({
  catalog,
}: SummaryConsumptionCarouselProps) {
  const {
    data: { publications },
    filters,
    actions,
  } = catalog;

  /* ================================================================
     REFERENCIA DEL CARRUSEL
     ================================================================ */

  const carouselRef =
    useRef<HTMLDivElement | null>(null);

  /* ================================================================
     PUBLICACIONES DE CONSUMO DISPONIBLES
     ================================================================ */

  const consumptionPublications =
    publications.filter(
      (
        publication
      ): publication is Extract<
        typeof publication,
        { type: "CONSUMO" }
      > =>
        publication.type === "CONSUMO" &&
        publication.status === "DISPONIBLE"
    );

  /* ================================================================
     AGRUPAR POR PESO
     
     EJEMPLO:

     900 g → 3
     900 g → 5
     900 g → 2

     RESULTADO:

     900 g → 10
     ================================================================ */

  const groupedByWeight =
    consumptionPublications.reduce(
      (
        groups,
        publication
      ) => {
        const weight =
          publication.weight;

        const current =
          groups.get(weight) ?? 0;

        groups.set(
          weight,
          current + publication.quantity
        );

        return groups;
      },
      new Map<number, number>()
    );

  /* ================================================================
     CONSTRUIR TARJETAS
     ================================================================ */

  const cards = Array.from(
    groupedByWeight.entries()
  )
    .sort(
      ([weightA], [weightB]) =>
        weightA - weightB
    )
    .map(
      ([weight, total]) => ({
        id: `consumo-${weight}`,

        presentation:
          `${weight} g`,

        weight,

        total,

        image:
          consumptionImage,
      })
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
          Resumen de disponibilidad para consumo
        </h2>

        <p className="mt-1 text-xs text-[#B8B8B8]">
          Disponibilidad total agrupada por peso.
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
          aria-label="Ver pesos anteriores"
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
            CONTENEDOR
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
                filters.selectedPresentation ===
                card.presentation;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() =>
                    actions.setPresentation(
                      active
                        ? null
                        : card.presentation
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
                      alt={`Cuy de ${card.presentation}`}
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
                      Consumo
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
                      {card.presentation}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        text-[#B8B8B8]
                      "
                    >
                      {card.total} disponibles
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
              No hay cuyes de consumo disponibles.
            </div>
          )}
        </div>

        {/* ========================================================
            FLECHA DERECHA
        ======================================================== */}

        <button
          type="button"
          aria-label="Ver siguientes pesos"
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