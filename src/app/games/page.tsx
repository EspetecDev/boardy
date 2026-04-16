import { Suspense } from "react";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/games/GameGrid";
import FilterBar from "@/components/games/FilterBar";
import SearchInput from "@/components/games/SearchInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Games | Boardy",
  description: "Browse all tabletop game guides — filter by type, difficulty, and player count.",
};

export default async function GamesPage() {
  const games = await getAllGames();

  return (
    <>
      {/* Page header */}
      <div
        className="border-b px-4 py-10 sm:px-6"
        style={{
          background: "linear-gradient(180deg, rgba(108,99,255,0.06) 0%, transparent 100%)",
          borderColor: "var(--color-bg-border)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 font-display text-4xl font-black text-text-primary">All Games</h1>
          <p className="mb-6 text-text-secondary">
            {games.length} guides — find the perfect game for your group
          </p>
          <div className="max-w-md">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <Suspense>
        <FilterBar />
      </Suspense>

      {/* Game grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Suspense>
          <GameGrid games={games} />
        </Suspense>
      </div>
    </>
  );
}
