"use client";

import {
  motion,
} from "framer-motion";


import {
  getCategoryIcon,
} from "./library-icons";


import type {
  LearnArticle,
  LearnCategory,
} from "../types/learn.types";


import LibraryArticles from "./LibraryArticles";



interface Props {

  category: LearnCategory;

  articles: LearnArticle[];

  onSelectArticle: (
    id: string,
    source?: "articles" | "library"
  ) => void;

}



export default function LibraryCategoryViewer({

  category,

  articles,

  onSelectArticle,

}: Props) {


  return (

    <motion.section

      layout

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -20,
      }}

      transition={{
        duration: 0.35,
      }}

      className="
        px-6
        pt-8
        pb-28
      "

    >


      {/* CABECERA DE CATEGORIA */}

      <motion.div

        layoutId={`category-${category.id}`}

        className="
          mb-8
        "

      >


        <div

          className="
            flex
            items-start
            gap-6
          "

        >


          {/* ICONO */}

          <motion.div

            layoutId={`icon-${category.id}`}

            className="
              flex
              h-20
              w-20
              shrink-0
              items-center
              justify-center
              text-[#7CB342]
            "

          >

            {getCategoryIcon(
              category.icon,
              58
            )}

          </motion.div>



          {/* TITULO */}

          <div>


            <h1

              className="
                text-4xl
                font-bold
                text-white
              "

            >

              {category.name}

            </h1>



            <span

              className="
                mt-1
                block
                text-lg
                text-gray-300
              "

            >

              {articles.length} artículos

            </span>


          </div>


        </div>




        {/* DESCRIPCION */}

        <p

          className="
            mt-6
            max-w-3xl
            text-lg
            leading-8
            text-gray-300
          "

        >

          {category.description}

        </p>


      </motion.div>




      {/* ARTICULOS */}

      <LibraryArticles

        articles={articles}

        onSelectArticle={
          (id) =>
            onSelectArticle(
              id,
              "library"
            )
        }

      />


    </motion.section>

  );

}