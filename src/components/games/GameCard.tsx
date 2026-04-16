"use client";

import Link from "next/link";
import { Clock, Users, ChevronRight } from "lucide-react";
import type { Game } from "@/types/game";
import Badge from "@/components/ui/Badge";
import { formatPlayTime, formatPlayerCount } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  variant?: "grid" | "featured";
}

const categoryEmoji: Record<string, string> = {
  "board-game": "♟",
  "card-game": "🃏",
  "roleplaying": "🐉",
  "dice-game": "🎲",
  "tile-game": "⬡",
  "party-game": "🎉",
  "miniatures": "⚔",
  "puzzle": "🧩",
};

export default function GameCard({ game, variant = "grid" }: GameCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/games/${game.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: `rgba(${game.accentColorRgb}, 0.25)`,
          background: "var(--color-bg-surface)",
        }}
      >
        {/* Gradient header */}
        <div
          className="relative flex h-44 items-end p-5"
          style={{
            background: `linear-gradient(135deg, rgba(${game.accentColorRgb}, 0.3) 0%, rgba(${game.accentColorRgb}, 0.05) 100%)`,
          }}
        >
          <div
            className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
            style={{ background: `rgba(${game.accentColorRgb}, 0.15)` }}
          >
            {categoryEmoji[game.category] ?? "🎮"}
          </div>

          <div>
            <Badge variant="difficulty" difficulty={game.difficulty} className="mb-2">
              {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
            </Badge>
            <h3 className="font-display text-2xl font-bold text-text-primary">{game.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
            {game.tagline}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <Users className="h-3.5 w-3.5" />
                {formatPlayerCount(game.playerCount.min, game.playerCount.max)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <Clock className="h-3.5 w-3.5" />
                {formatPlayTime(game.playTime.min, game.playTime.max)}
              </span>
            </div>
            <span
              className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
              style={{ color: game.accentColor }}
            >
              Read guide <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderColor: "var(--color-bg-border)",
        background: "var(--color-bg-surface)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(${game.accentColorRgb}, 0.4)`;
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px rgba(${game.accentColorRgb}, 0.15)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-bg-border)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
      }}
    >
      {/* Top color band */}
      <div
        className="h-1.5 w-full"
        style={{ background: game.accentColor }}
      />

      <div className="p-4">
        {/* Icon + title row */}
        <div className="mb-3 flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
            style={{ background: `rgba(${game.accentColorRgb}, 0.12)` }}
          >
            {categoryEmoji[game.category] ?? "🎮"}
          </div>
          <Badge variant="difficulty" difficulty={game.difficulty}>
            {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
          </Badge>
        </div>

        <h3 className="mb-1 font-display text-lg font-bold text-text-primary">{game.name}</h3>
        <p className="mb-3 text-xs leading-relaxed text-text-secondary line-clamp-2">{game.tagline}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 border-t pt-3" style={{ borderColor: "var(--color-bg-border)" }}>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Users className="h-3 w-3" />
            {game.playerCount.min === game.playerCount.max
              ? `${game.playerCount.min}p`
              : `${game.playerCount.min}–${game.playerCount.max}p`}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock className="h-3 w-3" />
            {formatPlayTime(game.playTime.min, game.playTime.max)}
          </span>
          <span className="ml-auto text-xs font-medium transition-colors" style={{ color: game.accentColor }}>
            Guide →
          </span>
        </div>
      </div>
    </Link>
  );
}
