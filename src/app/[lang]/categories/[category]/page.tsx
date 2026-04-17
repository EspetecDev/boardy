import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { hasLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGamesByCategory } from "@/lib/games";
import { categories } from "@/data/categories";
import GameCard from "@/components/games/GameCard";
import type { GameCategory } from "@/types/game";

interface Props {
  params: Promise<{ lang: string; category: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    categories.map((cat) => ({ lang, category: cat.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const catDict = dict.categories[category as keyof typeof dict.categories];
  if (!catDict) return {};
  return {
    title: `${catDict.name} | Boardy`,
    description: `Browse all ${catDict.name.toLowerCase()} game guides with rules and visual diagrams.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { lang, category } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const cat = categories.find((c) => c.id === category);
  if (!cat) notFound();

  const catDict = dict.categories[category as keyof typeof dict.categories];
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
            <Link href={localePath(lang, "/")} className="transition-colors hover:text-text-primary">
              {dict.guide.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{catDict?.name ?? cat.id}</span>
          </nav>
          <h1 className="mb-2 font-display text-4xl font-black text-text-primary">
            {catDict?.name ?? cat.id}
          </h1>
          <p className="text-text-secondary">{catDict?.description ?? ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {games.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-4xl">🎮</p>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              {dict.categoryPage.noGuidesTitle}
            </h3>
            <p className="mb-6 text-text-secondary">{dict.categoryPage.noGuidesDesc}</p>
            <Link
              href={localePath(lang, "/games")}
              className="inline-flex rounded-xl border px-5 py-2.5 text-sm font-medium text-text-secondary"
              style={{ borderColor: "var(--color-bg-border)" }}
            >
              {dict.categoryPage.browseAll}
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-muted">
              {games.length}{" "}
              {games.length !== 1
                ? dict.categoryPage.guideCountPlural
                : dict.categoryPage.guideCount}{" "}
              {catDict?.name ?? cat.id}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <GameCard key={game.id} game={game} variant="grid" lang={lang} dict={dict.games} />
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
