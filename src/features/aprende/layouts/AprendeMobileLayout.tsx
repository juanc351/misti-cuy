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
        h-screen
        flex-col
        bg-[#050505]
      "
    >

      {/* =====================================
          CONTENIDO
      ====================================== */}

      <main
        className="
          relative
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
            overflow-y-auto
            transition-opacity
            duration-300
            ${
              isLibrary
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
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
            overflow-y-auto
            transition-opacity
            duration-300
            ${
              isArticle
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
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
      ====================================== */}

      <footer
        className="
          shrink-0
          z-50
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