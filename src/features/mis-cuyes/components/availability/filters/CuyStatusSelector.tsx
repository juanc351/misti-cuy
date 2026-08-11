"use client";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";

interface CuyStatusSelectorProps {
  catalog: UseCuyReturn;
}

const statuses = [
  {
    id: "ALL" as const,
    label: "Todos",
  },
  {
    id: "DISPONIBLE" as const,
    label: "Disponible",
  },
  {
    id: "NO_DISPONIBLE" as const,
    label: "Vendido",
  },
];

export default function CuyStatusSelector({
  catalog,
}: CuyStatusSelectorProps) {
  const { filters, actions } = catalog;

  return (
    <section className="bg-[#09090B]">
      {/* ============================================================
          ENCABEZADO
      ============================================================ */}

      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-white">
          Estado
        </h2>

        <p className="mt-1 text-sm text-[#A1A1AA]">
          Filtra las publicaciones según su disponibilidad.
        </p>
      </div>

      {/* ============================================================
          SELECTOR
      ============================================================ */}

      <div className="px-4 pb-4">
        <div
          className="
            flex
            rounded-xl
            border
            border-[#27272A]
            bg-[#18181B]
            p-1
          "
        >
          {statuses.map((status) => {
            const active =
              filters.selectedStatus ===
              status.id;

            return (
              <button
                key={status.id}
                type="button"
                onClick={() =>
                  actions.setStatus(
                    status.id,
                  )
                }
                className={`
                  flex-1
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    active
                      ? `
                        bg-[#00BC7D]
                        text-black
                        shadow-sm
                      `
                      : `
                        text-white
                        hover:bg-[#00BC7D]/10
                        hover:text-white
                      `
                  }
                `}
              >
                {status.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}