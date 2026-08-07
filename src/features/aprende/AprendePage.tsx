"use client";

import { useLearnContext } from "./LearnProvider";

import AprendeMobileLayout from "./layouts/AprendeMobileLayout";
import AprendeDesktopLayout from "./layouts/AprendeDesktopLayout";

export default function AprendePage() {

  const {
    history,
    selectedArticle,
    categories,
    articles,
    selectCategory,
    selectArticle,
    clearCategory,
    reset,
  } = useLearnContext();

  const current =
    history[history.length - 1]?.screen;

  function openArticles() {
    reset();
  }

  function openLibrary() {
    clearCategory();
  }

  const isArticle =
    current === "article" &&
    !!selectedArticle;

  const isLibrary =
    current === "library" ||
    current === "category" ||
    current === "subcategory";

  return (

    <>

      {/* ============================
          MOBILE
      ============================ */}

      <div className="block lg:hidden h-full">

        <AprendeMobileLayout
          isArticle={isArticle}
          isLibrary={isLibrary}
          selectedArticle={selectedArticle}
          categories={categories}
          articles={articles}
          onSelectCategory={selectCategory}
          onSelectArticle={selectArticle}
          onArticles={openArticles}
          onLibrary={openLibrary}
        />

      </div>

      {/* ============================
          DESKTOP
      ============================ */}

      <div className="hidden lg:block h-full">

        <AprendeDesktopLayout
          selectedArticle={selectedArticle}
          categories={categories}
          articles={articles}
          onSelectCategory={selectCategory}
          onSelectArticle={selectArticle}
        />

      </div>

    </>

  );

}