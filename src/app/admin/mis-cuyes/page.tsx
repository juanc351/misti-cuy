import Link from "next/link";

import { getPublicationsData } from "@/features/mis-cuyes/publications/services/publication.service";

import type {
  Publication,
} from "@/features/mis-cuyes/publications/types/publication.types";

import PublicationActions from "./PublicationsClient";

/* ================================================================
   PÁGINA
   ================================================================ */

export default async function MisCuyesPublicacionesPage() {
  /*
   * Las publicaciones vienen directamente de Firebase.
   *
   * Flujo:
   *
   * page.tsx
   * ↓
   * getPublicationsData()
   * ↓
   * publication.service.ts
   * ↓
   * publication.repository.ts
   * ↓
   * Firestore
   */

  const publicaciones =
    await getPublicationsData();

  const reproductores =
    publicaciones.filter(
      (item) =>
        item.type === "REPRODUCTOR",
    );

  const consumo =
    publicaciones.filter(
      (item) =>
        item.type === "CONSUMO",
    );

  return (
    <div>
      {/* ============================================================
          CABECERA
          ============================================================ */}

      <section className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-emerald-400">
              Mis Cuyes
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              Publicaciones
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Administra las publicaciones de cuyes que
              aparecen para los visitantes.
            </p>
          </div>

          <Link
            href="/admin/mis-cuyes/nueva"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:bg-emerald-600"
          >
            + Nueva publicación
          </Link>
        </div>
      </section>

      {/* ============================================================
          RESUMEN
          ============================================================ */}

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Publicaciones"
          value={publicaciones.length}
        />

        <SummaryCard
          label="Reproductores"
          value={reproductores.length}
        />

        <SummaryCard
          label="Consumo"
          value={consumo.length}
        />
      </section>

      {/* ============================================================
          PUBLICACIONES
          ============================================================ */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Mis publicaciones
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Aquí se muestran las publicaciones almacenadas
            en Firebase.
          </p>
        </div>

        {publicaciones.length > 0 ? (
          <div className="space-y-2">
            {publicaciones.map(
              (publicacion) => (
                <PublicationRow
                  key={publicacion.id}
                  publicacion={publicacion}
                />
              ),
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* ============================================================
          VIGENCIA
          ============================================================ */}

      <section className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
        <p className="text-sm font-medium text-zinc-200">
          Vigencia de las publicaciones
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Una publicación tendrá una vigencia de 7 días
          desde su última actualización. Después de 20 días
          desde su publicación original, pasará a
          &quot;No disponible&quot;.
        </p>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Una publicación marcada como &quot;No disponible&quot;
          permanecerá visible durante 5 días adicionales y
          después dejará de mostrarse públicamente.
        </p>

        <p className="mt-2 text-xs text-zinc-600">
          La automatización de estas reglas se implementará
          posteriormente.
        </p>
      </section>
    </div>
  );
}

/* ================================================================
   FILA DE PUBLICACIÓN
   ================================================================ */

interface PublicationRowProps {
  publicacion: Publication;
}

function PublicationRow({
  publicacion,
}: PublicationRowProps) {
  const esReproductor =
    publicacion.type === "REPRODUCTOR";

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* ========================================================
            RAZA / PESO
            ======================================================== */}

        <div className="w-36 shrink-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
            {esReproductor
              ? "REPRODUCTOR"
              : "CONSUMO"}
          </p>

          <p className="mt-1 text-sm font-semibold text-zinc-100">
            {esReproductor
              ? publicacion.breed
              : `${publicacion.weight} g`}
          </p>
        </div>

        {/* ========================================================
            SEXO
            ======================================================== */}

        {esReproductor && (
          <RowInfo
            label="Sexo"
            value={
              publicacion.sex ===
              "MACHO"
                ? "Macho"
                : publicacion.sex ===
                    "HEMBRA"
                  ? "Hembra"
                  : "—"
            }
          />
        )}

        {/* ========================================================
            CANTIDAD
            ======================================================== */}

        <RowInfo
          label="Cantidad"
          value={String(
            publicacion.quantity,
          )}
        />

        {/* ========================================================
            PRECIO
            ======================================================== */}

        <RowInfo
          label="Precio"
          value={`S/ ${publicacion.price}`}
        />

        {/* ========================================================
            ESTADO
            ======================================================== */}

        <RowInfo
          label="Estado"
          value={getStatusLabel(
            publicacion.status,
          )}
        />

        {/* ========================================================
            ACCIONES
            ======================================================== */}

        <div className="flex flex-wrap gap-2 xl:ml-auto">
          <PublicationActions
            id={publicacion.id}
            status={publicacion.status}
            quantity={
              publicacion.quantity
            }
            price={publicacion.price}
          />
        </div>
      </div>
    </article>
  );
}

/* ================================================================
   ESTADO
   ================================================================ */

function getStatusLabel(
  status: Publication["status"],
): string {
  switch (status) {
    case "DISPONIBLE":
      return "Disponible";

    case "NO_DISPONIBLE":
      return "No disponible";

    default:
      return "—";
  }
}

/* ================================================================
   DATO
   ================================================================ */

interface RowInfoProps {
  label: string;
  value: string;
}

function RowInfo({
  label,
  value,
}: RowInfoProps) {
  return (
    <div className="min-w-20">
      <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-zinc-300">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   RESUMEN
   ================================================================ */

interface SummaryCardProps {
  label: string;
  value: number;
}

function SummaryCard({
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-sm font-medium text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-zinc-100">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   ESTADO VACÍO
   ================================================================ */

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center">
      <p className="text-sm font-medium text-zinc-300">
        Todavía no tienes publicaciones
      </p>

      <p className="mt-1 text-sm text-zinc-600">
        Crea tu primera publicación para comenzar.
      </p>

      <Link
        href="/admin/mis-cuyes/nueva"
        className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
      >
        Crear publicación
      </Link>
    </div>
  );
}