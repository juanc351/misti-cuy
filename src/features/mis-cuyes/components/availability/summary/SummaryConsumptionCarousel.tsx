"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";
import { CuyCategoryType } from "../../../types/cuy.types";

interface SummaryConsumptionCarouselProps {
  catalog: UseCuyReturn;
}

/**
 * Imagen oficial para las tarjetas de consumo.
 *
 * La misma imagen se utiliza para las
 * diferentes presentaciones de engorde.
 */
const consumptionImage =
  "/images/mis-cuyes/consumo/cabeza-linea.png";

export default function SummaryConsumptionCarousel({
  catalog,
}: SummaryConsumptionCarouselProps) {
  const {
    data: { inventory, variants },
    filters,
    actions,
  } = catalog;

  /**
   * Referencia al contenedor horizontal.
   */
  const carouselRef =
    useRef<HTMLDivElement>(null);

  /**
   * Construcción de las tarjetas.
   *
   * Los datos de cantidad y presentación
   * vienen directamente del inventario.
   */
  const cards = inventory
    .filter(
      (item) =>
        item.category ===
          CuyCategoryType.CONSUMO &&
        item.cityId === filters.selectedCity,
    )
    .map((item) => {
      const variant = variants.find(
        (v) => v.id === item.variantId,
      );

      return {
        id: item.id,
        variantName: variant?.name ?? "Cuy",
        presentation:
          item.presentation ??
          `${item.averageWeight ?? "-"} g`,
        image: consumptionImage,
        total: item.quantity ?? 0,
      };
    });

  /**
   * Movimiento horizontal del slider.
   */
  const scroll = (
    direction: "left" | "right",
  ) => {
    carouselRef.current?.scrollBy({
      left:
        direction === "left"
          ? -320
          : 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        w-full
        max-w-full
        overflow-hidden
        rounded-2xl
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* =====================================
          ENCABEZADO
      ====================================== */}

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Resumen de disponibilidad para consumo
        </h2>
      </div>

      {/* =====================================
          SLIDER
      ====================================== */}

      <div
        className="
          relative
          w-full
          max-w-full
          overflow-hidden
          px-12
        "
      >
        {/* =====================================
            FLECHA IZQUIERDA
        ====================================== */}

        <button
          type="button"
          aria-label="Ver presentaciones anteriores"
          onClick={() => scroll("left")}
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
            border-slate-200
            bg-white
            text-slate-700
            shadow-sm
            transition-all
            hover:border-[#7CB342]
            hover:text-[#7CB342]
            md:flex
          "
        >
          <ChevronLeft size={18} />
        </button>

        {/* =====================================
            CONTENEDOR HORIZONTAL
        ====================================== */}

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
          {cards.map((card) => {
            const active =
              filters.selectedPresentation ===
              card.presentation;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() =>
                  actions.setPresentation(
                    card.presentation,
                  )
                }
                className={`
                  group
                  flex
                  h-[82px]
                  w-[250px]
                  shrink-0
                  items-center
                  gap-3
                  rounded-xl
                  border
                  bg-white
                  px-3
                  text-left
                  transition-all
                  duration-200
                  ${
                    active
                      ? "border-[#7CB342] ring-1 ring-[#7CB342]/30 shadow-sm"
                      : "border-slate-200 hover:border-[#7CB342]/50 hover:shadow-sm"
                  }
                `}
              >
                {/* =================================
                    IMAGEN
                ================================== */}

                <div
                  className="
                    relative
                    h-14
                    w-14
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    bg-slate-50
                  "
                >
                  <Image
                    src={card.image}
                    alt={`Cuy para consumo ${card.presentation}`}
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

                {/* =================================
                    INFORMACIÓN
                ================================== */}

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900">
                    {card.variantName}
                  </h3>

                  <p className="mt-0.5 text-2xl font-bold leading-none text-[#166534]">
                    {card.presentation}
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {card.total} disponibles
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* =====================================
            FLECHA DERECHA
        ====================================== */}

        <button
          type="button"
          aria-label="Ver siguientes presentaciones"
          onClick={() => scroll("right")}
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
            border-slate-200
            bg-white
            text-slate-700
            shadow-sm
            transition-all
            hover:border-[#7CB342]
            hover:text-[#7CB342]
            md:flex
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}