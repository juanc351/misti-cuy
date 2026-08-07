"use client";

import type {
  LearnArticle,
  LearnCategory,
} from "../types/learn.types";

import LibraryDesktop from "../library/desktop/LibraryDesktop";
import ArticleViewer from "../viewer/ArticleViewer";

interface Props {
  selectedArticle?: LearnArticle;

  categories: LearnCategory[];

  articles: LearnArticle[];

  onSelectCategory: (
    id: string
  ) => void;

  onSelectArticle: (
    id: string
  ) => void;
}

const HEADER_HEIGHT = 88;

export default function AprendeDesktopLayout({
  selectedArticle,
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
}: Props) {

  return (

    <div
      className="hidden lg:block"
      style={{
        marginTop: HEADER_HEIGHT,
      }}
    >

      <main
        className="
          grid
          bg-[#050505]
        "
        style={{
          gridTemplateColumns: "400px minmax(0,1fr)",
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >

        {/* =====================================
            BIBLIOTECA
        ====================================== */}

        <aside
          className="
            overflow-hidden
            border-r
            border-white/10
          "
        >

          <div
            className="
              h-full
              overflow-y-auto
            "
          >

            <LibraryDesktop
              categories={categories}
              articles={articles}
              onSelectCategory={onSelectCategory}
              onSelectArticle={onSelectArticle}
            />

          </div>

        </aside>

        {/* =====================================
            ARTICLE VIEWER
        ====================================== */}

        <section
          className="
            overflow-hidden
          "
        >

          <div
            className="
              h-full
              overflow-y-auto
            "
          >

            {selectedArticle ? (

              <ArticleViewer
                article={selectedArticle}
              />

            ) : (

              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-lg
                  text-gray-500
                "
              >
                Selecciona un artículo desde la biblioteca.
              </div>

            )}

          </div>

        </section>

      </main>

    </div>

  );

}