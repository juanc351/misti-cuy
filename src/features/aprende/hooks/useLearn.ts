import { useState } from "react";

import { learnService } from "../services/learn.service";

import type {
  LearnArticle,
  LearnCategory,
  LearnNavigationState,
} from "../types/learn.types";

import type { UseLearn } from "../types/learn.hook.types";

export function useLearn(): UseLearn {

  const latestArticle =
    learnService.getLatestArticle();

  const [history, setHistory] =
    useState<LearnNavigationState[]>([
      {
        screen: "article",
        articleId: latestArticle?.id,
        categoryId: latestArticle?.categoryId,
        source: "articles",
      },
    ]);

  const [selectedCategory, setSelectedCategory] =
    useState<LearnCategory | undefined>();

  const [selectedArticle, setSelectedArticle] =
    useState<LearnArticle | undefined>(
      latestArticle
    );

  // ==========================
  // DEBUG
  // ==========================

  console.log("========== LEARN ==========");
  console.log("history:", history);
  console.log("selectedCategory:", selectedCategory);
  console.log("selectedArticle:", selectedArticle);

  function push(
    state: LearnNavigationState
  ) {

    console.log("PUSH:", state);

    setHistory((previous) => [
      ...previous,
      state,
    ]);

  }

  function restoreState(
    state: LearnNavigationState
  ) {

    console.log("RESTORE:", state);

    switch (state.screen) {

      case "library":

        setSelectedCategory(undefined);
        setSelectedArticle(undefined);

        break;

      case "category":

        if (state.categoryId) {

          setSelectedCategory(
            learnService.getCategory(
              state.categoryId
            )
          );

        }

        setSelectedArticle(undefined);

        break;

      case "article":

        if (state.categoryId) {

          setSelectedCategory(
            learnService.getCategory(
              state.categoryId
            )
          );

        }

        if (state.articleId) {

          setSelectedArticle(
            learnService.getArticle(
              state.articleId
            )
          );

        }

        break;

      case "subcategory":

        setSelectedArticle(undefined);

        break;

    }

  }

  function goBack() {

    console.log("GO BACK");

    setHistory((previous) => {

      if (previous.length <= 1) {
        return previous;
      }

      const next =
        previous.slice(0, -1);

      restoreState(
        next[next.length - 1]
      );

      return next;

    });

  }

  function reset() {

    console.log("RESET");

    if (!latestArticle) {
      return;
    }

    setHistory([
      {
        screen: "article",
        articleId: latestArticle.id,
        categoryId: latestArticle.categoryId,
        source: "articles",
      },
    ]);

    setSelectedCategory(undefined);

    setSelectedArticle(
      latestArticle
    );

  }

  function selectCategory(
    categoryId: string
  ) {

    console.log("SELECT CATEGORY:", categoryId);

    const category =
      learnService.getCategory(
        categoryId
      );

    setSelectedCategory(
      category
    );

    push({
      screen: "category",
      categoryId,
      source: "library",
    });

  }

  function clearCategory() {

    console.log("CLEAR CATEGORY");

    setSelectedCategory(undefined);

    setSelectedArticle(undefined);

    setHistory([
      {
        screen: "library",
        source: "library",
      },
    ]);

  }

  function selectArticle(
    articleId: string,
    source:
      | "articles"
      | "library" = "articles"
  ) {

    console.log("SELECT ARTICLE:", articleId);

    const article =
      learnService.getArticle(
        articleId
      );

    setSelectedArticle(
      article
    );

    push({
      screen: "article",
      articleId,
      categoryId:
        article?.categoryId,
      source,
    });

  }

  return {

    latestArticle,

    selectedArticle,

    selectedCategory,

    articles:
      learnService.getArticles(),

    categories:
      learnService.getCategories(),

    history,

    canGoBack:
      history.length > 1,

    push,

    goBack,

    reset,

    selectCategory,

    clearCategory,

    selectArticle,

    searchArticles: (
      query: string
    ) =>
      learnService.searchArticles(query),

  };

}