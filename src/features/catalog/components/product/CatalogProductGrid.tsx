"use client";

import type { UseCatalogReturn } from "../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../types/catalog.types";

interface CatalogProductGridProps {
  catalog: UseCatalogReturn;
}

export default function CatalogProductGrid({
  catalog,
}: CatalogProductGridProps) {
  const {
    data: { inventory, variants, cities },
    filters,
  } = catalog;

  const isConsumption =
    filters.selectedCategory === CatalogCategoryType.CONSUMO;

  const city = cities.find(
    (city) => city.id === filters.selectedCity
  );

  /**
   * ==========================================================
   * CONSUMO
   * Busca por PRESENTACIÓN
   * ==========================================================
   */
  const consumptionItem = inventory.find(
    (item) =>
      item.category === CatalogCategoryType.CONSUMO &&
      item.cityId === filters.selectedCity &&
      item.presentation === filters.selectedPresentation
  );

  /**
   * ==========================================================
   * REPRODUCTORES
   * Busca por VARIEDAD
   * ==========================================================
   */
  const selectedVariant =
    filters.selectedVariant ??
    inventory.find(
      (item) =>
        item.category === CatalogCategoryType.REPRODUCTOR &&
        item.cityId === filters.selectedCity
    )?.variantId;

  const reproductiveItem = inventory.find(
    (item) =>
      item.category === CatalogCategoryType.REPRODUCTOR &&
      item.cityId === filters.selectedCity &&
      item.variantId === selectedVariant
  );

  const variant = variants.find(
    (variant) => variant.id === selectedVariant
  );

  const item = isConsumption
    ? consumptionItem
    : reproductiveItem;

  if (!item) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 text-center text-slate-500">
          No existe disponibilidad para la selección actual.
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">
          Ejemplares Disponibles
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Disponibilidad actual según la selección realizada.
        </p>
      </div>

      <div className="space-y-4 p-6">
        {isConsumption ? (
          <ProductCard
            title={item.presentation ?? "-"}
            quantity={`${item.quantity ?? 0} disponibles`}
            detail1={`Peso promedio: ${
              item.averageWeight ?? "-"
            } g`}
            detail2={`Ubicación: ${city?.district ?? "-"}, ${
              city?.name ?? "-"
            }`}
          />
        ) : (
          <>
            <ProductCard
              title="Machos Reproductores"
              quantity={`${item.males ?? 0} disponibles`}
              detail1={`Edad: ${item.ageRange ?? "-"}`}
              detail2={`Línea: ${variant?.name ?? "-"}`}
            />

            <ProductCard
              title="Hembras Reproductoras"
              quantity={`${item.females ?? 0} disponibles`}
              detail1={`Edad: ${item.ageRange ?? "-"}`}
              detail2={`Línea: ${variant?.name ?? "-"}`}
            />
          </>
        )}
      </div>
    </section>
  );
}

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
    <article className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-2xl font-bold text-emerald-600">
        {quantity}
      </p>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p>{detail1}</p>
        <p>{detail2}</p>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Consultar disponibilidad
      </button>
    </article>
  );
}