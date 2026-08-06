import { useState } from "react";

import { learnService } from "../services/learn.service";

import type {
  LearnArticle,
  LearnCategory,
  LearnSubcategory,
  LearnView,
} from "../types/learn.types";

import type { UseLearn } from "../types/learn.hook.types";

export function useLearn(): UseLearn {
  const [view, setView] =
    useState<LearnView>("viewer");

  const [selectedCategory, setSelectedCategory] =
    useState<LearnCategory>();

  const [selectedSubcategory, setSelectedSubcategory] =
    useState<LearnSubcategory>();

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

    setSelectedSubcategory(undefined);
  }

  function selectSubcategory(
    subcategoryId: string
  ) {
    const subcategory =
      learnService
        .getSubcategories()
        .find(
          (item) =>
            item.id === subcategoryId
        );

    setSelectedSubcategory(subcategory);
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

    selectedSubcategory,

    articles:
      learnService.getArticles(),

    categories:
      learnService.getCategories(),

    subcategories:
      learnService.getSubcategories(),

    openLibrary,

    openViewer,

    selectCategory,

    selectSubcategory,

    selectArticle,

    searchArticles: (
      query: string
    ) =>
      learnService.searchArticles(query),
  };
}