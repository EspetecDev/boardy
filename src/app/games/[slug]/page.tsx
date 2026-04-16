import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGame, getAllSlugs, getRelatedGames } from "@/lib/games";
import GuideHero from "@/components/guide/GuideHero";
import GuideNav from "@/components/guide/GuideNav";
import RuleSection from "@/components/guide/RuleSection";
import ComponentsList from "@/components/guide/ComponentsList";
import TipCard from "@/components/guide/TipCard";
import GameCard from "@/components/games/GameCard";
import { BookOpen, Package } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: `How to Play ${game.name} | Boardy`,
    description: game.description,
    keywords: [game.name, "how to play", "rules", "guide", ...game.tags],
    openGraph: {
      title: `How to Play ${game.name}`,
      description: game.tagline,
      type: "article",
    },
  };
}

export default async function GameGuidePage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const relatedGames = getRelatedGames(game);

  return (
    <div style={{ "--game-accent": game.accentColor, "--game-accent-rgb": game.accentColorRgb } as React.CSSProperties}>
      <GuideHero game={game} />

      {/* Quick rules callout */}
      {game.guide.quickRules && game.guide.quickRules.length > 0 && (
        <div
          className="border-b px-4 py-4 sm:px-6"
          style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}
        >
          <div className="mx-auto max-w-7xl">
            <details className="group">
              <summary
                className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold"
                style={{ color: game.accentColor }}
              >
                <BookOpen className="h-4 w-4" />
                Quick Reference Rules
                <span className="ml-auto text-xs font-normal text-text-muted group-open:hidden">Expand</span>
                <span className="ml-auto hidden text-xs font-normal text-text-muted group-open:block">Collapse</span>
              </summary>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {game.guide.quickRules.map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg p-3 text-sm text-text-secondary"
                    style={{ background: "var(--color-bg-elevated)" }}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                      style={{ background: game.accentColor }}
                    >
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex gap-10 lg:flex-row">
          {/* Sidebar nav */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <GuideNav sections={game.guide.sections} accentColor={game.accentColor} />
            </div>
          </aside>

          {/* Guide sections */}
          <main className="min-w-0 flex-1">
            {game.guide.sections.map((section) => (
              <RuleSection key={section.id} section={section} game={game} />
            ))}

            {/* Components */}
            <div className="mb-14">
              <ComponentsList
                components={game.components}
                accentColor={game.accentColor}
                accentColorRgb={game.accentColorRgb}
              />
            </div>

            {/* Tips */}
            {game.tips && game.tips.length > 0 && (
              <div className="mb-14">
                <h2 className="mb-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
                  Tips & Strategy
                </h2>
                <div
                  className="mb-6 h-0.5 w-12 rounded-full"
                  style={{ background: game.accentColor }}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {game.tips.map((tip, i) => (
                    <TipCard key={i} tip={tip} />
                  ))}
                </div>
              </div>
            )}

            {/* Variants */}
            {game.variants && game.variants.length > 0 && (
              <div className="mb-14">
                <h2 className="mb-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
                  Variants & Expansions
                </h2>
                <div
                  className="mb-6 h-0.5 w-12 rounded-full"
                  style={{ background: game.accentColor }}
                />
                <div className="grid gap-3">
                  {game.variants.map((variant) => (
                    <div
                      key={variant.name}
                      className="rounded-xl border p-4"
                      style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">{variant.name}</h4>
                      <p className="text-sm leading-relaxed text-text-secondary">{variant.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Related games */}
        {relatedGames.length > 0 && (
          <div className="mt-10 border-t pt-12" style={{ borderColor: "var(--color-bg-border)" }}>
            <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
              You might also like
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGames.map((g) => (
                <GameCard key={g.id} game={g} variant="grid" />
              ))}
            </div>
          </div>
        )}

        {/* Back to browse */}
        <div className="mt-12 text-center">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            style={{ borderColor: "var(--color-bg-border)" }}
          >
            <Package className="h-4 w-4" /> Browse all games
          </Link>
        </div>
      </div>
    </div>
  );
}
