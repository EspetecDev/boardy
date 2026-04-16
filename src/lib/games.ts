import type { Game, GameCategory, Difficulty } from "@/types/game";
import { allGames } from "@/data/index";

export function getAllGames(): Game[] {
  return allGames;
}

export function getGame(slug: string): Game | undefined {
  return allGames.find((g) => g.slug === slug);
}

export function getFeaturedGames(): Game[] {
  return allGames.filter((g) => g.featured);
}

export function getGamesByCategory(category: GameCategory): Game[] {
  return allGames.filter((g) => g.category === category);
}

export function getRelatedGames(game: Game): Game[] {
  if (!game.relatedGames?.length) return [];
  return game.relatedGames
    .map((slug) => allGames.find((g) => g.slug === slug))
    .filter((g): g is Game => g !== undefined)
    .slice(0, 3);
}

export function getAllSlugs(): string[] {
  return allGames.map((g) => g.slug);
}

export interface FilterState {
  search: string;
  category: string;
  difficulty: string;
  players: string;
}

export function filterGames(games: Game[], filters: FilterState): Game[] {
  let result = games;

  if (filters.category) {
    result = result.filter((g) => g.category === filters.category);
  }

  if (filters.difficulty) {
    result = result.filter((g) => g.difficulty === filters.difficulty);
  }

  if (filters.players) {
    const count = parseInt(filters.players);
    if (!isNaN(count)) {
      result = result.filter(
        (g) => g.playerCount.min <= count && g.playerCount.max >= count
      );
    }
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.tagline.toLowerCase().includes(query) ||
        g.tags.some((t) => t.includes(query)) ||
        g.category.includes(query)
    );
  }

  return result;
}

export const difficultyOrder: Difficulty[] = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
];

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};
