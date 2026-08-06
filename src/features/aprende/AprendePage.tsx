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

    articles,

    openViewer,

    openLibrary,

    selectCategory,

    selectArticle,
  } = useLearn();

  if (!selectedArticle) {
    return null;
  }

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-[#0A0A0A]
      "
    >
      <main className="flex-1">

        {view === "viewer" ? (
          <ArticleViewer
            article={selectedArticle}
            onOpenLibrary={openLibrary}
          />
        ) : (
          <Library
            categories={categories}
            articles={articles}
            onSelectCategory={selectCategory}
            onSelectArticle={selectArticle}
          />
        )}

      </main>

      <div
        className="
          sticky
          bottom-0
          z-50
          shrink-0
        "
      >
        <LearnBottomNavigation
          view={view}
          onOpenViewer={openViewer}
          onOpenLibrary={openLibrary}
        />
      </div>

    </div>
  );
}