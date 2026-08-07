"use client";

import { useLearnContext } from "./LearnProvider";

import Library from "./library/Library";
import ArticleViewer from "./viewer/ArticleViewer";

import LearnBottomNavigation from "./navigation/LearnBottomNavigation";


export default function AprendePage() {

  const {
    history,
    selectedArticle,
    categories,
    articles,
    selectCategory,
    selectArticle,
    reset,
    push,
  } = useLearnContext();


  const current =
    history[history.length - 1]?.screen;


  const currentState =
    history[history.length - 1];


  function openArticles() {

    reset();

  }


  function openLibrary() {

    if (
      currentState?.screen !== "library"
    ) {

      push({
        screen: "library",
        source: "library",
      });

    }

  }


  const isArticle =
    current === "article" &&
    selectedArticle;


  const isLibrary =
    current === "library" ||
    current === "category" ||
    current === "subcategory";


  return (
    <div className="flex min-h-screen flex-col pb-24">


      <main className="flex-1">


        {isArticle ? (

          <ArticleViewer
            article={selectedArticle}
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


      <LearnBottomNavigation

        active={
          isLibrary
            ? "library"
            : "articles"
        }


        onArticles={openArticles}


        onLibrary={openLibrary}

      />


    </div>
  );

}