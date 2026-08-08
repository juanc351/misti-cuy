"use client";

import type {
  LearnArticle,
  LearnCategory,
} from "../types/learn.types";

import LibraryMobile from "../library/mobile/LibraryMobile";
import ArticleViewer from "../viewer/ArticleViewer";
import LearnBottomNavigation from "../navigation/LearnBottomNavigation";

interface Props {
  isArticle: boolean;

  isLibrary: boolean;

  selectedArticle?: LearnArticle;

  categories: LearnCategory[];

  articles: LearnArticle[];

  onSelectCategory: (
    id: string
  ) => void;

  onSelectArticle: (
    id: string
  ) => void;

  onArticles: () => void;

  onLibrary: () => void;
}

export default function AprendeMobileLayout({
  isArticle,
  isLibrary,
  selectedArticle,
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
  onArticles,
  onLibrary,
}: Props) {
  return (
    <div
      className="
        flex
        h-[100dvh]
        min-h-0
        flex-col
        overflow-hidden
        bg-[#050505]
      "
    >
      {/* =====================================
          CONTENIDO
      ====================================== */}

      <main
        className="
          relative
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        {/* =====================================
            BIBLIOTECA
        ====================================== */}

        <div
          className={`
            absolute
            inset-0
            min-h-0
            overflow-y-auto
            overscroll-contain
            transition-opacity
            duration-300
            ${
              isLibrary
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        >
          <LibraryMobile
            categories={categories}
            articles={articles}
            onSelectCategory={onSelectCategory}
            onSelectArticle={onSelectArticle}
          />
        </div>

        {/* =====================================
            ARTÍCULO
        ====================================== */}

        <div
          className={`
            absolute
            inset-0
            min-h-0
            overflow-y-auto
            overscroll-contain
            transition-opacity
            duration-300
            ${
              isArticle
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        >
          {selectedArticle && (
            <ArticleViewer
              article={selectedArticle}
            />
          )}
        </div>
      </main>

      {/* =====================================
          NAVEGACIÓN INFERIOR
          
          Permanece fuera del área de scroll.
          El contenido se adapta al viewport
          dinámico del navegador móvil.
      ====================================== */}

      <footer
        className="
          relative
          z-50
          shrink-0
          bg-[#050505]
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <LearnBottomNavigation
          active={
            isLibrary
              ? "library"
              : "articles"
          }
          onArticles={onArticles}
          onLibrary={onLibrary}
        />
      </footer>
    </div>
  );
}