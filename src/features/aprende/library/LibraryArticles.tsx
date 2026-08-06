import type { LearnArticle } from "../types/learn.types";

interface Props {
  articles: LearnArticle[];
  onSelectArticle: (id: string) => void;
}

export default function LibraryArticles({
  articles,
  onSelectArticle,
}: Props) {
  return (
    <section className="p-6">
      <h2 className="mb-4 text-xl font-bold">
        Artículos
      </h2>

      <div className="space-y-3">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() =>
              onSelectArticle(article.id)
            }
            className="block w-full rounded-xl border border-white/10 p-4 text-left hover:border-[#7CB342]"
          >
            <h3 className="font-semibold">
              {article.title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {article.summary}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}