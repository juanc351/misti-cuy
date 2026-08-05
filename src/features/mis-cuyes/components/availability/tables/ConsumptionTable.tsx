"use client";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";
import { CuyCategoryType } from "../../../types/cuy.types";

interface ConsumptionTableProps {
  catalog: UseCuyReturn;
}

export default function ConsumptionTable({
  catalog,
}: ConsumptionTableProps) {
  const {
    data: { inventory, variants, cities },
    filters,
  } = catalog;

  const rows = inventory
    .filter(
      (item) =>
        item.category === CuyCategoryType.CONSUMO &&
        item.cityId === filters.selectedCity
    )
    .map((item) => {
      const variant = variants.find(
        (variant) => variant.id === item.variantId
      );

      const city = cities.find(
        (city) => city.id === item.cityId
      );

      return {
        id: item.id,
        variety: variant?.name ?? "-",
        quantity: item.quantity ?? 0,
        weight: item.averageWeight
          ? `${item.averageWeight} g`
          : "-",
        age: item.ageRange ?? "-",
        city: city?.name ?? "-",
        updatedAt: item.updatedAt,
      };
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Disponibilidad para Consumo
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Información actualizada de cuyes para consumo.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Variedad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Cantidad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Peso
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Edad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Ciudad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Actualizado
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium">
                  {row.variety}
                </td>

                <td className="px-6 py-4 text-center font-semibold">
                  {row.quantity}
                </td>

                <td className="px-6 py-4 text-center">
                  {row.weight}
                </td>

                <td className="px-6 py-4 text-center">
                  {row.age}
                </td>

                <td className="px-6 py-4 text-center">
                  {row.city}
                </td>

                <td className="px-6 py-4 text-center text-slate-500">
                  {row.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}