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


export const LEARN_BOTTOM_NAV_HEIGHT = 96;


export default function LearnBottomNavigation({
  active,
  onArticles,
  onLibrary,
}: Props) {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        h-24
        border-t
        border-white/10
        bg-[#0A0A0A]
      "
    >

      <div
        className="
          flex
          h-full
          items-center
          justify-around
        "
      >

        <button
          type="button"
          onClick={onArticles}
          className={
            active === "articles"
              ? "text-[#7CB342]"
              : "text-white"
          }
        >
          <FileText
            size={34}
          />

          <span className="block text-sm">
            Artículos
          </span>
        </button>


        <button
          type="button"
          onClick={onLibrary}
          className={
            active === "library"
              ? "text-[#7CB342]"
              : "text-white"
          }
        >
          <BookOpen
            size={34}
          />

          <span className="block text-sm">
            Biblioteca
          </span>
        </button>

      </div>

    </nav>
  );
}