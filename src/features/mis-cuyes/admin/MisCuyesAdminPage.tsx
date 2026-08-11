import Link from "next/link";

const sections = [
  {
    title: "Disponibilidad",
    description:
      "Administra la disponibilidad de cuyes que se muestra al público.",
    href: "/admin/mis-cuyes/disponibilidad",
  },
  {
    title: "Categorías",
    description:
      "Administra las categorías utilizadas en Mis Cuyes.",
    href: "/admin/mis-cuyes/categorias",
  },
  {
    title: "Variedades",
    description:
      "Administra las variedades que aparecen en el catálogo.",
    href: "/admin/mis-cuyes/variedades",
  },
  {
    title: "Ciudades",
    description:
      "Administra las ciudades disponibles en el catálogo.",
    href: "/admin/mis-cuyes/ciudades",
  },
  {
    title: "Productos",
    description:
      "Administra los productos publicados en Mis Cuyes.",
    href: "/admin/mis-cuyes/productos",
  },
];

export default function MisCuyesAdminPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* ============================================================
          CABECERA
          ============================================================ */}

      <section className="mb-6">
        <p className="mb-1 text-sm font-medium text-emerald-400">
          Mis Cuyes
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Administración
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
          Controla la información que aparece en la sección pública
          de Mis Cuyes.
        </p>
      </section>

      {/* ============================================================
          MÓDULOS
          ============================================================ */}

      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-zinc-100">
            Secciones
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Selecciona qué información deseas administrar.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-emerald-500/40 hover:bg-zinc-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                  MC
                </div>

                <span className="text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400">
                  →
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-zinc-100">
                {section.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {section.description}
              </p>

              <p className="mt-4 text-xs font-medium text-emerald-400">
                Administrar
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          VISTA PÚBLICA
          ============================================================ */}

      <section className="mt-6">
        <Link
          href="/mis-cuyes"
          target="_blank"
          className="flex min-h-14 items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
        >
          <div>
            <p className="text-sm font-medium text-zinc-100">
              Ver Mis Cuyes
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Abrir la vista pública que verá el visitante.
            </p>
          </div>

          <span className="text-lg text-zinc-500">
            ↗
          </span>
        </Link>
      </section>
    </div>
  );
}