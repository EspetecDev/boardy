"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import Chip from "@/components/ui/Chip";
import type { Difficulty, GameCategory } from "@/types/game";

const categories: { id: GameCategory; label: string }[] = [
  { id: "board-game", label: "Board Games" },
  { id: "card-game", label: "Card Games" },
  { id: "roleplaying", label: "RPGs" },
  { id: "party-game", label: "Party Games" },
  { id: "dice-game", label: "Dice Games" },
];

const difficulties: { id: Difficulty; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "expert", label: "Expert" },
];

const playerCounts = [2, 3, 4, 5, 6];

export default function FilterBar() {
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

  return (
    <div
      className="sticky top-16 z-40 border-b bg-bg-base/90 px-4 py-3 backdrop-blur-sm sm:px-6"
      style={{ borderColor: "var(--color-bg-border)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-text-muted">Type</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <Chip
                  key={cat.id}
                  active={activeCategory === cat.id}
                  onClick={() => toggleFilter("category", cat.id, activeCategory)}
                >
                  {cat.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-text-muted">Level</span>
            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((d) => (
                <Chip
                  key={d.id}
                  active={activeDifficulty === d.id}
                  onClick={() => toggleFilter("difficulty", d.id, activeDifficulty)}
                >
                  {d.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* Players */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-text-muted">Players</span>
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

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-accent-warm transition-opacity hover:opacity-80"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
