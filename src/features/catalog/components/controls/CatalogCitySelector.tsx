"use client";

import type { UseCatalogReturn } from "../../types/catalog.hook.types";

interface CatalogCitySelectorProps {
  catalog: UseCatalogReturn;
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

export default function CatalogCitySelector({
  catalog,
}: CatalogCitySelectorProps) {
  const { filters, actions } = catalog;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Ciudad
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Selecciona la ciudad donde deseas consultar disponibilidad.
        </p>
      </div>

      <select
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-700
          outline-none
          transition
          focus:border-emerald-600
          focus:ring-2
          focus:ring-emerald-200
        "
        value={filters.selectedCity ?? ""}
        onChange={(event) => actions.setCity(event.target.value || null)}
      >
        {cities.map((city) => (
          <option
            key={city.id}
            value={city.id}
          >
            {city.name}
          </option>
        ))}
      </select>
    </section>
  );
}