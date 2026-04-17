import type { Game, GameCategory, Difficulty } from "@/types/game";
import { allGames as jsonGames } from "@/data/index";
import { supabase, rowToGame, type GameRow } from "./supabase";

// ── Source selection ─────────────────────────────────────────────────────────
// Uses Supabase when env vars are present; falls back to bundled JSON for
// local dev or when the DB isn't configured yet.

const useDb = !!supabase;

// ── Data access ──────────────────────────────────────────────────────────────

export async function getAllGames(): Promise<Game[]> {
  if (!useDb) return jsonGames;
  const { data, error } = await supabase!
    .from("games")
    .select("*")
    .order("name");
  if (error) { console.warn("getAllGames DB error, using JSON fallback:", error.message); return jsonGames; }
  return (data as GameRow[]).map(rowToGame);
}

export async function getGame(slug: string): Promise<Game | undefined> {
  if (!useDb) return jsonGames.find((g) => g.slug === slug);
  const { data, error } = await supabase!
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error?.code === "PGRST116") return undefined;
  if (error) { console.warn("getGame DB error, using JSON fallback:", error.message); return jsonGames.find((g) => g.slug === slug); }
  return rowToGame(data as GameRow);
}

export async function getFeaturedGames(): Promise<Game[]> {
  if (!useDb) return jsonGames.filter((g) => g.featured);
  const { data, error } = await supabase!
    .from("games")
    .select("*")
    .eq("featured", true)
    .order("name");
  if (error) { console.warn("getFeaturedGames DB error, using JSON fallback:", error.message); return jsonGames.filter((g) => g.featured); }
  return (data as GameRow[]).map(rowToGame);
}

export async function getGamesByCategory(category: GameCategory): Promise<Game[]> {
  if (!useDb) return jsonGames.filter((g) => g.category === category);
  const { data, error } = await supabase!
    .from("games")
    .select("*")
    .eq("category", category)
    .order("name");
  if (error) { console.warn("getGamesByCategory DB error, using JSON fallback:", error.message); return jsonGames.filter((g) => g.category === category); }
  return (data as GameRow[]).map(rowToGame);
}

export async function getRelatedGames(game: Game): Promise<Game[]> {
  if (!game.relatedGames?.length) return [];
  if (!useDb) {
    return game.relatedGames
      .map((slug) => jsonGames.find((g) => g.slug === slug))
      .filter((g): g is Game => g !== undefined)
      .slice(0, 3);
  }
  const { data, error } = await supabase!
    .from("games")
    .select("*")
    .in("slug", game.relatedGames)
    .limit(3);
  if (error) {
    console.warn("getRelatedGames DB error, using JSON fallback:", error.message);
    return game.relatedGames.map((slug) => jsonGames.find((g) => g.slug === slug)).filter((g): g is Game => g !== undefined).slice(0, 3);
  }
  return (data as GameRow[]).map(rowToGame);
}

export async function getAllSlugs(): Promise<string[]> {
  if (!useDb) return jsonGames.map((g) => g.slug);
  const { data, error } = await supabase!
    .from("games")
    .select("slug");
  if (error) { console.warn("getAllSlugs DB error, using JSON fallback:", error.message); return jsonGames.map((g) => g.slug); }
  return (data as { slug: string }[]).map((r) => r.slug);
}

// ── Client-side filter (pure, synchronous — operates on already-fetched data) ─

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

// ── Constants ─────────────────────────────────────────────────────────────────

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
