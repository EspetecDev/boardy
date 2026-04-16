import Link from "next/link";
import { Clock, Users, Star, Calendar } from "lucide-react";
import type { Game } from "@/types/game";
import Badge from "@/components/ui/Badge";
import { formatPlayTime, formatPlayerCount } from "@/lib/utils";

interface GuideHeroProps {
  game: Game;
}

const categoryLabels: Record<string, string> = {
  "board-game": "Board Game",
  "card-game": "Card Game",
  "roleplaying": "Roleplaying Game",
  "dice-game": "Dice Game",
  "tile-game": "Tile Game",
  "party-game": "Party Game",
  "miniatures": "Miniatures Game",
  "puzzle": "Puzzle Game",
};

export default function GuideHero({ game }: GuideHeroProps) {
  return (
    <section
      className="relative overflow-hidden py-16"
      style={{
        "--game-accent": game.accentColor,
        "--game-accent-rgb": game.accentColorRgb,
        background: `linear-gradient(135deg, rgba(${game.accentColorRgb}, 0.12) 0%, rgba(10,11,14,0) 60%)`,
      } as React.CSSProperties}
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: game.accentColor }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="transition-colors hover:text-text-primary">Home</Link>
          <span>/</span>
          <Link href="/games" className="transition-colors hover:text-text-primary">Games</Link>
          <span>/</span>
          <span className="text-text-secondary">{game.name}</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            {/* Category + difficulty */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="category">
                {categoryLabels[game.category] ?? game.category}
              </Badge>
              {game.subcategory && (
                <Badge variant="outline">{game.subcategory}</Badge>
              )}
              <Badge variant="difficulty" difficulty={game.difficulty}>
                {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="mb-3 font-display text-4xl font-black text-text-primary sm:text-5xl lg:text-6xl">
              {game.name}
            </h1>
            <p className="mb-4 text-lg font-medium" style={{ color: game.accentColor }}>
              {game.tagline}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary">
              {game.description}
            </p>
          </div>

          {/* Stats card */}
          <div
            className="shrink-0 rounded-2xl border p-5 lg:min-w-[220px]"
            style={{
              background: "var(--color-bg-surface)",
              borderColor: `rgba(${game.accentColorRgb}, 0.2)`,
            }}
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              At a Glance
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="h-4 w-4" /> Players
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {formatPlayerCount(game.playerCount.min, game.playerCount.max, game.playerCount.ideal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="h-4 w-4" /> Play Time
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {formatPlayTime(game.playTime.min, game.playTime.max)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-text-secondary">
                  <Star className="h-4 w-4" /> Age
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {game.ageRange.min}+
                </span>
              </div>
              {game.year && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="h-4 w-4" /> Year
                  </span>
                  <span className="text-sm font-semibold text-text-primary">{game.year}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {game.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5 border-t pt-4" style={{ borderColor: "var(--color-bg-border)" }}>
                {game.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2 py-0.5 text-xs text-text-muted"
                    style={{ background: "var(--color-bg-elevated)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Objective callout */}
        <div
          className="mt-8 rounded-xl border-l-4 p-4"
          style={{
            borderColor: game.accentColor,
            background: `rgba(${game.accentColorRgb}, 0.06)`,
          }}
        >
          <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-text-muted">
            Objective
          </span>
          <p className="text-base font-medium text-text-primary">{game.guide.objective}</p>
        </div>
      </div>
    </section>
  );
}
