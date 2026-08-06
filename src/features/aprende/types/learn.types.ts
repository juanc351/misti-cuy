/* ==========================================================
   APRENDE
   DOMAIN TYPES
========================================================== */

export type LearnView =
  | "viewer"
  | "library";

/* ==========================================================
   TAGS
========================================================== */

export interface LearnTag {
  id: string;
  name: string;
  slug: string;
}

/* ==========================================================
   ARTICLE IMAGES
========================================================== */

export interface LearnImage {
  url: string;
  alt: string;
}

/* ==========================================================
   CATEGORIES
========================================================== */

export interface LearnCategory {
  id: string;

  name: string;

  slug: string;

  description: string;

  icon: string;

  cover: LearnImage;
}

/* ==========================================================
   SUBCATEGORIES
========================================================== */

export interface LearnSubcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
}

/* ==========================================================
   REFERENCES
========================================================== */

export interface LearnReference {
  id: string;
  title: string;
  url?: string;
}

/* ==========================================================
   HISTORY
========================================================== */

export interface LearnHistory {
  version: string;
  date: string;
  description: string;
}

/* ==========================================================
   ARTICLE BLOCKS
========================================================== */

export type ArticleBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "quote"
  | "list"
  | "table"
  | "tip"
  | "warning";

export interface ArticleBlock {
  id: string;
  type: ArticleBlockType;
  content: unknown;
}

/* ==========================================================
   ARTICLE
========================================================== */

export interface LearnArticle {
  id: string;

  slug: string;

  title: string;

  summary: string;

  cover: LearnImage;

  blocks: ArticleBlock[];

  categoryId: string;

  subcategoryId: string;

  readingTime: number;

  publishedAt: string;

  updatedAt: string;

  featured: boolean;

  tags: LearnTag[];

  references: LearnReference[];

  history: LearnHistory[];

  relatedArticles: string[];
}