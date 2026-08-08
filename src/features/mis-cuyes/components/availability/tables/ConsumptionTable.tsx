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
    <div className="overflow-hidden rounded-2xl bg-white text-black">
      {/* =====================================
          ENCABEZADO
      ====================================== */}

      <div className="px-6 py-5">
        <h2 className="text-lg font-bold text-black">
          Disponibilidad para Consumo
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Información actualizada de cuyes para consumo.
        </p>
      </div>

      {/* =====================================
          TABLA
      ====================================== */}

      <div className="overflow-x-auto">
        <table className="min-w-full text-black">
          <thead className="bg-slate-50 text-black">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                Variedad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-black">
                Cantidad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-black">
                Peso
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-black">
                Edad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-black">
                Ciudad
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-black">
                Actualizado
              </th>
            </tr>
          </thead>

          <tbody className="text-black">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-black">
                  {row.variety}
                </td>

                <td className="px-6 py-4 text-center font-semibold text-black">
                  {row.quantity}
                </td>

                <td className="px-6 py-4 text-center text-black">
                  {row.weight}
                </td>

                <td className="px-6 py-4 text-center text-black">
                  {row.age}
                </td>

                <td className="px-6 py-4 text-center text-black">
                  {row.city}
                </td>

                <td className="px-6 py-4 text-center text-black">
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