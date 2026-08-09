"use client";

import type { UseCuyReturn } from "../../types/cuy.hook.types";
import { CuyCategoryType } from "../../types/cuy.types";

interface CuyCategorySelectorProps {
  catalog: UseCuyReturn;
}

const categories = [
  {
    id: CuyCategoryType.REPRODUCTOR,
    label: "Reproductores",
  },
  {
    id: CuyCategoryType.CONSUMO,
    label: "Consumo",
  },
];

export default function CuyCategorySelector({
  catalog,
}: CuyCategorySelectorProps) {
  const { filters, actions } = catalog;

  return (
    <section className="bg-[#0D0D0D]">
      {/* =====================================
          ENCABEZADO
      ====================================== */}

      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-[#F5F5F5]">
          Categoría
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Selecciona el tipo de cuyes que deseas consultar.
        </p>
      </div>

      {/* =====================================
          SELECTOR
      ====================================== */}

      <div
        className="
          flex
          rounded-xl
          border
          border-[#292929]
          bg-[#11110F]
          p-1
        "
      >
        {categories.map((category) => {
          const active =
            filters.selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                actions.setCategory(category.id)
              }
              className={`
                flex-1
                rounded-lg
                px-5
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  active
                    ? "bg-[#5FAF32] text-white shadow-sm"
                    : "text-[#B8B8B8] hover:bg-[#5FAF32]/10 hover:text-[#F5F5F5]"
                }
              `}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}