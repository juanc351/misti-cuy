"use client";

import Link from "next/link";
import { useState } from "react";

import { saveAdminProfileAction } from "@/features/mis-cuyes/profile/actions/profile.actions";

import type {
  AdminProfile,
  AdminProfileInput,
} from "@/features/mis-cuyes/profile/types/profile.types";

/* ================================================================
   DEPARTAMENTOS DEL PERÚ
   ================================================================ */

const departments = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
];

/* ================================================================
   PROPS
   ================================================================ */

interface ProfileClientProps {
  initialProfile: AdminProfile | null;
}

/* ================================================================
   PÁGINA
   ================================================================ */

export default function ProfileClient({
  initialProfile,
}: ProfileClientProps) {
  /* ==============================================================
     DATOS DEL PERFIL
     ============================================================== */

  const [name, setName] = useState(
    initialProfile?.name ?? "",
  );

  const [farmName, setFarmName] = useState(
    initialProfile?.farmName ?? "",
  );

  const [phone, setPhone] = useState(
    initialProfile?.phone ?? "",
  );

  const [department, setDepartment] = useState(
    initialProfile?.department ?? "Arequipa",
  );

  const [location, setLocation] = useState(
    initialProfile?.location ?? "",
  );

  const [description, setDescription] = useState(
    initialProfile?.description ?? "",
  );

  /* ==============================================================
     ESTADO
     ============================================================== */

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ==============================================================
     GUARDAR
     ============================================================== */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const data: AdminProfileInput = {
        name,
        farmName,
        phone,
        department,
        location,
        description,
      };

      await saveAdminProfileAction(data);

      setMessage("Perfil guardado correctamente.");
    } catch (error) {
      console.error("Error guardando perfil:", error);

      setError(
        "No se pudo guardar el perfil. Inténtalo nuevamente.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* ============================================================
          CABECERA
          ============================================================ */}

      <section className="mb-6">
        <Link
          href="/admin/mis-cuyes"
          className="mb-4 inline-flex text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          ← Volver a Mis Cuyes
        </Link>

        <p className="mb-1 text-sm font-medium text-emerald-400">
          Mis Cuyes
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          Mi perfil
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
          Completa la información que podrán consultar
          las personas interesadas en tus publicaciones.
        </p>
      </section>

      {/* ============================================================
          FORMULARIO
          ============================================================ */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6"
      >
        {/* ==========================================================
            INFORMACIÓN DEL PERFIL
            ========================================================== */}

        <FormSectionTitle>
          Información del perfil
        </FormSectionTitle>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* NOMBRE */}

          <Field
            label="Nombre"
            hint="Nombre de la persona que publica los cuyes."
          >
            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="admin-input"
              placeholder="Ej. Juan"
            />
          </Field>

          {/* NOMBRE DE GRANJA */}

          <Field
            label="Nombre de la granja"
            hint="Puedes dejar este campo vacío si no tienes un nombre comercial."
          >
            <input
              type="text"
              value={farmName}
              onChange={(event) =>
                setFarmName(event.target.value)
              }
              className="admin-input"
              placeholder="Ej. Misti Cuy"
            />
          </Field>

          {/* TELÉFONO */}

          <Field
            label="Teléfono / WhatsApp"
            hint="Este número será utilizado posteriormente para el contacto por WhatsApp."
          >
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              className="admin-input"
              placeholder="Ej. 999 999 999"
            />
          </Field>

          {/* DEPARTAMENTO */}

          <Field label="Departamento">
            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="admin-select"
            >
              {departments.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </Field>

          {/* LUGAR */}

          <Field
            label="Lugar"
            hint="Puedes indicar distrito, centro poblado o localidad."
          >
            <input
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              className="admin-input"
              placeholder="Ej. Pedregal"
            />
          </Field>
        </div>

        {/* ==========================================================
            PRESENTACIÓN
            ========================================================== */}

        <div className="mt-8">
          <FormSectionTitle>
            Presentación
          </FormSectionTitle>

          <Field
            label="Sobre mí / Sobre la granja"
            hint="Cuenta brevemente quién eres o qué tipo de crianza realizas."
          >
            <textarea
              rows={5}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              className="admin-textarea"
              placeholder="Ej. Somos una granja dedicada a la crianza de cuyes reproductores y para consumo..."
            />
          </Field>
        </div>

        {/* ==========================================================
            VISTA PREVIA
            ========================================================== */}

        <div className="mt-8">
          <FormSectionTitle>
            Información pública
          </FormSectionTitle>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
              Perfil del criador
            </p>

            <p className="mt-2 text-base font-semibold text-zinc-100">
              {name || "Tu nombre aparecerá aquí"}
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              {farmName || "Nombre de la granja"}
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              {department || "Departamento"}
              {" · "}
              {location || "Lugar"}
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {description ||
                "Tu presentación aparecerá aquí cuando completes el perfil."}
            </p>
          </div>
        </div>

        {/* ==========================================================
            MENSAJE DE ÉXITO
            ========================================================== */}

        {message && (
          <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <p className="text-sm text-emerald-400">
              {message}
            </p>
          </div>
        )}

        {/* ==========================================================
            MENSAJE DE ERROR
            ========================================================== */}

        {error && (
          <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* ==========================================================
            ACCIONES
            ========================================================== */}

        <div className="mt-8 border-t border-zinc-800 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="min-h-11 w-full rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Guardando..."
              : "Guardar perfil"}
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-zinc-600">
            La información del perfil se utilizará
            posteriormente en tus publicaciones.
          </p>
        </div>
      </form>
    </div>
  );
}

/* ================================================================
   TÍTULO DE SECCIÓN
   ================================================================ */

function FormSectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-300">
      {children}
    </h2>
  );
}

/* ================================================================
   CAMPO
   ================================================================ */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-200">
        {label}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs leading-5 text-zinc-600">
          {hint}
        </p>
      )}
    </div>
  );
}