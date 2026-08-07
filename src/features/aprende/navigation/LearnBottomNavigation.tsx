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

export const LEARN_BOTTOM_NAV_HEIGHT = 56;

export default function LearnBottomNavigation({
  active,
  onArticles,
  onLibrary,
}: Props) {

  return (

    <nav
      className="
        h-14
        border-t
        border-white/10
        bg-[#050505]
      "
    >

      <div
        className="
          mx-auto
          flex
          h-full
          max-w-xl
          items-center
          justify-around
        "
      >

        <button
          type="button"
          onClick={onArticles}
          className={`
            flex
            flex-col
            items-center
            justify-center
            gap-1
            transition-colors
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

        <button
          type="button"
          onClick={onLibrary}
          className={`
            flex
            flex-col
            items-center
            justify-center
            gap-1
            transition-colors
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