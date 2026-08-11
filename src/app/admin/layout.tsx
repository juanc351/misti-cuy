"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">

        {/* ================================================================
            SIDEBAR DESKTOP
            ================================================================ */}

        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 lg:flex lg:flex-col">

          {/* MARCA */}

          <div className="flex h-16 items-center border-b border-zinc-800 px-6">
            <div>
              <p className="text-lg font-bold tracking-tight text-white">
                Misti Cuy
              </p>

              <p className="text-xs text-zinc-500">
                Panel administrativo
              </p>
            </div>
          </div>

          {/* NAVEGACIÓN */}

          <nav className="flex-1 overflow-y-auto px-3 py-5">

            {/* ============================================================
                DASHBOARD
                ============================================================ */}

            <div className="space-y-1">
              <AdminNavItem
                href="/admin"
                label="Dashboard"
              />
            </div>

            {/* ============================================================
                SITIO WEB
                ============================================================ */}

            <div className="mt-7">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                Sitio web
              </p>

              <div className="mt-2 space-y-1">
                <AdminNavItem
                  href="/admin/inicio"
                  label="Inicio"
                />
              </div>
            </div>

            {/* ============================================================
                MIS CUYES
                ============================================================ */}

            <div className="mt-7">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                Mis Cuyes
              </p>

              <div className="mt-2 space-y-1">

                <AdminNavItem
                  href="/admin/mis-cuyes"
                  label="Publicaciones"
                />

                <AdminNavItem
                  href="/admin/mis-cuyes/nueva"
                  label="Nueva publicación"
                />

              </div>
            </div>

            {/* ============================================================
                APRENDE
                ============================================================ */}

            <div className="mt-7">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                Aprende
              </p>

              <div className="mt-2 space-y-1">

                <AdminNavItem
                  href="/admin/aprende"
                  label="Artículos"
                />

                <AdminNavItem
                  href="/admin/aprende/categorias"
                  label="Categorías"
                />

                <AdminNavItem
                  href="/admin/aprende/etiquetas"
                  label="Etiquetas"
                />

                <AdminNavItem
                  href="/admin/aprende/referencias"
                  label="Referencias"
                />

              </div>
            </div>

          </nav>
        </aside>

        {/* ================================================================
            ÁREA PRINCIPAL
            ================================================================ */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* ==============================================================
              HEADER
              ============================================================== */}

          <header className="sticky top-0 z-40 flex h-16 items-center border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur sm:px-6">

            {/* BOTÓN MENÚ MÓVIL */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white lg:hidden"
            >
              <span className="text-xl leading-none">
                {mobileMenuOpen ? "×" : "☰"}
              </span>
            </button>

            {/* TÍTULO */}

            <div className="flex-1 px-3 lg:px-0">
              <p className="text-sm font-semibold text-white">
                Misti Cuy
              </p>

              <p className="hidden text-xs text-zinc-500 sm:block">
                Panel administrativo
              </p>
            </div>

            {/* ==========================================================
                PERFIL
                ========================================================== */}

            <Link
              href="/admin/mis-cuyes/perfil"
              aria-label="Mi perfil"
              className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-900"
            >

              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
                  Administrador
                </p>

                <p className="text-xs text-zinc-500">
                  Mi perfil
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
                MC
              </div>

            </Link>

          </header>

          {/* ==============================================================
              MENÚ MÓVIL
              ============================================================== */}

          {mobileMenuOpen && (
            <div className="fixed inset-0 top-16 z-30 lg:hidden">

              {/* FONDO */}

              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="absolute inset-0 bg-black/60"
              />

              {/* PANEL */}

              <aside className="relative h-full w-[85%] max-w-sm overflow-y-auto border-r border-zinc-800 bg-zinc-950 px-3 py-5 shadow-2xl">

                <nav>

                  {/* ======================================================
                      DASHBOARD
                      ====================================================== */}

                  <div className="space-y-1">

                    <MobileNavItem
                      href="/admin"
                      label="Dashboard"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                    />

                  </div>

                  {/* ======================================================
                      SITIO WEB
                      ====================================================== */}

                  <div className="mt-7">

                    <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                      Sitio web
                    </p>

                    <div className="mt-2">

                      <MobileNavItem
                        href="/admin/inicio"
                        label="Inicio"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                    </div>
                  </div>

                  {/* ======================================================
                      MIS CUYES
                      ====================================================== */}

                  <div className="mt-7">

                    <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                      Mis Cuyes
                    </p>

                    <div className="mt-2 space-y-1">

                      <MobileNavItem
                        href="/admin/mis-cuyes"
                        label="Publicaciones"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                      <MobileNavItem
                        href="/admin/mis-cuyes/nueva"
                        label="Nueva publicación"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                    </div>
                  </div>

                  {/* ======================================================
                      APRENDE
                      ====================================================== */}

                  <div className="mt-7">

                    <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                      Aprende
                    </p>

                    <div className="mt-2 space-y-1">

                      <MobileNavItem
                        href="/admin/aprende"
                        label="Artículos"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                      <MobileNavItem
                        href="/admin/aprende/categorias"
                        label="Categorías"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                      <MobileNavItem
                        href="/admin/aprende/etiquetas"
                        label="Etiquetas"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                      <MobileNavItem
                        href="/admin/aprende/referencias"
                        label="Referencias"
                        onClick={() =>
                          setMobileMenuOpen(false)
                        }
                      />

                    </div>
                  </div>

                  {/* ======================================================
                      PERFIL EN MÓVIL
                      ====================================================== */}

                  <div className="mt-7 border-t border-zinc-800 pt-5">

                    <MobileNavItem
                      href="/admin/mis-cuyes/perfil"
                      label="Mi perfil"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                    />

                  </div>

                </nav>
              </aside>
            </div>
          )}

          {/* ==============================================================
              CONTENIDO
              ============================================================== */}

          <main className="min-h-[calc(100vh-4rem)] flex-1 bg-zinc-950 p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   NAVEGACIÓN DESKTOP
   ============================================================================ */

interface AdminNavItemProps {
  href: string;
  label: string;
}

function AdminNavItem({
  href,
  label,
}: AdminNavItemProps) {
  return (
    <Link
      href={href}
      className="flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
    >
      {label}
    </Link>
  );
}

/* ============================================================================
   NAVEGACIÓN MÓVIL
   ============================================================================ */

interface MobileNavItemProps {
  href: string;
  label: string;
  onClick: () => void;
}

function MobileNavItem({
  href,
  label,
  onClick,
}: MobileNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white active:bg-zinc-800"
    >
      {label}
    </Link>
  );
}