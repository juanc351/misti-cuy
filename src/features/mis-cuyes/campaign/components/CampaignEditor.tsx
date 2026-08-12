"use client";

import { FormEvent, useState } from "react";

import {
  createCampaignAction,
  updateCampaignAction,
} from "../actions/campaign.actions";

import type {
  Campaign,
  CampaignButtonAction,
  CampaignType,
  CreateCampaignInput,
} from "../types/campaign.types";

interface CampaignEditorProps {
  campaign?: Campaign | null;
  onSaved?: (campaign: Campaign) => void;
}

const EMPTY_FORM: CreateCampaignInput = {
  type: "CAMPAÑA",
  title: "",
  subtitle: "",
  description: "",
  imageUrl: "",
  imageAlt: "",
  buttonText: "",
  buttonAction: "NONE",
  buttonUrl: "",
  productId: null,
  active: false,
  startDate: "",
  endDate: "",
  priority: 0,
};

export default function CampaignEditor({
  campaign,
  onSaved,
}: CampaignEditorProps) {
  const [form, setForm] = useState<CreateCampaignInput>(
    campaign
      ? {
          type: campaign.type,
          title: campaign.title,
          subtitle: campaign.subtitle ?? "",
          description: campaign.description ?? "",
          imageUrl: campaign.imageUrl ?? "",
          imageAlt: campaign.imageAlt ?? "",
          buttonText: campaign.buttonText ?? "",
          buttonAction: campaign.buttonAction,
          buttonUrl: campaign.buttonUrl ?? "",
          productId: campaign.productId ?? null,
          active: campaign.active,
          startDate: campaign.startDate ?? "",
          endDate: campaign.endDate ?? "",
          priority: campaign.priority,
        }
      : EMPTY_FORM,
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ================================================================
     ACTUALIZAR CAMPO
  ================================================================ */

  function updateField<
    K extends keyof CreateCampaignInput,
  >(
    field: K,
    value: CreateCampaignInput[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError(null);
    setSuccess(false);
  }

  /* ================================================================
     GUARDAR
  ================================================================ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const savedCampaign = campaign
        ? await updateCampaignAction(
            campaign.id,
            form,
          )
        : await createCampaignAction(form);

      if (!savedCampaign) {
        throw new Error(
          "No se pudo guardar la cartilla.",
        );
      }

      setSuccess(true);

      onSaved?.(savedCampaign);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al guardar la cartilla.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        rounded-2xl
        border
        border-[#292929]
        bg-[#11110F]
        p-5
        text-[#F5F5F5]
        md:p-6
      "
    >
      {/* ==========================================================
          ENCABEZADO
      ========================================================== */}

      <div>
        <h2 className="text-xl font-bold">
          {campaign
            ? "Editar cartilla"
            : "Nueva cartilla"}
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Administra el contenido destacado que
          aparecerá en Mis Cuyes.
        </p>
      </div>

      {/* ==========================================================
          TIPO
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-type"
          className="mb-2 block text-sm font-semibold"
        >
          Tipo
        </label>

        <select
          id="campaign-type"
          value={form.type}
          onChange={(event) =>
            updateField(
              "type",
              event.target.value as CampaignType,
            )
          }
          className={inputClass}
        >
          <option value="PRODUCTO">
            Producto
          </option>

          <option value="EVENTO">
            Evento
          </option>

          <option value="CAMPAÑA">
            Campaña
          </option>

          <option value="AVISO">
            Aviso
          </option>
        </select>
      </div>

      {/* ==========================================================
          TÍTULO
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-title"
          className="mb-2 block text-sm font-semibold"
        >
          Título
        </label>

        <input
          id="campaign-title"
          type="text"
          value={form.title}
          onChange={(event) =>
            updateField(
              "title",
              event.target.value,
            )
          }
          placeholder="Ej. Feliz Día del Padre"
          maxLength={150}
          className={inputClass}
          required
        />
      </div>

      {/* ==========================================================
          SUBTÍTULO
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-subtitle"
          className="mb-2 block text-sm font-semibold"
        >
          Subtítulo
        </label>

        <input
          id="campaign-subtitle"
          type="text"
          value={form.subtitle ?? ""}
          onChange={(event) =>
            updateField(
              "subtitle",
              event.target.value,
            )
          }
          placeholder="Ej. Misti Cuy"
          maxLength={150}
          className={inputClass}
        />
      </div>

      {/* ==========================================================
          DESCRIPCIÓN
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-description"
          className="mb-2 block text-sm font-semibold"
        >
          Descripción
        </label>

        <textarea
          id="campaign-description"
          value={form.description ?? ""}
          onChange={(event) =>
            updateField(
              "description",
              event.target.value,
            )
          }
          placeholder="Escribe el mensaje de la cartilla..."
          maxLength={1000}
          rows={5}
          className={inputClass}
        />

        <p className="mt-1 text-xs text-[#777777]">
          Máximo 1000 caracteres.
        </p>
      </div>

      {/* ==========================================================
          IMAGEN
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-image"
          className="mb-2 block text-sm font-semibold"
        >
          Imagen
        </label>

        <input
          id="campaign-image"
          type="url"
          value={form.imageUrl ?? ""}
          onChange={(event) =>
            updateField(
              "imageUrl",
              event.target.value,
            )
          }
          placeholder="URL de la imagen"
          className={inputClass}
        />

        <p className="mt-1 text-xs text-[#777777]">
          La carga de archivos se conectará
          posteriormente al sistema de almacenamiento.
        </p>
      </div>

      {/* ==========================================================
          TEXTO ALTERNATIVO
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-image-alt"
          className="mb-2 block text-sm font-semibold"
        >
          Texto alternativo de la imagen
        </label>

        <input
          id="campaign-image-alt"
          type="text"
          value={form.imageAlt ?? ""}
          onChange={(event) =>
            updateField(
              "imageAlt",
              event.target.value,
            )
          }
          placeholder="Describe brevemente la imagen"
          maxLength={200}
          className={inputClass}
        />
      </div>

      {/* ==========================================================
          PRODUCTO
      ========================================================== */}

      {form.type === "PRODUCTO" && (
        <div>
          <label
            htmlFor="campaign-product"
            className="mb-2 block text-sm font-semibold"
          >
            ID del producto / publicación
          </label>

          <input
            id="campaign-product"
            type="text"
            value={form.productId ?? ""}
            onChange={(event) =>
              updateField(
                "productId",
                event.target.value || null,
              )
            }
            placeholder="ID de la publicación"
            className={inputClass}
          />

          <p className="mt-1 text-xs text-[#777777]">
            Posteriormente lo conectaremos al
            selector de publicaciones del panel.
          </p>
        </div>
      )}

      {/* ==========================================================
          BOTÓN
      ========================================================== */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="campaign-button-action"
            className="mb-2 block text-sm font-semibold"
          >
            Acción del botón
          </label>

          <select
            id="campaign-button-action"
            value={form.buttonAction}
            onChange={(event) =>
              updateField(
                "buttonAction",
                event.target.value as CampaignButtonAction,
              )
            }
            className={inputClass}
          >
            <option value="NONE">
              Sin botón
            </option>

            <option value="WHATSAPP">
              WhatsApp
            </option>

            <option value="LINK">
              Enlace
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="campaign-button-text"
            className="mb-2 block text-sm font-semibold"
          >
            Texto del botón
          </label>

          <input
            id="campaign-button-text"
            type="text"
            value={form.buttonText ?? ""}
            onChange={(event) =>
              updateField(
                "buttonText",
                event.target.value,
              )
            }
            placeholder="Consultar promoción"
            maxLength={80}
            className={inputClass}
            disabled={
              form.buttonAction === "NONE"
            }
          />
        </div>
      </div>

      {/* ==========================================================
          URL
      ========================================================== */}

      {form.buttonAction !== "NONE" && (
        <div>
          <label
            htmlFor="campaign-button-url"
            className="mb-2 block text-sm font-semibold"
          >
            URL
          </label>

          <input
            id="campaign-button-url"
            type="url"
            value={form.buttonUrl ?? ""}
            onChange={(event) =>
              updateField(
                "buttonUrl",
                event.target.value,
              )
            }
            placeholder={
              form.buttonAction === "WHATSAPP"
                ? "https://wa.me/51999999999"
                : "https://..."
            }
            className={inputClass}
          />
        </div>
      )}

      {/* ==========================================================
          FECHAS
      ========================================================== */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="campaign-start"
            className="mb-2 block text-sm font-semibold"
          >
            Fecha de inicio
          </label>

          <input
            id="campaign-start"
            type="datetime-local"
            value={form.startDate ?? ""}
            onChange={(event) =>
              updateField(
                "startDate",
                event.target.value,
              )
            }
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="campaign-end"
            className="mb-2 block text-sm font-semibold"
          >
            Fecha de finalización
          </label>

          <input
            id="campaign-end"
            type="datetime-local"
            value={form.endDate ?? ""}
            onChange={(event) =>
              updateField(
                "endDate",
                event.target.value,
              )
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* ==========================================================
          PRIORIDAD
      ========================================================== */}

      <div>
        <label
          htmlFor="campaign-priority"
          className="mb-2 block text-sm font-semibold"
        >
          Prioridad
        </label>

        <input
          id="campaign-priority"
          type="number"
          min={0}
          step={1}
          value={form.priority}
          onChange={(event) =>
            updateField(
              "priority",
              Number(event.target.value),
            )
          }
          className={inputClass}
        />
      </div>

      {/* ==========================================================
          ACTIVA
      ========================================================== */}

      <label
        className="
          flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          border
          border-[#292929]
          bg-[#0D0D0D]
          p-4
        "
      >
        <input
          type="checkbox"
          checked={form.active}
          onChange={(event) =>
            updateField(
              "active",
              event.target.checked,
            )
          }
          className="h-4 w-4 accent-[#5FAF32]"
        />

        <span>
          <span className="block text-sm font-semibold">
            Cartilla activa
          </span>

          <span className="mt-1 block text-xs text-[#777777]">
            Si está desactivada, no aparecerá en
            Mis Cuyes.
          </span>
        </span>
      </label>

      {/* ==========================================================
          MENSAJES
      ========================================================== */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-sm
            text-red-300
          "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            rounded-xl
            border
            border-[#5FAF32]/30
            bg-[#5FAF32]/10
            p-4
            text-sm
            text-[#5FAF32]
          "
        >
          Cartilla guardada correctamente.
        </div>
      )}

      {/* ==========================================================
          GUARDAR
      ========================================================== */}

      <button
        type="submit"
        disabled={saving}
        className="
          w-full
          rounded-xl
          bg-[#5FAF32]
          px-5
          py-3
          font-semibold
          text-white
          transition-all
          duration-200
          hover:bg-[#4D9F25]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {saving
          ? "Guardando..."
          : campaign
            ? "Guardar cambios"
            : "Crear cartilla"}
      </button>
    </form>
  );
}

/* ================================================================
   ESTILOS
================================================================ */

const inputClass = `
  w-full
  rounded-xl
  border
  border-[#292929]
  bg-[#0D0D0D]
  px-4
  py-3
  text-sm
  text-[#F5F5F5]
  outline-none
  transition
  placeholder:text-[#666666]
  focus:border-[#5FAF32]
  disabled:cursor-not-allowed
  disabled:opacity-50
`;