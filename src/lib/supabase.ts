import { createClient } from "@supabase/supabase-js";
import type { Game, GameCategory, Difficulty, PlayerCount, PlayTime, AgeRange } from "@/types/game";

// ── DB row type (snake_case, flat) ──────────────────────────────────────────

export interface GameRow {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: GameCategory;
  subcategory: string | null;
  difficulty: Difficulty;
  player_count_min: number;
  player_count_max: number;
  player_count_ideal: number | null;
  play_time_min: number;
  play_time_max: number;
  age_min: number;
  age_max: number | null;
  year: number | null;
  designer: string | null;
  publisher: string | null;
  accent_color: string;
  accent_color_rgb: string;
  featured: boolean;
  tags: string[];
  related_games: string[];
  guide: Game["guide"];
  components: Game["components"];
  variants: Game["variants"];
  tips: Game["tips"];
  created_at: string;
  updated_at: string;
}

// ── Client factory ───────────────────────────────────────────────────────────

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export const supabase = getClient();

// ── Row → Game mapper ────────────────────────────────────────────────────────

export function rowToGame(row: GameRow): Game {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    subcategory: row.subcategory ?? undefined,
    difficulty: row.difficulty,
    playerCount: {
      min: row.player_count_min,
      max: row.player_count_max,
      ideal: row.player_count_ideal ?? undefined,
    } as PlayerCount,
    playTime: { min: row.play_time_min, max: row.play_time_max } as PlayTime,
    ageRange: { min: row.age_min, max: row.age_max ?? undefined } as AgeRange,
    year: row.year ?? undefined,
    designer: row.designer ?? undefined,
    publisher: row.publisher ?? undefined,
    accentColor: row.accent_color,
    accentColorRgb: row.accent_color_rgb,
    featured: row.featured,
    tags: row.tags,
    relatedGames: row.related_games,
    guide: row.guide,
    components: row.components ?? [],
    variants: row.variants ?? [],
    tips: row.tips ?? [],
  };
}

// ── Game → DB row mapper (for seed script) ────────────────────────────────────

export function gameToRow(game: Game): Omit<GameRow, "created_at" | "updated_at"> {
  return {
    id: game.id,
    slug: game.slug,
    name: game.name,
    tagline: game.tagline,
    description: game.description,
    category: game.category,
    subcategory: game.subcategory ?? null,
    difficulty: game.difficulty,
    player_count_min: game.playerCount.min,
    player_count_max: game.playerCount.max,
    player_count_ideal: game.playerCount.ideal ?? null,
    play_time_min: game.playTime.min,
    play_time_max: game.playTime.max,
    age_min: game.ageRange.min,
    age_max: game.ageRange.max ?? null,
    year: game.year ?? null,
    designer: game.designer ?? null,
    publisher: game.publisher ?? null,
    accent_color: game.accentColor,
    accent_color_rgb: game.accentColorRgb,
    featured: game.featured ?? false,
    tags: game.tags,
    related_games: game.relatedGames ?? [],
    guide: game.guide,
    components: game.components ?? [],
    variants: game.variants ?? [],
    tips: game.tips ?? [],
  };
}
