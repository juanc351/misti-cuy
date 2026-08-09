"use client";

import type { UseCuyReturn } from "../../types/cuy.hook.types";

interface CuyCitySelectorProps {
  catalog: UseCuyReturn;
}

const cities = [
  {
    id: "city-arequipa",
    name: "Arequipa",
  },
  {
    id: "city-lima",
    name: "Lima",
  },
  {
    id: "city-cusco",
    name: "Cusco",
  },
];

export default function CuyCitySelector({
  catalog,
}: CuyCitySelectorProps) {
  const { filters, actions } = catalog;

  return (
    <section className="bg-[#0D0D0D]">
      {/* =====================================
          ENCABEZADO
      ====================================== */}

      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-[#F5F5F5]">
          Ciudad
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Selecciona la ciudad donde deseas consultar disponibilidad.
        </p>
      </div>

      {/* =====================================
          SELECTOR DE CIUDAD
      ====================================== */}

      <select
        className="
          w-full
          rounded-xl
          border
          border-[#292929]
          bg-[#11110F]
          px-4
          py-3
          text-[#F5F5F5]
          outline-none
          transition
          focus:border-[#5FAF32]
          focus:ring-2
          focus:ring-[#5FAF32]/20
        "
        value={filters.selectedCity ?? ""}
        onChange={(event) =>
          actions.setCity(event.target.value || null)
        }
      >
        {cities.map((city) => (
          <option
            key={city.id}
            value={city.id}
            className="bg-[#11110F] text-[#F5F5F5]"
          >
            {city.name}
          </option>
        ))}
      </select>
    </section>
  );
}