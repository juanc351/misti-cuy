"use client";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";
import { CuyCategoryType } from "../../../types/cuy.types";

interface ReproductiveTableProps {
  catalog: UseCuyReturn;
}

export default function ReproductiveTable({
  catalog,
}: ReproductiveTableProps) {
  const {
    data: { inventory, variants, cities },
    filters,
    actions,
  } = catalog;

  // ======================================================
  // NAVEGAR A INFORMACIÓN DE LA LÍNEA
  // ======================================================

  const goToVarietyInfo = (variantId: string) => {
    // Selecciona la línea genética
    actions.setVariant(variantId);

    // Esperamos la actualización de la selección
    // antes de realizar el desplazamiento.
    requestAnimationFrame(() => {
      document
        .getElementById("informacion-cuy")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  // ======================================================
  // CONSTRUCCIÓN DE FILAS
  // ======================================================

  const rows = inventory
    .filter(
      (item) =>
        item.category === CuyCategoryType.REPRODUCTOR &&
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
        variantId: item.variantId,
        variety: variant?.name ?? "-",
        males: item.males ?? 0,
        females: item.females ?? 0,
        total:
          (item.males ?? 0) +
          (item.females ?? 0),
        age: item.ageRange ?? "-",
        city: city?.name ?? "-",
        updatedAt: item.updatedAt,
      };
    });

  return (
    <section className="bg-[#0D0D0D]">
      {/* ======================================================
          ENCABEZADO
      ====================================================== */}

      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-[#F5F5F5]">
          Disponibilidad de Reproductores
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Información actualizada de reproductores disponibles.
        </p>
      </div>

      {/* ======================================================
          TABLA
      ====================================================== */}

      <div
        className="
          overflow-x-auto
          rounded-xl
          border
          border-[#292929]
        "
      >
        <table
          className="
            min-w-full
            border-collapse
            text-[#F5F5F5]
          "
        >
          {/* ==================================================
              ENCABEZADO DE LA TABLA
          ================================================== */}

          <thead className="bg-[#5FAF32]">
            <tr>
              <th
                className="
                  border-r
                  border-[#4D9128]
                  px-6
                  py-3
                  text-left
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Variedad
              </th>

              <th
                className="
                  border-r
                  border-[#4D9128]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Machos
              </th>

              <th
                className="
                  border-r
                  border-[#4D9128]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Hembras
              </th>

              <th
                className="
                  border-r
                  border-[#4D9128]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Total
              </th>

              <th
                className="
                  border-r
                  border-[#4D9128]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Edad
              </th>

              <th
                className="
                  border-r
                  border-[#4D9128]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Ciudad
              </th>

              <th
                className="
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Actualizado
              </th>
            </tr>
          </thead>

          {/* ==================================================
              DATOS
          ================================================== */}

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() =>
                  goToVarietyInfo(row.variantId)
                }
                className="
                  group
                  cursor-pointer
                  border-t
                  border-[#292929]
                  bg-[#0D0D0D]
                  text-[#F5F5F5]
                  transition-colors
                  duration-200
                  hover:bg-[#5FAF32]/10
                "
              >
                {/* VARIEDAD */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    font-medium
                    text-[#F5F5F5]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.variety}
                </td>

                {/* MACHOS */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    text-center
                    text-[#F5F5F5]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.males}
                </td>

                {/* HEMBRAS */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    text-center
                    text-[#F5F5F5]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.females}
                </td>

                {/* TOTAL */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    text-center
                    font-semibold
                    text-[#F5F5F5]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.total}
                </td>

                {/* EDAD */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    text-center
                    text-[#F5F5F5]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.age}
                </td>

                {/* CIUDAD */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    text-center
                    text-[#F5F5F5]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.city}
                </td>

                {/* ACTUALIZADO */}

                <td
                  className="
                    px-6
                    py-4
                    text-center
                    text-[#B8B8B8]
                    transition-colors
                    duration-200
                    group-hover:text-[#F5F5F5]
                  "
                >
                  {row.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}