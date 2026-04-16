import type { Game } from "@/types/game";
import chessData from "./games/chess.json";
import catanData from "./games/catan.json";
import unoData from "./games/uno.json";
import texasHoldemData from "./games/texas-holdem.json";
import dndData from "./games/dungeons-and-dragons.json";
import pandemicData from "./games/pandemic.json";

export const allGames: Game[] = [
  chessData as Game,
  catanData as Game,
  unoData as Game,
  texasHoldemData as Game,
  dndData as Game,
  pandemicData as Game,
];

export { categories } from "./categories";
