-- Boardy: Tabletop Games Guide Site
-- Run this in your Supabase SQL editor to create the schema

create table if not exists games (
  -- Identity
  id           text primary key,
  slug         text unique not null,
  name         text not null,
  tagline      text not null,
  description  text not null,

  -- Classification (flat columns for filtering)
  category     text not null,
  subcategory  text,
  difficulty   text not null check (difficulty in ('beginner','intermediate','advanced','expert')),

  -- Player count (flat for range queries)
  player_count_min   integer not null,
  player_count_max   integer not null,
  player_count_ideal integer,

  -- Play time in minutes
  play_time_min integer not null,
  play_time_max integer not null,

  -- Age
  age_min integer not null,
  age_max integer,

  -- Metadata
  year      integer,
  designer  text,
  publisher text,

  -- Styling
  accent_color     text not null,
  accent_color_rgb text not null,

  -- Flags
  featured boolean not null default false,

  -- Arrays
  tags          text[] not null default '{}',
  related_games text[] not null default '{}',

  -- Rich nested content stored as JSONB
  guide      jsonb not null,
  components jsonb not null default '[]',
  variants   jsonb not null default '[]',
  tips       jsonb not null default '[]',

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for common filter queries
create index if not exists games_category_idx   on games (category);
create index if not exists games_difficulty_idx on games (difficulty);
create index if not exists games_featured_idx   on games (featured) where featured = true;
create index if not exists games_player_count_idx on games (player_count_min, player_count_max);
create index if not exists games_tags_idx       on games using gin (tags);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists games_updated_at on games;
create trigger games_updated_at
  before update on games
  for each row execute function set_updated_at();

-- Enable Row Level Security (read-only public access)
alter table games enable row level security;

drop policy if exists "games_public_read" on games;
create policy "games_public_read"
  on games for select
  using (true);
