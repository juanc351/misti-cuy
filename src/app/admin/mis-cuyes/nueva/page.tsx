"use client";

import { useEffect, useState } from "react";

import {
  createPublicationAction,
} from "@/features/mis-cuyes/publications/actions/publication.actions";

import {
  getAdminProfileAction,
} from "@/features/mis-cuyes/profile/actions/profile.actions";

import type {
  CreatePublicationInput,
} from "@/features/mis-cuyes/publications/types/publication.types";

/* ================================================================
   PESOS DE CONSUMO
================================================================ */

const PESOS_CONSUMO = [
  500,
  550,
  600,
  650,
  700,
  750,
  800,
  850,
  900,
  950,
  1000,
  1050,
  1100,
  1150,
  1200,
];

/* ================================================================
   TIPOS
================================================================ */

type PublicationType =
  | "reproductores"
  | "consumo";

/* ================================================================
   PÁGINA
================================================================ */

export default function NuevaPublicacionPage() {
  const [tipo, setTipo] =
    useState<PublicationType>("reproductores");

  /*
   * Departamento obtenido automáticamente
   * desde el perfil del administrador.
   */
  const [department, setDepartment] =
    useState("");

  const [profileLoading, setProfileLoading] =
    useState(true);

  const [profileError, setProfileError] =
    useState("");

  /* ==============================================================
     OBTENER PERFIL
  ============================================================== */

  useEffect(() => {
    async function loadProfile() {
      try {
        setProfileLoading(true);
        setProfileError("");

        const profile =
          await getAdminProfileAction();

        if (!profile) {
          setProfileError(
            "No existe un perfil de administrador configurado.",
          );

          return;
        }

        const profileDepartment =
          profile.department?.trim() ?? "";

        if (!profileDepartment) {
          setProfileError(
            "El departamento no está configurado en tu perfil.",
          );

          return;
        }

        setDepartment(
          profileDepartment,
        );
      } catch (error) {
        console.error(
          "Error obteniendo perfil:",
          error,
        );

        setProfileError(
          error instanceof Error
            ? error.message
            : "No se pudo obtener el perfil.",
        );
      } finally {
        setProfileLoading(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl">

      {/* ============================================================
          CABECERA
      ============================================================ */}

      <section className="mb-6">

        <p className="mb-1 text-sm font-medium text-emerald-400">
          Mis Cuyes
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          Nueva publicación
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Completa la información de los cuyes que deseas
          publicar.
        </p>

        {/* ========================================================
            UBICACIÓN AUTOMÁTICA
        ======================================================== */}

        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">

          <p className="text-xs font-medium text-zinc-500">
            Departamento de publicación
          </p>

          {profileLoading ? (
            <p className="mt-1 text-sm text-zinc-400">
              Cargando perfil...
            </p>
          ) : profileError ? (
            <p className="mt-1 text-sm text-red-400">
              {profileError}
            </p>
          ) : (
            <p className="mt-1 text-sm font-medium text-emerald-400">
              {department}
            </p>
          )}

          <p className="mt-1 text-xs text-zinc-600">
            Este dato se obtiene automáticamente desde tu
            perfil y se guardará en la publicación.
          </p>

        </div>

        <p className="mt-2 text-xs text-zinc-600">
          La ubicación específica y el número de WhatsApp
          continúan obteniéndose desde tu perfil.
        </p>

      </section>

      {/* ============================================================
          TIPO DE PUBLICACIÓN
      ============================================================ */}

      <section className="mb-5 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">

        <p className="mb-3 text-sm font-medium text-zinc-200">
          Tipo de publicación
        </p>

        <div className="grid grid-cols-2 gap-2">

          <TypeButton
            active={
              tipo === "reproductores"
            }
            onClick={() =>
              setTipo("reproductores")
            }
          >
            Reproductores
          </TypeButton>

          <TypeButton
            active={
              tipo === "consumo"
            }
            onClick={() =>
              setTipo("consumo")
            }
          >
            Consumo
          </TypeButton>

        </div>

      </section>

      {/* ============================================================
          FORMULARIO
      ============================================================ */}

      {tipo === "reproductores" ? (
        <ReproductoresForm
          department={department}
          profileLoading={profileLoading}
          profileError={profileError}
        />
      ) : (
        <ConsumoForm
          department={department}
          profileLoading={profileLoading}
          profileError={profileError}
        />
      )}

    </div>
  );
}

/* ================================================================
   PROPS DE LOS FORMULARIOS
================================================================ */

interface PublicationFormLocationProps {
  department: string;
  profileLoading: boolean;
  profileError: string;
}

/* ================================================================
   FORMULARIO REPRODUCTORES
================================================================ */

function ReproductoresForm({
  department,
  profileLoading,
  profileError,
}: PublicationFormLocationProps) {

  const [raza, setRaza] =
    useState("Perú");

  const [linea, setLinea] =
    useState("");

  const [color, setColor] =
    useState("");

  const [sexo, setSexo] =
    useState("");

  const [cantidad, setCantidad] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [observations, setObservations] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const esNativo =
    raza === "Nativo";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {

      /* ==========================================================
         VALIDAR PERFIL
      ========================================================== */

      if (profileLoading) {
        throw new Error(
          "Espera mientras se carga el perfil.",
        );
      }

      if (profileError) {
        throw new Error(
          profileError,
        );
      }

      if (!department.trim()) {
        throw new Error(
          "El departamento no está configurado en el perfil.",
        );
      }

      /* ==========================================================
         CREAR DATOS
      ========================================================== */

      const data: CreatePublicationInput = {
        type: "REPRODUCTOR",

        breed: raza,

        line: esNativo
          ? linea
          : undefined,

        predominantColor: esNativo
          ? color
          : undefined,

        sex:
          sexo as "MACHO" | "HEMBRA",

        quantity:
          Number(cantidad),

        price:
          Number(precio),

        observations,

        department:
          department.trim(),
      };

      /* ==========================================================
         GUARDAR
      ========================================================== */

      await createPublicationAction(
        data,
      );

      setMessage(
        "Reproductores publicados correctamente.",
      );

      setCantidad("");
      setPrecio("");
      setLinea("");
      setColor("");
      setSexo("");
      setObservations("");

    } catch (error) {

      console.error(
        "Error creando publicación:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo crear la publicación.",
      );

    } finally {

      setSaving(false);

    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">

      <div className="mb-5">

        <h2 className="text-base font-semibold text-zinc-100">
          Información del reproductor
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          Información que aparecerá en la publicación.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* ========================================================
            RAZA
        ======================================================== */}

        <Field label="Raza / línea">

          <select
            value={raza}
            onChange={(event) =>
              setRaza(event.target.value)
            }
            className="admin-input"
          >
            <option value="Perú">
              Perú
            </option>

            <option value="Andina">
              Andina
            </option>

            <option value="Inti">
              Inti
            </option>

            <option value="Kuri">
              Kuri
            </option>

            <option value="Nativo">
              Nativo
            </option>

          </select>

        </Field>

        {/* ========================================================
            LÍNEA NATIVA
        ======================================================== */}

        {esNativo && (
          <div className="space-y-5 rounded-lg border border-zinc-800 bg-zinc-950 p-4">

            <div>

              <p className="text-sm font-medium text-zinc-200">
                Información de la línea
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Puedes registrar el nombre de tu propia línea
                y su color predominante.
              </p>

            </div>

            <Field label="Nombre de la línea">

              <input
                type="text"
                value={linea}
                onChange={(event) =>
                  setLinea(event.target.value)
                }
                className="admin-input"
                placeholder="Ej. Línea Misti"
              />

            </Field>

            <Field label="Color predominante">

              <input
                type="text"
                value={color}
                onChange={(event) =>
                  setColor(event.target.value)
                }
                className="admin-input"
                placeholder="Ej. Blanco con marrón"
              />

            </Field>

          </div>
        )}

        {/* ========================================================
            SEXO
        ======================================================== */}

        <Field label="Sexo">

          <select
            value={sexo}
            onChange={(event) =>
              setSexo(event.target.value)
            }
            className="admin-input"
          >

            <option
              value=""
              disabled
            >
              Selecciona el sexo
            </option>

            <option value="MACHO">
              Macho
            </option>

            <option value="HEMBRA">
              Hembra
            </option>

          </select>

        </Field>

        {/* ========================================================
            CANTIDAD
        ======================================================== */}

        <Field label="Cantidad disponible">

          <input
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={cantidad}
            onChange={(event) =>
              setCantidad(event.target.value)
            }
            className="admin-input"
            placeholder="Ej. 10"
          />

        </Field>

        {/* ========================================================
            PRECIO
        ======================================================== */}

        <Field label="Precio">

          <div className="flex min-h-11">

            <div className="flex items-center rounded-l-lg border border-r-0 border-zinc-700 bg-zinc-800 px-3 text-sm font-medium text-zinc-300">
              S/
            </div>

            <input
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={precio}
              onChange={(event) =>
                setPrecio(event.target.value)
              }
              className="min-w-0 flex-1 rounded-r-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-500"
              placeholder="0.00"
            />

          </div>

        </Field>

        {/* ========================================================
            OBSERVACIONES
        ======================================================== */}

        <Field label="Observaciones">

          <textarea
            rows={4}
            value={observations}
            onChange={(event) =>
              setObservations(event.target.value)
            }
            className="admin-input resize-y"
            placeholder="Información adicional sobre los reproductores..."
          />

        </Field>

        {/* ========================================================
            MENSAJES
        ======================================================== */}

        <Messages
          message={message}
          error={error}
        />

        {/* ========================================================
            BOTÓN
        ======================================================== */}

        <SubmitButton
          disabled={
            saving ||
            profileLoading ||
            !!profileError ||
            !department
          }
        >
          {saving
            ? "Publicando..."
            : "Publicar reproductores"}
        </SubmitButton>

      </form>

    </section>
  );
}

/* ================================================================
   FORMULARIO CONSUMO
================================================================ */

function ConsumoForm({
  department,
  profileLoading,
  profileError,
}: PublicationFormLocationProps) {

  const [cantidad, setCantidad] =
    useState("");

  const [peso, setPeso] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [observations, setObservations] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {

      /* ==========================================================
         VALIDAR PERFIL
      ========================================================== */

      if (profileLoading) {
        throw new Error(
          "Espera mientras se carga el perfil.",
        );
      }

      if (profileError) {
        throw new Error(
          profileError,
        );
      }

      if (!department.trim()) {
        throw new Error(
          "El departamento no está configurado en el perfil.",
        );
      }

      /* ==========================================================
         CREAR DATOS
      ========================================================== */

      const data: CreatePublicationInput = {
        type: "CONSUMO",

        quantity:
          Number(cantidad),

        weight:
          Number(peso),

        price:
          Number(precio),

        observations,

        department:
          department.trim(),
      };

      /* ==========================================================
         GUARDAR
      ========================================================== */

      await createPublicationAction(
        data,
      );

      setMessage(
        "Publicación de consumo creada correctamente.",
      );

      setCantidad("");
      setPeso("");
      setPrecio("");
      setObservations("");

    } catch (error) {

      console.error(
        "Error creando publicación:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo crear la publicación.",
      );

    } finally {

      setSaving(false);

    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">

      <div className="mb-5">

        <h2 className="text-base font-semibold text-zinc-100">
          Información para consumo
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          Información que aparecerá en la publicación.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* ========================================================
            CANTIDAD
        ======================================================== */}

        <Field label="Cantidad disponible">

          <input
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={cantidad}
            onChange={(event) =>
              setCantidad(event.target.value)
            }
            className="admin-input"
            placeholder="Ej. 20"
          />

        </Field>

        {/* ========================================================
            PESO
        ======================================================== */}

        <Field label="Peso">

          <select
            value={peso}
            onChange={(event) =>
              setPeso(event.target.value)
            }
            className="admin-input"
          >

            <option
              value=""
              disabled
            >
              Selecciona el peso
            </option>

            {PESOS_CONSUMO.map(
              (pesoItem) => (
                <option
                  key={pesoItem}
                  value={pesoItem}
                >
                  {pesoItem} g
                </option>
              ),
            )}

          </select>

        </Field>

        {/* ========================================================
            PRECIO
        ======================================================== */}

        <Field label="Precio">

          <div className="flex min-h-11">

            <div className="flex items-center rounded-l-lg border border-r-0 border-zinc-700 bg-zinc-800 px-3 text-sm font-medium text-zinc-300">
              S/
            </div>

            <input
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={precio}
              onChange={(event) =>
                setPrecio(event.target.value)
              }
              className="min-w-0 flex-1 rounded-r-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-500"
              placeholder="0.00"
            />

          </div>

        </Field>

        {/* ========================================================
            OBSERVACIONES
        ======================================================== */}

        <Field label="Observaciones">

          <textarea
            rows={4}
            value={observations}
            onChange={(event) =>
              setObservations(event.target.value)
            }
            className="admin-input resize-y"
            placeholder="Información adicional sobre los cuyes..."
          />

        </Field>

        {/* ========================================================
            MENSAJES
        ======================================================== */}

        <Messages
          message={message}
          error={error}
        />

        {/* ========================================================
            BOTÓN
        ======================================================== */}

        <SubmitButton
          disabled={
            saving ||
            profileLoading ||
            !!profileError ||
            !department
          }
        >
          {saving
            ? "Publicando..."
            : "Publicar para consumo"}
        </SubmitButton>

      </form>

    </section>
  );
}

/* ================================================================
   CAMPO
================================================================ */

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({
  label,
  children,
}: FieldProps) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </label>

      {children}

    </div>
  );
}

/* ================================================================
   SELECTOR DE TIPO
================================================================ */

interface TypeButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TypeButton({
  active,
  onClick,
  children,
}: TypeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-11 rounded-lg border px-3 text-sm font-medium transition-colors",
        active
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
          : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ================================================================
   MENSAJES
================================================================ */

interface MessagesProps {
  message: string;
  error: string;
}

function Messages({
  message,
  error,
}: MessagesProps) {
  return (
    <>
      {message && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <p className="text-sm text-emerald-400">
            {message}
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}
    </>
  );
}

/* ================================================================
   BOTÓN DE PUBLICAR
================================================================ */

interface SubmitButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

function SubmitButton({
  disabled = false,
  children,
}: SubmitButtonProps) {
  return (
    <div className="mt-6 border-t border-zinc-800 pt-5">

      <button
        type="submit"
        disabled={disabled}
        className="min-h-11 w-full rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </button>

    </div>
  );
}