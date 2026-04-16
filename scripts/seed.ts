/**
 * Seed script — populates the Supabase `games` table from the bundled JSON files.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJhb... \
 *   npm run db:seed
 *
 * Requires the schema to already exist (run supabase/schema.sql first).
 * Uses upsert so it is safe to re-run at any time.
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load .env.local for local use; CI/CD injects vars directly.
config({ path: ".env.local" });

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing env vars.\n" +
      "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running the seed."
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

// ── Import game data ──────────────────────────────────────────────────────────
// JSON imports work natively with tsx (no extra config needed).

import chess from "../src/data/games/chess.json" assert { type: "json" };
import catan from "../src/data/games/catan.json" assert { type: "json" };
import uno from "../src/data/games/uno.json" assert { type: "json" };
import texasHoldem from "../src/data/games/texas-holdem.json" assert { type: "json" };
import dnd from "../src/data/games/dungeons-and-dragons.json" assert { type: "json" };
import pandemic from "../src/data/games/pandemic.json" assert { type: "json" };

const games = [chess, catan, uno, texasHoldem, dnd, pandemic];

// ── Transform to DB rows ──────────────────────────────────────────────────────

function toRow(g: (typeof games)[number]) {
  return {
    id:                 g.id,
    slug:               g.slug,
    name:               g.name,
    tagline:            g.tagline,
    description:        g.description,
    category:           g.category,
    subcategory:        g.subcategory ?? null,
    difficulty:         g.difficulty,
    player_count_min:   g.playerCount.min,
    player_count_max:   g.playerCount.max,
    player_count_ideal: g.playerCount.ideal ?? null,
    play_time_min:      g.playTime.min,
    play_time_max:      g.playTime.max,
    age_min:            g.ageRange.min,
    age_max:            g.ageRange.max ?? null,
    year:               g.year ?? null,
    designer:           g.designer ?? null,
    publisher:          g.publisher ?? null,
    accent_color:       g.accentColor,
    accent_color_rgb:   g.accentColorRgb,
    featured:           g.featured ?? false,
    tags:               g.tags,
    related_games:      g.relatedGames ?? [],
    guide:              g.guide,
    components:         g.components ?? [],
    variants:           g.variants ?? [],
    tips:               g.tips ?? [],
  };
}

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`Seeding ${games.length} games into ${url} …\n`);

  const rows = games.map(toRow);

  const { data, error } = await supabase
    .from("games")
    .upsert(rows, { onConflict: "id" })
    .select("id, name");

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log("Seeded successfully:");
  data?.forEach((r) => console.log(`  ✓ ${r.name} (${r.id})`));
  console.log(`\nDone. ${data?.length ?? 0} rows upserted.`);
}

seed();
