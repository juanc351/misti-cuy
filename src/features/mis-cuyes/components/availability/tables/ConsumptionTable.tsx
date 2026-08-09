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
    actions,
  } = catalog;

  // ======================================================
  // NAVEGAR A INFORMACIÓN DE LA PRESENTACIÓN
  // ======================================================

  const goToPresentationInfo = (
    presentation: string
  ) => {
    actions.setPresentation(presentation);

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

        presentation:
          item.presentation ??
          `${item.averageWeight ?? "-"} g`,

        department: city?.department ?? "-",

        updatedAt: item.updatedAt,

        whatsapp: city?.whatsapp ?? "",
      };
    });

  return (
    <section className="bg-[#0D0D0D]">
      {/* ======================================================
          ENCABEZADO
      ====================================================== */}

      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-[#F5F5F5]">
          Disponibilidad para Consumo
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Información actualizada de cuyes para consumo.
        </p>
      </div>

      {/* ======================================================
          TABLA
      ====================================================== */}

      <div
        className="
          overflow-x-auto
          border
          border-[#292929]
          rounded-xl
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
              ENCABEZADO
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
                Cantidad
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
                Peso
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
                Departamento
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
                Contacto
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
                  goToPresentationInfo(
                    row.presentation
                  )
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
                {/* ==================================================
                    VARIEDAD
                ================================================== */}

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

                {/* ==================================================
                    CANTIDAD
                ================================================== */}

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
                  {row.quantity}
                </td>

                {/* ==================================================
                    PESO
                ================================================== */}

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
                  {row.weight}
                </td>

                {/* ==================================================
                    DEPARTAMENTO
                ================================================== */}

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
                  {row.department}
                </td>

                {/* ==================================================
                    CONTACTO
                ================================================== */}

                <td
                  className="
                    border-r
                    border-[#292929]
                    px-6
                    py-4
                    text-center
                  "
                >
                  <a
                    href={
                      row.whatsapp
                        ? `https://wa.me/${row.whatsapp}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className="
                      inline-flex
                      items-center
                      rounded-lg
                      bg-[#25D366]
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      transition-colors
                      duration-200
                      hover:bg-[#20BD5A]
                    "
                  >
                    WhatsApp
                  </a>
                </td>

                {/* ==================================================
                    ACTUALIZADO
                ================================================== */}

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