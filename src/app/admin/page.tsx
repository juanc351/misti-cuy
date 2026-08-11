import Link from "next/link";

const modules = [
  {
    title: "Inicio",
    description:
      "Administra el contenido principal que se muestra en la página de inicio.",
    href: "/admin/inicio",
  },
  {
    title: "Mis Cuyes",
    description:
      "Administra los cuyes, disponibilidad, variedades, ciudades y productos publicados.",
    href: "/admin/mis-cuyes",
  },
  {
    title: "Aprende",
    description:
      "Crea, edita y publica los artículos educativos de Misti Cuy.",
    href: "/admin/aprende",
  },
];

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* ================================================================
          CABECERA
          ================================================================ */}

      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-400">
          Misti Cuy
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
          Administra el contenido y la información que los visitantes
          encuentran en Misti Cuy.
        </p>
      </section>

      {/* ================================================================
          ÁREAS PRINCIPALES
          ================================================================ */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Áreas principales
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Selecciona qué parte de Misti Cuy deseas administrar.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <AdminModuleCard
              key={module.href}
              title={module.title}
              description={module.description}
              href={module.href}
            />
          ))}
        </div>
      </section>

      {/* ================================================================
          ACCESO RÁPIDO
          ================================================================ */}

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Accesos rápidos
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Accede directamente a las áreas que utilizas con mayor frecuencia.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            title="Inventario"
            description="Mis Cuyes"
            href="/admin/mis-cuyes"
          />

          <QuickAction
            title="Productos"
            description="Mis Cuyes"
            href="/admin/mis-cuyes/productos"
          />

          <QuickAction
            title="Artículos"
            description="Aprende"
            href="/admin/aprende"
          />
        </div>
      </section>

      {/* ================================================================
          ESTADO DEL SISTEMA
          ================================================================ */}

      <section className="mt-10">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              ✓
            </span>

            <div>
              <p className="text-sm font-semibold text-zinc-100">
                Sistema conectado
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Misti Cuy está conectado a Firestore.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   TARJETA PRINCIPAL
   ============================================================================ */

interface AdminModuleCardProps {
  title: string;
  description: string;
  href: string;
}

function AdminModuleCard({
  title,
  description,
  href,
}: AdminModuleCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:border-emerald-500/40 hover:bg-zinc-800/80 active:scale-[0.99]"
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-semibold text-emerald-400">
        MC
      </div>

      <h3 className="text-base font-semibold text-zinc-100">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {description}
      </p>

      <div className="mt-5 text-sm font-medium text-emerald-400">
        Administrar
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

/* ============================================================================
   ACCIÓN RÁPIDA
   ============================================================================ */

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
}

function QuickAction({
  title,
  description,
  href,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/80 active:scale-[0.99]"
    >
      <div>
        <p className="text-sm font-medium text-zinc-100">
          {title}
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          {description}
        </p>
      </div>

      <span className="text-sm text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400">
        →
      </span>
    </Link>
  );
}