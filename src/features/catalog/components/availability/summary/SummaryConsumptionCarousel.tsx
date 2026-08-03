"use client";

import type { UseCatalogReturn } from "../../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../../types/catalog.types";

interface SummaryConsumptionCarouselProps {
  catalog: UseCatalogReturn;
}

export default function SummaryConsumptionCarousel({
  catalog,
}: SummaryConsumptionCarouselProps) {
  const {
    data: { inventory, variants },
    filters,
    actions,
  } = catalog;

  const cards = inventory
    .filter(
      (item) =>
        item.category === CatalogCategoryType.CONSUMO &&
        item.cityId === filters.selectedCity,
    )
    .map((item) => {
      const variant = variants.find(
        (v) => v.id === item.variantId,
      );

      return {
        id: item.id,
        presentation:
          item.presentation ??
          `${item.averageWeight ?? "-"} g`,
        image:
          variant?.image ??
          `https://placehold.co/600x500?text=${encodeURIComponent(
            item.presentation ?? "Cuy",
          )}`,
        total: item.quantity ?? 0,
      };
    });

  return (
    <section>
      <div className="flex gap-6 overflow-x-auto pb-3">
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
              className={`min-w-[220px] overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                active
                  ? "border-emerald-600 ring-2 ring-emerald-200 shadow-lg"
                  : "border-slate-200 hover:border-emerald-300 hover:shadow-md"
              }`}
            >
              <img
                src={card.image}
                alt={card.presentation}
                className="h-52 w-full object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-slate-900">
                  {card.presentation}
                </h3>

                <p className="mt-3 text-3xl font-bold text-emerald-600">
                  {card.total}
                </p>

                <p className="text-sm text-slate-500">
                  disponibles
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}