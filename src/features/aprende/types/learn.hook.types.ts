import type {
  LearnArticle,
  LearnCategory,
  LearnView,
} from "./learn.types";

export interface UseLearn {
  view: LearnView;

  latestArticle?: LearnArticle;

  selectedArticle?: LearnArticle;

  selectedCategory?: LearnCategory;

  articles: LearnArticle[];

  categories: LearnCategory[];

  openLibrary: () => void;

  openViewer: () => void;

  selectCategory: (
    categoryId: string
  ) => void;

  clearCategory: () => void;

  selectArticle: (
    articleId: string
  ) => void;

  searchArticles: (
    query: string
  ) => LearnArticle[];
}