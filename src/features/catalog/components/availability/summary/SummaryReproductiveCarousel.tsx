"use client";

import type { UseCatalogReturn } from "../../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../../types/catalog.types";

interface SummaryReproductiveCarouselProps {
  catalog: UseCatalogReturn;
}

export default function SummaryReproductiveCarousel({
  catalog,
}: SummaryReproductiveCarouselProps) {
  const {
    data: { inventory, variants },
    filters,
    actions,
  } = catalog;

  const cards = inventory
    .filter(
      (item) =>
        item.category === CatalogCategoryType.REPRODUCTOR &&
        item.cityId === filters.selectedCity
    )
    .map((item) => {
      const variant = variants.find((v) => v.id === item.variantId);

      return {
        id: item.variantId,
        name: variant?.name ?? "-",
        image:
          variant?.image ??
          `https://placehold.co/600x500?text=${encodeURIComponent(
            variant?.name ?? "Cuy"
          )}`,
        total: (item.males ?? 0) + (item.females ?? 0),
      };
    });

  return (
    <section>
      <div className="flex gap-6 overflow-x-auto pb-3">
        {cards.map((card) => {
          const active = filters.selectedVariant === card.id;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => actions.setVariant(card.id)}
              className={`min-w-[220px] overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                active
                  ? "border-emerald-600 ring-2 ring-emerald-200 shadow-lg"
                  : "border-slate-200 hover:border-emerald-300 hover:shadow-md"
              }`}
            >
              <img
                src={card.image}
                alt={card.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-slate-900">
                  {card.name}
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