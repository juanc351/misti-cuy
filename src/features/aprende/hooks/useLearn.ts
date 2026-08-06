import { useState } from "react";

import { learnService } from "../services/learn.service";

import type {
  LearnArticle,
  LearnCategory,
  LearnView,
} from "../types/learn.types";

import type { UseLearn } from "../types/learn.hook.types";

export function useLearn(): UseLearn {
  const [view, setView] =
    useState<LearnView>("viewer");

  const [selectedCategory, setSelectedCategory] =
    useState<LearnCategory>();

  const [selectedArticle, setSelectedArticle] =
    useState<LearnArticle | undefined>(
      learnService.getLatestArticle()
    );

  function openLibrary() {
    setView("library");
  }

  function openViewer() {
    setView("viewer");
  }

  function selectCategory(
    categoryId: string
  ) {
    const category =
      learnService.getCategory(categoryId);

    setSelectedCategory(category);
  }

  function clearCategory() {
    setSelectedCategory(undefined);
  }

  function selectArticle(
    articleId: string
  ) {
    const article =
      learnService.getArticle(articleId);

    setSelectedArticle(article);

    setView("viewer");
  }

  return {
    view,

    latestArticle:
      learnService.getLatestArticle(),

    selectedArticle,

    selectedCategory,

    articles:
      learnService.getArticles(),

    categories:
      learnService.getCategories(),

    openLibrary,

    openViewer,

    selectCategory,

    clearCategory,

    selectArticle,

    searchArticles: (
      query: string
    ) =>
      learnService.searchArticles(query),
  };
}