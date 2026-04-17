"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Game } from "@/types/game";
import { filterGames } from "@/lib/games";
import GameCard from "./GameCard";
import { Search } from "lucide-react";
import type { Dictionary } from "@/i18n/TranslationProvider";

interface GameGridProps {
  games: Game[];
  lang: string;
  dict: Dictionary["games"];
}

export default function GameGrid({ games, lang, dict }: GameGridProps) {
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      search: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
      difficulty: searchParams.get("difficulty") ?? "",
      players: searchParams.get("players") ?? "",
    }),
    [searchParams]
  );

  const filtered = useMemo(() => filterGames(games, filters), [games, filters]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Search className="mb-4 h-12 w-12 text-text-muted" />
        <h3 className="mb-2 text-lg font-semibold text-text-primary">{dict.noResultsTitle}</h3>
        <p className="text-sm text-text-secondary">{dict.noResultsDesc}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-text-muted">
        {filtered.length} {filtered.length !== 1 ? dict.resultCountPlural : dict.resultCount}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((game) => (
          <GameCard key={game.id} game={game} variant="grid" lang={lang} dict={dict} />
        ))}
      </div>
    </div>
  );
}
