import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGamesByCategory } from "@/lib/games";
import { categories } from "@/data/categories";
import GameCard from "@/components/games/GameCard";
import type { GameCategory } from "@/types/game";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return {};
  return {
    title: `${cat.name} Guides | Boardy`,
    description: `Browse all ${cat.name.toLowerCase()} game guides with rules and visual diagrams.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) notFound();

  const games = await getGamesByCategory(category as GameCategory);

  return (
    <>
      <div
        className="border-b px-4 py-12 sm:px-6"
        style={{
          background: `linear-gradient(135deg, rgba(${hexToRgb(cat.color)}, 0.08) 0%, transparent 60%)`,
          borderColor: "var(--color-bg-border)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-primary">Home</Link>
            <span>/</span>
            <span className="text-text-secondary">{cat.name}</span>
          </nav>
          <h1 className="mb-2 font-display text-4xl font-black text-text-primary">
            {cat.name}
          </h1>
          <p className="text-text-secondary">{cat.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {games.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-4xl">🎮</p>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">No guides yet</h3>
            <p className="mb-6 text-text-secondary">We&apos;re working on adding {cat.name.toLowerCase()} guides.</p>
            <Link
              href="/games"
              className="inline-flex rounded-xl border px-5 py-2.5 text-sm font-medium text-text-secondary"
              style={{ borderColor: "var(--color-bg-border)" }}
            >
              Browse all games
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-muted">
              {games.length} guide{games.length !== 1 ? "s" : ""} in {cat.name}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <GameCard key={game.id} game={game} variant="grid" />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "108, 99, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
