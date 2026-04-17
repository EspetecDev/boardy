"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import Chip from "@/components/ui/Chip";
import type { Difficulty, GameCategory } from "@/types/game";
import type { Dictionary } from "@/i18n/TranslationProvider";

const categoryIds: GameCategory[] = [
  "board-game", "card-game", "roleplaying", "party-game", "dice-game",
];

const difficultyIds: Difficulty[] = ["beginner", "intermediate", "advanced", "expert"];

const playerCounts = [2, 3, 4, 5, 6];

interface FilterBarProps {
  dict: Dictionary["filters"];
  difficultyDict: Dictionary["difficulty"];
}

export default function FilterBar({ dict, difficultyDict }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeDifficulty = searchParams.get("difficulty") ?? "";
  const activePlayers = searchParams.get("players") ?? "";

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleFilter = useCallback(
    (key: string, value: string, current: string) => {
      setParam(key, current === value ? "" : value);
    },
    [setParam]
  );

  const hasFilters = activeCategory || activeDifficulty || activePlayers;

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("difficulty");
    params.delete("players");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const categoryLabels: Record<GameCategory, string> = {
    "board-game": "Board Games",
    "card-game": "Card Games",
    "roleplaying": "RPGs",
    "party-game": "Party Games",
    "dice-game": "Dice Games",
    "tile-game": "Tile Games",
    "miniatures": "Miniatures",
    "puzzle": "Puzzles",
  };

  return (
    <div
      className="sticky top-16 z-40 border-b bg-bg-base/90 px-4 py-3 backdrop-blur-sm sm:px-6"
      style={{ borderColor: "var(--color-bg-border)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-text-muted">{dict.type}</span>
            <div className="flex flex-wrap gap-1.5">
              {categoryIds.map((id) => (
                <Chip
                  key={id}
                  active={activeCategory === id}
                  onClick={() => toggleFilter("category", id, activeCategory)}
                >
                  {categoryLabels[id]}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-text-muted">{dict.level}</span>
            <div className="flex flex-wrap gap-1.5">
              {difficultyIds.map((id) => (
                <Chip
                  key={id}
                  active={activeDifficulty === id}
                  onClick={() => toggleFilter("difficulty", id, activeDifficulty)}
                >
                  {difficultyDict[id]}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-text-muted">{dict.players}</span>
            <div className="flex flex-wrap gap-1.5">
              {playerCounts.map((count) => (
                <Chip
                  key={count}
                  active={activePlayers === String(count)}
                  onClick={() => toggleFilter("players", String(count), activePlayers)}
                >
                  {count}
                </Chip>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-accent-warm transition-opacity hover:opacity-80"
            >
              <X className="h-3.5 w-3.5" /> {dict.clearFilters}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
