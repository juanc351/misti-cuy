"use client";

import { useState } from "react";

import {
  deleteCampaignAction,
  updateCampaignStatusAction,
} from "../actions/campaign.actions";

import CampaignEditor from "./CampaignEditor";

import type { Campaign } from "../types/campaign.types";

/* ================================================================
   PROPS
================================================================ */

interface CampaignPanelProps {
  initialCampaigns: Campaign[];
}

/* ================================================================
   PANEL
================================================================ */

export default function CampaignPanel({
  initialCampaigns,
}: CampaignPanelProps) {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>(initialCampaigns);

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const [error, setError] =
    useState("");

  const [showEditor, setShowEditor] =
    useState(false);

  /* ================================================================
     NUEVA CARTILLA
  ================================================================ */

  function handleCreate() {
    setSelectedCampaign(null);
    setShowEditor(true);
    setError("");
  }

  /* ================================================================
     EDITAR
  ================================================================ */

  function handleEdit(
    campaign: Campaign,
  ) {
    setSelectedCampaign(campaign);
    setShowEditor(true);
    setError("");
  }

  /* ================================================================
     ACTIVAR / DESACTIVAR
  ================================================================ */

  async function handleToggle(
    campaign: Campaign,
  ) {
    try {
      setError("");

      const updated =
        await updateCampaignStatusAction(
          campaign.id,
          !campaign.active,
        );

      if (!updated) {
        throw new Error(
          "No se pudo actualizar la cartilla.",
        );
      }

      setCampaigns((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );

      /*
       * Si la cartilla que estamos editando
       * es la misma que acabamos de modificar,
       * actualizamos también la selección.
       */

      setSelectedCampaign((current) =>
        current?.id === updated.id
          ? updated
          : current,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo cambiar el estado.",
      );
    }
  }

  /* ================================================================
     ELIMINAR
  ================================================================ */

  async function handleDelete(
    campaign: Campaign,
  ) {
    const confirmed =
      window.confirm(
        "¿Deseas eliminar esta cartilla?",
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const deleted =
        await deleteCampaignAction(
          campaign.id,
        );

      if (!deleted) {
        throw new Error(
          "La cartilla no existe o ya fue eliminada.",
        );
      }

      setCampaigns((current) =>
        current.filter(
          (item) =>
            item.id !== campaign.id,
        ),
      );

      if (
        selectedCampaign?.id ===
        campaign.id
      ) {
        setSelectedCampaign(null);
        setShowEditor(false);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la cartilla.",
      );
    }
  }

  /* ================================================================
     GUARDADO
  ================================================================ */

  function handleSaved(
    campaign: Campaign,
  ) {
    setCampaigns((current) => {
      const exists = current.some(
        (item) =>
          item.id === campaign.id,
      );

      if (exists) {
        return current.map((item) =>
          item.id === campaign.id
            ? campaign
            : item,
        );
      }

      return [
        ...current,
        campaign,
      ];
    });

    setSelectedCampaign(
      campaign,
    );

    setShowEditor(false);
    setError("");
  }

  /* ================================================================
     RENDER
  ================================================================ */

  return (
    <div className="space-y-6">

      {/* ==========================================================
          ERROR
      ========================================================== */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/5
            px-4
            py-3
          "
        >
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* ==========================================================
          ENCABEZADO
      ========================================================== */}

      <section
        className="
          flex
          flex-col
          gap-4
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h2 className="text-base font-semibold text-zinc-100">
            Cartilla destacada
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Administra el contenido que puede
            aparecer en Mis Cuyes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="
            min-h-11
            rounded-lg
            bg-emerald-500
            px-4
            text-sm
            font-semibold
            text-zinc-950
            transition-colors
            hover:bg-emerald-400
          "
        >
          + Nueva cartilla
        </button>
      </section>

      {/* ==========================================================
          EDITOR
      ========================================================== */}

      {showEditor && (
        <section>
          <CampaignEditor
            campaign={
              selectedCampaign
            }
            onSaved={handleSaved}
          />
        </section>
      )}

      {/* ==========================================================
          SIN CAMPAÑAS
      ========================================================== */}

      {campaigns.length === 0 &&
        !showEditor && (
          <section
            className="
              rounded-xl
              border
              border-dashed
              border-zinc-800
              bg-zinc-900/50
              p-8
              text-center
            "
          >
            <h3 className="text-base font-semibold text-zinc-200">
              No hay cartillas
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Cuando crees una cartilla podrás
              activarla para mostrarla en la
              sección pública de Mis Cuyes.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className="
                mt-5
                rounded-lg
                border
                border-zinc-700
                bg-zinc-950
                px-4
                py-2.5
                text-sm
                font-medium
                text-zinc-200
                transition-colors
                hover:bg-zinc-800
              "
            >
              Crear primera cartilla
            </button>
          </section>
        )}

      {/* ==========================================================
          LISTA
      ========================================================== */}

      {campaigns.length > 0 && (
        <section className="space-y-3">
          {campaigns.map(
            (campaign) => (
              <CampaignRow
                key={campaign.id}
                campaign={campaign}
                onEdit={() =>
                  handleEdit(
                    campaign,
                  )
                }
                onToggle={() =>
                  handleToggle(
                    campaign,
                  )
                }
                onDelete={() =>
                  handleDelete(
                    campaign,
                  )
                }
              />
            ),
          )}
        </section>
      )}
    </div>
  );
}

/* ================================================================
   FILA DE CAMPAÑA
================================================================ */

interface CampaignRowProps {
  campaign: Campaign;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

function CampaignRow({
  campaign,
  onEdit,
  onToggle,
  onDelete,
}: CampaignRowProps) {
  return (
    <article
      className="
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* ========================================================
            INFORMACIÓN
        ======================================================== */}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">

            <span
              className="
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/5
                px-2.5
                py-1
                text-[11px]
                font-semibold
                text-emerald-400
              "
            >
              {campaign.type}
            </span>

            <span
              className={[
                "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                campaign.active
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-zinc-800 text-zinc-500",
              ].join(" ")}
            >
              {campaign.active
                ? "Activa"
                : "Inactiva"}
            </span>

          </div>

          <h3 className="mt-3 truncate text-base font-semibold text-zinc-100">
            {campaign.title}
          </h3>

          {campaign.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-500">
              {campaign.description}
            </p>
          )}

          <p className="mt-3 text-xs text-zinc-600">
            Prioridad:{" "}
            {campaign.priority}
          </p>
        </div>

        {/* ========================================================
            ACCIONES
        ======================================================== */}

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <button
            type="button"
            onClick={onEdit}
            className="
              min-h-10
              rounded-lg
              border
              border-zinc-700
              bg-zinc-950
              px-4
              text-sm
              font-medium
              text-zinc-200
              transition-colors
              hover:bg-zinc-800
            "
          >
            Editar
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="
              min-h-10
              rounded-lg
              border
              border-zinc-700
              bg-zinc-950
              px-4
              text-sm
              font-medium
              text-zinc-300
              transition-colors
              hover:bg-zinc-800
            "
          >
            {campaign.active
              ? "Desactivar"
              : "Activar"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="
              min-h-10
              rounded-lg
              border
              border-red-500/20
              bg-red-500/5
              px-4
              text-sm
              font-medium
              text-red-400
              transition-colors
              hover:bg-red-500/10
            "
          >
            Eliminar
          </button>
        </div>

      </div>
    </article>
  );
}