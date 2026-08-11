"use client";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";

interface CuyDepartmentSelectorProps {
  catalog: UseCuyReturn;
}

export default function CuyDepartmentSelector({
  catalog,
}: CuyDepartmentSelectorProps) {
  const { data, filters, actions } = catalog;

  /* ================================================================
     DEPARTAMENTOS

     Los departamentos se obtienen directamente
     de las publicaciones existentes.
  ================================================================= */

  const departments = Array.from(
    new Set(
      data.publications
        .map((publication) =>
          publication.department?.trim(),
        )
        .filter(
          (
            department,
          ): department is string =>
            Boolean(department),
        ),
    ),
  ).sort((a, b) =>
    a.localeCompare(b, "es"),
  );

  return (
    <section className="bg-[#09090B]">
      {/* ============================================================
          ENCABEZADO
      ============================================================ */}

      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-white">
          Ubicación
        </h2>

        <p className="mt-1 text-sm text-[#A1A1AA]">
          Selecciona el departamento donde deseas
          consultar disponibilidad.
        </p>
      </div>

      {/* ============================================================
          SELECTOR
      ============================================================ */}

      <div className="px-4 pb-4">
        <select
          value={
            filters.selectedDepartment ?? ""
          }
          onChange={(event) =>
            actions.setDepartment(
              event.target.value || null,
            )
          }
          className="
            w-full
            rounded-xl
            border
            border-[#27272A]
            bg-[#18181B]
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-[#00BC7D]
            focus:ring-2
            focus:ring-[#00BC7D]/20
          "
        >
          <option
            value=""
            className="
              bg-[#18181B]
              text-white
            "
          >
            Todos los departamentos
          </option>

          {departments.map(
            (department) => (
              <option
                key={department}
                value={department}
                className="
                  bg-[#18181B]
                  text-white
                "
              >
                {department}
              </option>
            ),
          )}
        </select>
      </div>
    </section>
  );
}