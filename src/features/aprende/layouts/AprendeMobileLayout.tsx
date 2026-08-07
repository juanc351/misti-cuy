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

      <main
        className="
          relative
          flex-1
          overflow-hidden
        "
      >

        {/* ==========================
            LIBRARY
        ========================== */}

        <div
          className={`
            absolute
            inset-0
            overflow-y-auto
            ${
              isLibrary
                ? "block"
                : "hidden"
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

        {/* ==========================
            ARTICLE
        ========================== */}

        <div
          className={`
            absolute
            inset-0
            overflow-y-auto
            ${
              isArticle
                ? "block"
                : "hidden"
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

      <footer className="shrink-0">

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