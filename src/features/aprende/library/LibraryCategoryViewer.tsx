"use client";

import Image from "next/image";

import {
  LayoutGroup,
  motion,
} from "framer-motion";

import type {
  LearnArticle,
  LearnCategory,
} from "../types/learn.types";

import LibraryArticles from "./LibraryArticles";

interface Props {
  category: LearnCategory;

  articles: LearnArticle[];

  onBack: () => void;

  onSelectArticle: (
    id: string
  ) => void;
}

export default function LibraryCategoryViewer({
  category,
  articles,
  onBack,
  onSelectArticle,
}: Props) {
  return (
    <LayoutGroup>

      <motion.section
        layout
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: .35,
        }}
        className="mt-10"
      >

        <motion.button
          layout
          onClick={onBack}
          whileHover={{
            x: -4,
          }}
          whileTap={{
            scale: .96,
          }}
          className="
            mb-8
            rounded-xl
            border
            border-white/10
            px-5
            py-3
            transition
            hover:border-[#7CB342]
            hover:text-[#7CB342]
          "
        >
          ← Biblioteca
        </motion.button>

        <motion.div
          layoutId={`category-${category.id}`}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#111111]
          "
        >

          <motion.div
            layoutId={`image-${category.id}`}
            className="
              relative
              aspect-[21/9]
            "
          >

            <Image
              src={category.cover.url}
              alt={category.cover.alt}
              fill
              priority
              className="object-cover"
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/10
                to-transparent
              "
            />

          </motion.div>

          <motion.div
            layout
            className="p-10"
          >

            <motion.p
              layout
              className="
                uppercase
                tracking-[0.3em]
                text-[#7CB342]
              "
            >
              Biblioteca
            </motion.p>

            <motion.h1
              layout
              className="
                mt-3
                text-5xl
                font-bold
              "
            >
              {category.name}
            </motion.h1>

            <motion.p
              layout
              className="
                mt-6
                max-w-3xl
                text-lg
                leading-8
                text-gray-400
              "
            >
              {category.description}
            </motion.p>

            <motion.div
              layout
              className="mt-8"
            >

              <span
                className="
                  rounded-full
                  bg-[#7CB342]/20
                  px-5
                  py-2
                  text-[#7CB342]
                "
              >
                {articles.length} artículos
              </span>

            </motion.div>

          </motion.div>

        </motion.div>

        <motion.div
          layout
        >
          <LibraryArticles
            articles={articles}
            onSelectArticle={
              onSelectArticle
            }
          />
        </motion.div>

      </motion.section>

    </LayoutGroup>
  );
}