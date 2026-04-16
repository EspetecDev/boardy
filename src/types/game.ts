export type GameCategory =
  | "board-game"
  | "card-game"
  | "roleplaying"
  | "dice-game"
  | "tile-game"
  | "miniatures"
  | "party-game"
  | "puzzle";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface PlayerCount {
  min: number;
  max: number;
  ideal?: number;
}

export interface PlayTime {
  min: number;
  max: number;
}

export interface AgeRange {
  min: number;
  max?: number;
}

export interface GameComponent {
  name: string;
  quantity: number;
  description?: string;
  icon?: string;
}

export interface GuideStep {
  number: number;
  title: string;
  description: string;
  tip?: string;
  diagramHighlight?: string;
}

export interface Rule {
  id: string;
  title: string;
  description: string;
  example?: string;
  important?: boolean;
}

export interface DiagramConfig {
  type: "board" | "card-layout" | "player-area" | "dice" | "custom";
  component: string;
  props?: Record<string, unknown>;
  caption?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  icon?: string;
  content?: string;
  steps?: GuideStep[];
  rules?: Rule[];
  diagram?: DiagramConfig;
}

export interface GameGuide {
  objective: string;
  quickRules?: string[];
  sections: GuideSection[];
}

export interface Tip {
  category: "strategy" | "etiquette" | "beginner" | "advanced";
  title: string;
  content: string;
}

export interface GameVariant {
  name: string;
  description: string;
  difficulty?: Difficulty;
  playerCount?: PlayerCount;
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: GameCategory;
  subcategory?: string;
  difficulty: Difficulty;
  playerCount: PlayerCount;
  playTime: PlayTime;
  ageRange: AgeRange;
  year?: number;
  designer?: string;
  publisher?: string;
  tags: string[];
  accentColor: string;
  accentColorRgb: string;
  featured?: boolean;
  guide: GameGuide;
  components: GameComponent[];
  variants?: GameVariant[];
  tips?: Tip[];
  relatedGames?: string[];
}
