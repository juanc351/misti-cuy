import type {
  LearnArticle,
  LearnCategory,
  LearnNavigationState,
} from "./learn.types";


export interface UseLearn {

  latestArticle?: LearnArticle;


  selectedArticle?: LearnArticle;


  selectedCategory?: LearnCategory;


  articles: LearnArticle[];


  categories: LearnCategory[];


  history: LearnNavigationState[];


  canGoBack: boolean;


  push: (
    state: LearnNavigationState
  ) => void;


  goBack: () => void;


  reset: () => void;


  selectCategory: (
    categoryId: string
  ) => void;


  clearCategory: () => void;


  selectArticle: (
    articleId: string,
    source?: "articles" | "library"
  ) => void;


  searchArticles: (
    query: string
  ) => LearnArticle[];

}