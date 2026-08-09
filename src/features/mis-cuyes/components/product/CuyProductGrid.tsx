"use client";

import type { UseCuyReturn } from "../../types/cuy.hook.types";
import { CuyCategoryType } from "../../types/cuy.types";

interface CuyProductGridProps {
  catalog: UseCuyReturn;
}

export default function CuyProductGrid({
  catalog,
}: CuyProductGridProps) {
  const {
    data: { inventory, variants, cities },
    filters,
  } = catalog;

  const isConsumption =
    filters.selectedCategory === CuyCategoryType.CONSUMO;

  const city = cities.find(
    (city) => city.id === filters.selectedCity
  );

  // ==========================================================
  // CONSUMO
  // Busca por PRESENTACIÓN
  // ==========================================================

  const consumptionItem = inventory.find(
    (item) =>
      item.category === CuyCategoryType.CONSUMO &&
      item.cityId === filters.selectedCity &&
      item.presentation === filters.selectedPresentation
  );

  // ==========================================================
  // REPRODUCTORES
  // Busca por VARIEDAD
  // ==========================================================

  const selectedVariant =
    filters.selectedVariant ??
    inventory.find(
      (item) =>
        item.category === CuyCategoryType.REPRODUCTOR &&
        item.cityId === filters.selectedCity
    )?.variantId;

  const reproductiveItem = inventory.find(
    (item) =>
      item.category === CuyCategoryType.REPRODUCTOR &&
      item.cityId === filters.selectedCity &&
      item.variantId === selectedVariant
  );

  const variant = variants.find(
    (variant) => variant.id === selectedVariant
  );

  const item = isConsumption
    ? consumptionItem
    : reproductiveItem;

  // ==========================================================
  // SIN DISPONIBILIDAD
  // ==========================================================

  if (!item) {
    return (
      <section className="bg-[#0D0D0D] p-4 md:p-6">
        <div
          className="
            rounded-xl
            border
            border-[#292929]
            bg-[#11110F]
            p-5
            text-sm
            text-[#B8B8B8]
          "
        >
          No existe disponibilidad para la selección actual.
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        bg-[#0D0D0D]
        text-[#F5F5F5]
      "
    >
      {/* ======================================================
          ENCABEZADO
      ====================================================== */}

      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-[#F5F5F5]">
          Ejemplares Disponibles
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Disponibilidad actual según la selección realizada.
        </p>
      </div>

      {/* ======================================================
          PRODUCTOS
      ====================================================== */}

      <div className="space-y-3 p-4 md:space-y-4 md:p-6">
        {isConsumption ? (
          <ProductCard
            title={item.presentation ?? "-"}
            quantity={`${item.quantity ?? 0} disponibles`}
            detail1={`Peso promedio: ${
              item.averageWeight ?? "-"
            } g`}
            detail2={`Ubicación: ${
              city?.district ?? "-"
            }, ${city?.name ?? "-"}`}
          />
        ) : (
          <>
            <ProductCard
              title="Machos Reproductores"
              quantity={`${item.males ?? 0} disponibles`}
              detail1={`Edad: ${
                item.ageRange ?? "-"
              }`}
              detail2={`Línea: ${
                variant?.name ?? "-"
              }`}
            />

            <ProductCard
              title="Hembras Reproductoras"
              quantity={`${item.females ?? 0} disponibles`}
              detail1={`Edad: ${
                item.ageRange ?? "-"
              }`}
              detail2={`Línea: ${
                variant?.name ?? "-"
              }`}
            />
          </>
        )}
      </div>
    </section>
  );
}

// ==========================================================
// TARJETA DE PRODUCTO
// ==========================================================

interface ProductCardProps {
  title: string;
  quantity: string;
  detail1: string;
  detail2: string;
}

function ProductCard({
  title,
  quantity,
  detail1,
  detail2,
}: ProductCardProps) {
  return (
    <article
      className="
        rounded-xl
        border
        border-[#292929]
        bg-[#11110F]
        p-4
        transition-colors
        duration-200
        hover:border-[#5FAF32]/50
        md:p-5
      "
    >
      {/* ==================================================
          TÍTULO
      ================================================== */}

      <h3 className="text-base font-semibold text-[#F5F5F5]">
        {title}
      </h3>

      {/* ==================================================
          CANTIDAD
      ================================================== */}

      <p
        className="
          mt-2
          text-2xl
          font-bold
          text-[#5FAF32]
        "
      >
        {quantity}
      </p>

      {/* ==================================================
          DETALLES
      ================================================== */}

      <div
        className="
          mt-4
          space-y-1
          text-sm
          text-[#B8B8B8]
        "
      >
        <p>{detail1}</p>
        <p>{detail2}</p>
      </div>

      {/* ==================================================
          BOTÓN
      ================================================== */}

      <button
        type="button"
        className="
          mt-5
          w-full
          rounded-xl
          bg-[#5FAF32]
          px-4
          py-3
          font-semibold
          text-white
          transition-colors
          duration-200
          hover:bg-[#4D9F25]
        "
      >
        Consultar disponibilidad
      </button>
    </article>
  );
}