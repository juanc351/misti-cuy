"use client";

import { motion } from "framer-motion";

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

/* =====================================
   ANIMACIONES
===================================== */

const containerVariants = {

  hidden: {},

  show: {

    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.10,
    },

  },

};

const itemVariants = {

  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {

    opacity: 1,
    y: 0,

    transition: {
      duration: 0.25,
    },

  },

};

export default function LibraryArticles({

  articles,

  onSelectArticle,

}: Props) {

  return (

    <motion.section

      variants={containerVariants}

      initial="hidden"

      animate="show"

      className="
        mt-8
        space-y-3
      "

    >

      {articles.map((article) => (

        <motion.button

          key={article.id}

          layout

          variants={itemVariants}

          whileTap={{
            scale: 0.98,
          }}

          whileHover={{
            scale: 1.01,
          }}

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
            px-6
            py-5
            text-left
          "

        >

          {/* ==========================
              INFORMACIÓN
          ========================== */}

          <div
            className="
              min-w-0
              flex-1
            "
          >

            <h3

              className="
                truncate
                text-lg
                font-semibold
                text-white
              "

            >

              {article.title}

            </h3>

            {/* =====================================
                TODO (Backend)

                Aquí se podrá mostrar:

                • Nuevo
                • Actualizado
                • Leído
                • Tiempo de lectura
                • Fecha de actualización

            ====================================== */}

          </div>

          {/* ==========================
              FLECHA
          ========================== */}

          <motion.div

            whileHover={{
              x: 4,
            }}

            transition={{
              duration: 0.20,
            }}

          >

            <ChevronRight

              size={24}

              className="
                ml-4
                shrink-0
                text-[#7CB342]
              "

            />

          </motion.div>

        </motion.button>

      ))}

    </motion.section>

  );

}