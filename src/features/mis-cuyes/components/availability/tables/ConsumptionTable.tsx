"use client";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";

interface ConsumptionTableProps {
  catalog: UseCuyReturn;
}

export default function ConsumptionTable({
  catalog,
}: ConsumptionTableProps) {
  const {
    data: { publications, profile },
    filters,
    selection,
    actions,
  } = catalog;

  /* ================================================================
     PUBLICACIONES DE CONSUMO
  ================================================================= */

  const rows = publications
    .filter(
      (
        publication,
      ): publication is Extract<
        typeof publication,
        { type: "CONSUMO" }
      > => {
        /* ------------------------------------------------------------
           CATEGORÍA
        ------------------------------------------------------------ */

        if (
          publication.type !== "CONSUMO"
        ) {
          return false;
        }

        /* ------------------------------------------------------------
           UBICACIÓN / DEPARTAMENTO
        ------------------------------------------------------------ */

        if (
          filters.selectedDepartment &&
          publication.department
            .trim()
            .toLowerCase() !==
            filters.selectedDepartment
              .trim()
              .toLowerCase()
        ) {
          return false;
        }

        /* ------------------------------------------------------------
           ESTADO
        ------------------------------------------------------------ */

        if (
          filters.selectedStatus !== "ALL" &&
          publication.status !==
            filters.selectedStatus
        ) {
          return false;
        }

        /* ------------------------------------------------------------
           PRESENTACIÓN / PESO
        ------------------------------------------------------------ */

        if (
          filters.selectedPresentation
        ) {
          const selectedPresentation =
            filters.selectedPresentation
              .trim()
              .toLowerCase();

          const publicationWeight =
            String(
              publication.weight,
            ).toLowerCase();

          const publicationWeightWithUnit =
            `${publication.weight} g`
              .toLowerCase();

          if (
            selectedPresentation !==
              publicationWeight &&
            selectedPresentation !==
              publicationWeightWithUnit
          ) {
            return false;
          }
        }

        return true;
      },
    )
    .map((publication) => ({
      id: publication.id,

      quantity:
        publication.quantity,

      weight:
        publication.weight,

      price:
        publication.price,

      department:
        publication.department ?? "",

      location:
        profile?.location ?? "",

      whatsapp:
        profile?.phone ?? "",

      status:
        publication.status,

      observations:
        publication.observations,

      updatedAt:
        publication.updatedAt
          ? publication.updatedAt.split("T")[0]
          : "-",
    }));

  /* ================================================================
     WHATSAPP
  ================================================================= */

  const getWhatsappUrl = (
    phone: string,
  ) => {
    const cleanPhone =
      phone.replace(/\D/g, "");

    if (!cleanPhone) {
      return null;
    }

    /*
     * Perú.
     *
     * Si se guarda:
     * 987654321
     *
     * se genera:
     * https://wa.me/51987654321
     *
     * Si ya contiene 51:
     * 51987654321
     *
     * no se duplica.
     */

    const phoneWithCountryCode =
      cleanPhone.startsWith("51")
        ? cleanPhone
        : `51${cleanPhone}`;

    return `https://wa.me/${phoneWithCountryCode}`;
  };

  /* ================================================================
     UBICACIÓN
  ================================================================= */

  const getLocationLabel = (
    department: string,
    location: string,
  ) => {
    if (
      department &&
      location
    ) {
      return `${department} - ${location}`;
    }

    return (
      department ||
      location ||
      "-"
    );
  };

  /* ================================================================
     RENDER
  ================================================================= */

  return (
    <section className="bg-[#09090B]">

      {/* ============================================================
          ENCABEZADO
      ============================================================ */}

      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-white">
          Disponibilidad para Consumo
        </h2>

        <p className="mt-1 text-sm text-[#A1A1AA]">
          Cuyes para consumo según los filtros seleccionados.
        </p>
      </div>

      {/* ============================================================
          TABLA
      ============================================================ */}

      <div
        className="
          overflow-x-auto
          rounded-xl
          border
          border-[#27272A]
        "
      >
        <table
          className="
            min-w-full
            border-collapse
          "
        >

          {/* ========================================================
              ENCABEZADO
          ======================================================== */}

          <thead className="bg-[#00BC7D]">
            <tr>

              {/* PESO */}

              <th
                className="
                  border-r
                  border-[#009F6A]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Peso
              </th>

              {/* CANTIDAD */}

              <th
                className="
                  border-r
                  border-[#009F6A]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Cantidad
              </th>

              {/* PRECIO */}

              <th
                className="
                  border-r
                  border-[#009F6A]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Precio
              </th>

              {/* UBICACIÓN */}

              <th
                className="
                  border-r
                  border-[#009F6A]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Ubicación
              </th>

              {/* ESTADO */}

              <th
                className="
                  border-r
                  border-[#009F6A]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Estado
              </th>

              {/* CONTACTO */}

              <th
                className="
                  border-r
                  border-[#009F6A]
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Contacto
              </th>

              {/* ACTUALIZADO */}

              <th
                className="
                  px-6
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Actualizado
              </th>

            </tr>
          </thead>

          {/* ========================================================
              DATOS
          ======================================================== */}

          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => {

                /* --------------------------------------------------
                   ESTADO
                -------------------------------------------------- */

                const isAvailable =
                  row.status ===
                  "DISPONIBLE";

                /* --------------------------------------------------
                   WHATSAPP

                   MUY IMPORTANTE:

                   Solo generamos el enlace si la
                   publicación está disponible.
                -------------------------------------------------- */

                const whatsappUrl =
                  isAvailable
                    ? getWhatsappUrl(
                        row.whatsapp,
                      )
                    : null;

                const isSelected =
                  selection.selectedPublicationId ===
                  row.id;

                return (
                  <tr
                    key={row.id}
                    onClick={() =>
                      actions.selectPublication(
                        row.id,
                      )
                    }
                    className={`
                      cursor-pointer
                      border-t
                      border-[#27272A]
                      text-white
                      transition-colors
                      duration-200

                      ${
                        isSelected
                          ? "bg-[#00BC7D]/20 ring-1 ring-inset ring-[#00BC7D]"
                          : "bg-[#09090B] hover:bg-[#00BC7D]/10"
                      }
                    `}
                  >

                    {/* PESO */}

                    <td
                      className="
                        border-r
                        border-[#27272A]
                        px-6
                        py-4
                        text-center
                        font-semibold
                        text-white
                      "
                    >
                      {row.weight} g
                    </td>

                    {/* CANTIDAD */}

                    <td
                      className="
                        border-r
                        border-[#27272A]
                        px-6
                        py-4
                        text-center
                        text-white
                      "
                    >
                      {row.quantity}
                    </td>

                    {/* PRECIO */}

                    <td
                      className="
                        border-r
                        border-[#27272A]
                        px-6
                        py-4
                        text-center
                        font-semibold
                        text-white
                      "
                    >
                      S/ {row.price}
                    </td>

                    {/* UBICACIÓN */}

                    <td
                      className="
                        border-r
                        border-[#27272A]
                        px-6
                        py-4
                        text-center
                        text-white
                      "
                    >
                      {getLocationLabel(
                        row.department,
                        row.location,
                      )}
                    </td>

                    {/* ESTADO */}

                    <td
                      className="
                        border-r
                        border-[#27272A]
                        px-6
                        py-4
                        text-center
                      "
                    >
                      {isAvailable ? (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-[#00BC7D]/15
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-[#00BC7D]
                          "
                        >
                          Disponible
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-[#EF4444]/10
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-[#EF4444]
                          "
                        >
                          No disponible
                        </span>
                      )}
                    </td>

                    {/* =================================================
                        WHATSAPP
                    ================================================= */}

                    <td
                      className="
                        border-r
                        border-[#27272A]
                        px-6
                        py-4
                        text-center
                      "
                    >
                      {isAvailable &&
                      whatsappUrl ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#00BC7D]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-black
                            transition-colors
                            hover:bg-[#00A86F]
                          "
                        >
                          WhatsApp
                        </a>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="
                            inline-flex
                            cursor-not-allowed
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#27272A]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-[#71717A]
                          "
                        >
                          WhatsApp
                        </span>
                      )}
                    </td>

                    {/* ACTUALIZADO */}

                    <td
                      className="
                        px-6
                        py-4
                        text-center
                        text-[#A1A1AA]
                      "
                    >
                      {row.updatedAt}
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-6
                    py-10
                    text-center
                    text-sm
                    text-[#A1A1AA]
                  "
                >
                  No hay publicaciones de
                  cuyes para consumo con
                  los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </section>
  );
}