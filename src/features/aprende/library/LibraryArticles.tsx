import type {
  LearnArticle,
} from "../types/learn.types";

import {
  ChevronRight,
} from "lucide-react";


interface Props {

  articles: LearnArticle[];

  onSelectArticle: (
    id: string
  ) => void;

}


export default function LibraryArticles({

  articles,

  onSelectArticle,

}: Props) {


  return (

    <section className="mt-8 space-y-4">


      {articles.map((article) => (

        <button

          key={article.id}

          onClick={() =>
            onSelectArticle(
              article.id
            )
          }

          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-[#7CB342]
            bg-[#050505]
            px-8
            py-6
            text-left
            transition-all
            duration-300
            hover:bg-[#111111]
          "

        >


          <h3

            className="
              text-xl
              font-bold
              text-white
            "

          >

            {article.title}

          </h3>



          <ChevronRight

            size={32}

            className="
              text-[#7CB342]
              transition-transform
              duration-300
              group-hover:translate-x-1
            "

          />


        </button>


      ))}


    </section>

  );

}