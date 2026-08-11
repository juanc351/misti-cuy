"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  updatePublicationAction,
  updatePublicationStatusAction,
} from "@/features/mis-cuyes/publications/actions/publication.actions";

/* ================================================================
   TIPOS
   ================================================================ */

interface PublicationActionsProps {
  id: string;

  status:
    | "DISPONIBLE"
    | "VENDIDO"
    | "NO_DISPONIBLE";

  quantity: number;

  price: number;
}

/* ================================================================
   COMPONENTE
   ================================================================ */

export default function PublicationActions({
  id,
  status,
  quantity,
  price,
}: PublicationActionsProps) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const [editedQuantity, setEditedQuantity] =
    useState(String(quantity));

  const [editedPrice, setEditedPrice] =
    useState(String(price));

  const [loading, setLoading] = useState(false);

  /* ==============================================================
     REGLA DE EDICIÓN

     Solamente se puede editar una publicación que:

     - esté DISPONIBLE
     - tenga más de 0 unidades
  ============================================================== */

  const canEdit =
    status === "DISPONIBLE" &&
    quantity > 0;

  /* ==============================================================
     INICIAR EDICIÓN
  ============================================================== */

  function handleStartEditing() {
    if (loading || !canEdit) {
      return;
    }

    setEditedQuantity(String(quantity));
    setEditedPrice(String(price));

    setEditing(true);
  }

  /* ==============================================================
     CANCELAR EDICIÓN
  ============================================================== */

  function handleCancelEditing() {
    if (loading) {
      return;
    }

    setEditedQuantity(String(quantity));
    setEditedPrice(String(price));

    setEditing(false);
  }

  /* ==============================================================
     GUARDAR CAMBIOS
  ============================================================== */

  async function handleSave() {
    if (loading || !canEdit) {
      return;
    }

    const newQuantity = Number(editedQuantity);
    const newPrice = Number(editedPrice);

    /* ============================================================
       VALIDAR CANTIDAD
    ============================================================ */

    if (
      !Number.isInteger(newQuantity) ||
      newQuantity < 0
    ) {
      window.alert(
        "La cantidad debe ser un número entero igual o mayor que cero.",
      );

      return;
    }

    /* ============================================================
       NO PERMITIR AUMENTAR
    ============================================================ */

    if (newQuantity > quantity) {
      window.alert(
        `La cantidad no puede aumentar. Actualmente tienes ${quantity} unidades.`,
      );

      return;
    }

    /* ============================================================
       VALIDAR PRECIO
    ============================================================ */

    if (
      !Number.isFinite(newPrice) ||
      newPrice <= 0
    ) {
      window.alert(
        "El precio debe ser mayor que cero.",
      );

      return;
    }

    try {
      setLoading(true);

      const result =
        await updatePublicationAction(
          id,
          newQuantity,
          newPrice,
        );

      if (!result) {
        throw new Error(
          "No se encontró la publicación.",
        );
      }

      setEditing(false);

      router.refresh();
    } catch (error) {
      console.error(
        "Error al actualizar la publicación:",
        error,
      );

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la publicación.";

      window.alert(message);
    } finally {
      setLoading(false);
    }
  }

  /* ==============================================================
     MARCAR COMO NO DISPONIBLE
  ============================================================== */

  async function handleNoDisponible() {
    if (
      loading ||
      status === "NO_DISPONIBLE"
    ) {
      return;
    }

    const confirmar =
      window.confirm(
        "¿Quieres marcar esta publicación como no disponible?",
      );

    if (!confirmar) {
      return;
    }

    try {
      setLoading(true);

      const result =
        await updatePublicationStatusAction(
          id,
          "NO_DISPONIBLE",
        );

      if (!result) {
        throw new Error(
          "No se encontró la publicación.",
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Error al cambiar el estado de la publicación:",
        error,
      );

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la publicación.";

      window.alert(message);
    } finally {
      setLoading(false);
    }
  }

  /* ==============================================================
     MODO EDICIÓN
  ============================================================== */

  if (editing) {
    return (
      <div className="flex items-center gap-2">

        {/* ========================================================
           CANTIDAD
        ======================================================== */}

        <input
          type="number"
          min={0}
          max={quantity}
          step={1}
          value={editedQuantity}
          onChange={(event) =>
            setEditedQuantity(
              event.target.value,
            )
          }
          disabled={loading}
          aria-label="Cantidad disponible"
          className="h-9 w-20 rounded-lg border border-zinc-700 bg-zinc-950 px-2 text-center text-xs font-medium text-zinc-100 outline-none transition-colors focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* ========================================================
           PRECIO
        ======================================================== */}

        <div className="flex h-9 w-28 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950">
          <span className="flex items-center border-r border-zinc-700 px-2 text-xs text-zinc-500">
            S/
          </span>

          <input
            type="number"
            min={0.01}
            step="0.01"
            value={editedPrice}
            onChange={(event) =>
              setEditedPrice(
                event.target.value,
              )
            }
            disabled={loading}
            aria-label="Precio"
            className="min-w-0 flex-1 bg-transparent px-2 text-xs font-medium text-zinc-100 outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* ========================================================
           GUARDAR
        ======================================================== */}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="min-h-9 rounded-lg bg-emerald-500 px-3 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : "Guardar"}
        </button>

        {/* ========================================================
           CANCELAR
        ======================================================== */}

        <button
          type="button"
          onClick={handleCancelEditing}
          disabled={loading}
          className="min-h-9 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>

      </div>
    );
  }

  /* ==============================================================
     MODO NORMAL
  ============================================================== */

  return (
    <div className="flex items-center gap-2">

      {/* ==========================================================
         ACTUALIZAR

         SOLO aparece si la publicación está DISPONIBLE
         y tiene unidades.
      ========================================================== */}

      {canEdit && (
        <button
          type="button"
          onClick={handleStartEditing}
          disabled={loading}
          className="min-h-9 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Actualizar
        </button>
      )}

      {/* ==========================================================
         NO DISPONIBLE

         Si ya está NO_DISPONIBLE queda deshabilitado.
      ========================================================== */}

      {status !== "VENDIDO" && (
        <button
          type="button"
          onClick={handleNoDisponible}
          disabled={
            loading ||
            status === "NO_DISPONIBLE"
          }
          className="min-h-9 rounded-lg border border-red-500/20 bg-red-500/5 px-3 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "NO_DISPONIBLE"
            ? "No disponible"
            : loading
              ? "Actualizando..."
              : "No disponible"}
        </button>
      )}

    </div>
  );
}