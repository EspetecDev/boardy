import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedGames from "@/components/home/FeaturedGames";
import HowItWorks from "@/components/home/HowItWorks";
import { getFeaturedGames, getAllGames } from "@/lib/games";
import { categories } from "@/data/categories";
import GameCard from "@/components/games/GameCard";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const [featuredGames, allGames] = await Promise.all([
    getFeaturedGames(),
    getAllGames(),
  ]);
  const recentGames = allGames.filter((g) => !g.featured).slice(0, 3);

  return (
    <>
      <HeroSection lang={lang} dict={dict.home.hero} />
      <StatsBar dict={dict.home.stats} />
      <FeaturedGames games={featuredGames} dict={dict.home.featured} gamesDict={dict.games} lang={lang} />
      <CategoryGrid categories={categories} dict={dict} lang={lang} />
      <HowItWorks dict={dict.home.howItWorks} />

      <section className="px-4 pb-20 sm:px-6" style={{ background: "var(--color-bg-surface)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              {dict.home.moreGames.title}
            </h2>
            <p className="mt-1 text-text-secondary">{dict.home.moreGames.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentGames.map((game) => (
              <GameCard key={game.id} game={game} variant="grid" lang={lang} dict={dict.games} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
