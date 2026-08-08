"use client";

import {
  FileText,
  BookOpen,
} from "lucide-react";

interface Props {
  active: "articles" | "library";

  onArticles: () => void;

  onLibrary: () => void;
}

/*
 * Altura base de la navegación.
 *
 * 56px = h-14
 *
 * El área segura inferior del dispositivo se
 * agrega mediante CSS y no se incluye en esta
 * constante.
 */
export const LEARN_BOTTOM_NAV_HEIGHT = 56;

export default function LearnBottomNavigation({
  active,
  onArticles,
  onLibrary,
}: Props) {
  return (
    <nav
      className="
        w-full
        border-t
        border-white/10
        bg-[#050505]
      "
      style={{
        paddingBottom:
          "env(safe-area-inset-bottom)",
      }}
    >
      {/* =====================================
          CONTENIDO DE LA NAVEGACIÓN
      ====================================== */}

      <div
        className="
          mx-auto
          flex
          h-14
          w-full
          max-w-xl
          items-center
          justify-around
        "
      >
        {/* =====================================
            ARTÍCULOS
        ====================================== */}

        <button
          type="button"
          onClick={onArticles}
          aria-label="Ir a artículos"
          aria-current={
            active === "articles"
              ? "page"
              : undefined
          }
          className={`
            flex
            h-full
            min-w-24
            flex-col
            items-center
            justify-center
            gap-1
            transition-colors
            active:scale-95
            ${
              active === "articles"
                ? "text-[#7CB342]"
                : "text-white"
            }
          `}
        >
          <FileText size={20} />

          <span className="text-xs">
            Artículos
          </span>
        </button>

        {/* =====================================
            BIBLIOTECA
        ====================================== */}

        <button
          type="button"
          onClick={onLibrary}
          aria-label="Ir a biblioteca"
          aria-current={
            active === "library"
              ? "page"
              : undefined
          }
          className={`
            flex
            h-full
            min-w-24
            flex-col
            items-center
            justify-center
            gap-1
            transition-colors
            active:scale-95
            ${
              active === "library"
                ? "text-[#7CB342]"
                : "text-white"
            }
          `}
        >
          <BookOpen size={20} />

          <span className="text-xs">
            Biblioteca
          </span>
        </button>
      </div>
    </nav>
  );
}