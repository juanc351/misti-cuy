"use client";

import Link from "next/link";

/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Navigation System
 *
 * Logo oficial del sistema.
 *
 * Cuando el logotipo SVG definitivo esté disponible,
 * únicamente se reemplazará el contenido interno de este componente.
 * ============================================================================
 */

export default function NavigationLogo() {
  return (
    <Link
      href="/"
      aria-label="Ir al inicio"
      className="flex items-center transition-opacity duration-300 hover:opacity-90"
    >
      <div className="flex flex-col leading-none">
        <span className="text-[2rem] font-black uppercase tracking-tight">
          <span className="text-white">MISTI </span>

          <span className="text-[#7CB342]">CUY</span>
        </span>

        <span className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#7CB342]">
          Criamos con pasión, alimentamos con propósito
        </span>
      </div>
    </Link>
  );
}