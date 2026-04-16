import type { GameCategory } from "@/types/game";

export interface Category {
  id: GameCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "board-game",
    name: "Board Games",
    description: "Classic and modern games played on a board",
    icon: "LayoutGrid",
    color: "#6c63ff",
  },
  {
    id: "card-game",
    name: "Card Games",
    description: "Games centered around decks of cards",
    icon: "Layers",
    color: "#4cc9f0",
  },
  {
    id: "roleplaying",
    name: "RPGs",
    description: "Collaborative storytelling and adventure",
    icon: "Sword",
    color: "#ef476f",
  },
  {
    id: "dice-game",
    name: "Dice Games",
    description: "Games driven by dice rolls and probability",
    icon: "Dices",
    color: "#ffd166",
  },
  {
    id: "tile-game",
    name: "Tile Games",
    description: "Build and explore with modular tiles",
    icon: "Grid3x3",
    color: "#06d6a0",
  },
  {
    id: "party-game",
    name: "Party Games",
    description: "High-energy fun for groups",
    icon: "PartyPopper",
    color: "#ff6b6b",
  },
  {
    id: "miniatures",
    name: "Miniatures",
    description: "Tactical games with painted miniature figures",
    icon: "Shield",
    color: "#a78bfa",
  },
  {
    id: "puzzle",
    name: "Puzzle Games",
    description: "Cooperative problem-solving challenges",
    icon: "Puzzle",
    color: "#f97316",
  },
];
