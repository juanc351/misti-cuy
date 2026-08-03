"use client";

import type { UseCatalogReturn } from "../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../types/catalog.types";

interface CatalogCategorySelectorProps {
  catalog: UseCatalogReturn;
}

const categories = [
  {
    id: CatalogCategoryType.REPRODUCTOR,
    label: "Reproductores",
  },
  {
    id: CatalogCategoryType.CONSUMO,
    label: "Consumo",
  },
];

export default function CatalogCategorySelector({
  catalog,
}: CatalogCategorySelectorProps) {
  const { filters, actions } = catalog;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Categoría
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Selecciona el tipo de cuyes que deseas consultar.
        </p>
      </div>

      <div className="flex rounded-xl border border-slate-300 bg-slate-100 p-1">
        {categories.map((category) => {
          const active = filters.selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => actions.setCategory(category.id)}
              className={`flex-1 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}