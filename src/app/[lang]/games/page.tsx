import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllGames } from "@/lib/games";
import GameGrid from "@/components/games/GameGrid";
import FilterBar from "@/components/games/FilterBar";
import SearchInput from "@/components/games/SearchInput";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.games.title} | Boardy`,
    description: `${dict.games.title} — ${dict.games.subtitle}`,
  };
}

export default async function GamesPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const games = await getAllGames();

  return (
    <>
      <div
        className="border-b px-4 py-10 sm:px-6"
        style={{
          background: "linear-gradient(180deg, rgba(108,99,255,0.06) 0%, transparent 100%)",
          borderColor: "var(--color-bg-border)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 font-display text-4xl font-black text-text-primary">
            {dict.games.title}
          </h1>
          <p className="mb-6 text-text-secondary">
            {games.length} {dict.games.subtitle}
          </p>
          <div className="max-w-md">
            <Suspense>
              <SearchInput placeholder={dict.games.searchPlaceholder} />
            </Suspense>
          </div>
        </div>
      </div>

      <Suspense>
        <FilterBar dict={dict.filters} difficultyDict={dict.difficulty} />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Suspense>
          <GameGrid games={games} lang={lang} dict={dict.games} />
        </Suspense>
      </div>
    </>
  );
}
