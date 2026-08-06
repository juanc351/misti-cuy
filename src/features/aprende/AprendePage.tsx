"use client";

import { useLearn } from "./hooks/useLearn";

import ArticleViewer from "./viewer/ArticleViewer";
import Library from "./library/Library";

import { LearnBottomNavigation } from "./navigation";

export default function AprendePage() {
  const {
    view,

    selectedArticle,

    categories,

    subcategories,

    articles,

    openViewer,

    openLibrary,

    selectCategory,

    selectSubcategory,

    selectArticle,
  } = useLearn();

  if (!selectedArticle) {
    return null;
  }

  return (
    <>
      {view === "viewer" ? (
        <ArticleViewer
          article={selectedArticle}
          onOpenLibrary={openLibrary}
        />
      ) : (
        <Library
          categories={categories}
          subcategories={subcategories}
          articles={articles}
          onSelectCategory={selectCategory}
          onSelectSubcategory={selectSubcategory}
          onSelectArticle={selectArticle}
        />
      )}

      <LearnBottomNavigation
        view={view}
        onOpenViewer={openViewer}
        onOpenLibrary={openLibrary}
      />
    </>
  );
}