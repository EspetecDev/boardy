import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedGames from "@/components/home/FeaturedGames";
import HowItWorks from "@/components/home/HowItWorks";
import { getFeaturedGames, getAllGames } from "@/lib/games";
import { categories } from "@/data/categories";
import GameCard from "@/components/games/GameCard";

export default async function HomePage() {
  const [featuredGames, allGames] = await Promise.all([
    getFeaturedGames(),
    getAllGames(),
  ]);
  const recentGames = allGames.filter((g) => !g.featured).slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedGames games={featuredGames} />
      <CategoryGrid categories={categories} />
      <HowItWorks />

      {/* More games section */}
      <section className="px-4 pb-20 sm:px-6" style={{ background: "var(--color-bg-surface)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              More Games
            </h2>
            <p className="mt-1 text-text-secondary">Explore the full guide library</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentGames.map((game) => (
              <GameCard key={game.id} game={game} variant="grid" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
