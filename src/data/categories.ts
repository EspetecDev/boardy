import type { GameCategory } from "@/types/game";

export interface Category {
  id: GameCategory;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: "board-game", icon: "LayoutGrid", color: "#6c63ff" },
  { id: "card-game", icon: "Layers", color: "#4cc9f0" },
  { id: "roleplaying", icon: "Sword", color: "#ef476f" },
  { id: "dice-game", icon: "Dices", color: "#ffd166" },
  { id: "tile-game", icon: "Grid3x3", color: "#06d6a0" },
  { id: "party-game", icon: "PartyPopper", color: "#ff6b6b" },
  { id: "miniatures", icon: "Shield", color: "#a78bfa" },
  { id: "puzzle", icon: "Puzzle", color: "#f97316" },
];
