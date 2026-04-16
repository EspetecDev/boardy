interface CardLayoutProps {
  variant?: "uno-setup" | "poker-hands";
}

const UNO_COLORS = [
  { name: "Red",    bg: "#ef4444", text: "#fff" },
  { name: "Blue",   bg: "#3b82f6", text: "#fff" },
  { name: "Green",  bg: "#22c55e", text: "#fff" },
  { name: "Yellow", bg: "#eab308", text: "#1a1a1a" },
];

const UNO_ACTIONS = [
  { symbol: "⊘", label: "Skip",    color: "#ef4444" },
  { symbol: "⟲", label: "Reverse", color: "#3b82f6" },
  { symbol: "+2", label: "Draw 2", color: "#22c55e" },
  { symbol: "W",  label: "Wild",   color: "#6c63ff" },
  { symbol: "+4", label: "Wild +4",color: "#1a1a1a" },
];

const POKER_HANDS = [
  { name: "Royal Flush",     example: "A♠ K♠ Q♠ J♠ 10♠", rank: 1 },
  { name: "Straight Flush",  example: "9♥ 8♥ 7♥ 6♥ 5♥",  rank: 2 },
  { name: "Four of a Kind",  example: "K♠ K♥ K♦ K♣ A♠",  rank: 3 },
  { name: "Full House",      example: "Q♠ Q♥ Q♦ 8♣ 8♠",  rank: 4 },
  { name: "Flush",           example: "A♦ J♦ 8♦ 6♦ 2♦",  rank: 5 },
  { name: "Straight",        example: "10♠ 9♥ 8♦ 7♣ 6♠", rank: 6 },
  { name: "Three of a Kind", example: "7♠ 7♥ 7♦ K♣ 2♠",  rank: 7 },
  { name: "Two Pair",        example: "J♠ J♥ 4♣ 4♦ A♠",  rank: 8 },
  { name: "One Pair",        example: "9♠ 9♥ K♦ 5♣ 2♠",  rank: 9 },
  { name: "High Card",       example: "A♠ J♦ 8♣ 5♥ 2♠",  rank: 10 },
];

function UnoSetup() {
  return (
    <div className="space-y-6">
      {/* Color cards */}
      <div>
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
          Card Colors
        </p>
        <div className="flex justify-center gap-3">
          {UNO_COLORS.map((c) => (
            <div
              key={c.name}
              className="flex h-16 w-12 flex-col items-center justify-center rounded-lg text-center font-bold shadow-md"
              style={{ background: c.bg, color: c.text }}
            >
              <span className="text-xl">7</span>
              <span className="text-xs">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div>
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
          Action Cards
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {UNO_ACTIONS.map((a) => (
            <div
              key={a.label}
              className="flex h-16 w-14 flex-col items-center justify-center rounded-lg text-center shadow-md"
              style={{ background: a.color, color: "#fff" }}
            >
              <span className="text-lg font-black">{a.symbol}</span>
              <span className="text-xs font-semibold">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PokerHands() {
  return (
    <div className="space-y-2">
      {POKER_HANDS.map((hand) => (
        <div
          key={hand.rank}
          className="flex items-center gap-3 rounded-lg p-2.5"
          style={{ background: "var(--color-bg-elevated)" }}
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
            style={{ background: hand.rank <= 3 ? "#6c63ff" : "var(--color-bg-border)" }}
          >
            {hand.rank}
          </span>
          <span className="w-36 text-sm font-semibold text-text-primary">{hand.name}</span>
          <span className="font-mono text-xs tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {hand.example}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CardLayout({ variant = "uno-setup" }: CardLayoutProps) {
  if (variant === "poker-hands") return <PokerHands />;
  return <UnoSetup />;
}
