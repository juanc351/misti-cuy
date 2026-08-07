import type { LearnArticle } from "../types/learn.types";

interface Props {
  article: LearnArticle;
  onClick: () => void;
}

export default function LibraryArticleCard({
  article,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#111111]
        text-left
        transition
        hover:border-[#7CB342]
      "
    >

      <div
        className="
          aspect-video
          w-full
          bg-neutral-800
          md:w-72
          md:flex-shrink-0
        "
      />


      <div className="flex flex-1 flex-col p-6">

        <div className="mb-3 flex items-center gap-3 text-sm text-gray-400">

          <span>
            {article.readingTime} min
          </span>

          <span>
            •
          </span>

          <span>
            {article.publishedAt}
          </span>

        </div>


        <h3
          className="
            text-2xl
            font-bold
            transition-colors
            group-hover:text-[#7CB342]
          "
        >
          {article.title}
        </h3>


        <p
          className="
            mt-4
            flex-1
            leading-7
            text-gray-400
          "
        >
          {article.summary}
        </p>


        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              rounded-full
              bg-[#7CB342]/20
              px-4
              py-2
              text-sm
              text-[#7CB342]
            "
          >
            {article.categoryId}
          </span>


          <span
            className="
              text-sm
              font-medium
              text-[#7CB342]
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            Leer →
          </span>

        </div>

      </div>

    </button>
  );
}