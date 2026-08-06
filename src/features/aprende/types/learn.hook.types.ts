import type {
  LearnArticle,
  LearnCategory,
  LearnSubcategory,
  LearnView,
} from "./learn.types";

export interface UseLearn {

  view: LearnView;

  latestArticle?: LearnArticle;

  selectedArticle?: LearnArticle;

  selectedCategory?: LearnCategory;

  selectedSubcategory?: LearnSubcategory;

  articles: LearnArticle[];

  categories: LearnCategory[];

  subcategories: LearnSubcategory[];

  openLibrary: () => void;

  openViewer: () => void;

  selectCategory: (
    categoryId: string
  ) => void;

  selectSubcategory: (
    subcategoryId: string
  ) => void;

  selectArticle: (
    articleId: string
  ) => void;

  searchArticles: (
    query: string
  ) => LearnArticle[];
}