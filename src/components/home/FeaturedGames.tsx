"use client";

import { motion } from "framer-motion";
import type { Game } from "@/types/game";
import GameCard from "@/components/games/GameCard";
import type { Dictionary } from "@/i18n/TranslationProvider";

interface FeaturedGamesProps {
  games: Game[];
  dict: Dictionary["home"]["featured"];
  gamesDict: Dictionary["games"];
  lang: string;
}

export default function FeaturedGames({ games, dict, gamesDict, lang }: FeaturedGamesProps) {
  return (
    <section className="px-4 py-16 sm:px-6" style={{ background: "var(--color-bg-surface)" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: "var(--color-accent-primary)" }}
            >
              {dict.badge}
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-2 text-text-secondary">{dict.subtitle}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
            >
              <GameCard game={game} variant="featured" lang={lang} dict={gamesDict} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
