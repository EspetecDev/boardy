const DICE = [
  { sides: 4,   label: "d4",  color: "#ef476f", points: "50,5 95,90 5,90" },
  { sides: 6,   label: "d6",  color: "#ffd166" },
  { sides: 8,   label: "d8",  color: "#06d6a0" },
  { sides: 10,  label: "d10", color: "#4cc9f0" },
  { sides: 12,  label: "d12", color: "#a78bfa" },
  { sides: 20,  label: "d20", color: "#6c63ff" },
  { sides: 100, label: "d%",  color: "#ff6b6b" },
];

function D4({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <polygon points="50,8 92,88 8,88" fill={color} opacity={0.9} stroke={color} strokeWidth={1} />
      <text x="50" y="72" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">4</text>
    </svg>
  );
}

function D6({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <rect x="8" y="8" width="84" height="84" rx="14" fill={color} opacity={0.9} />
      {/* pip pattern for 6 */}
      {[25, 50, 75].map((x) =>
        [30, 70].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={7} fill="white" opacity={0.9} />
        ))
      )}
    </svg>
  );
}

function D8({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <polygon points="50,5 95,50 50,95 5,50" fill={color} opacity={0.9} />
      <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="white">8</text>
    </svg>
  );
}

function D10({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <polygon points="50,5 90,35 80,80 20,80 10,35" fill={color} opacity={0.9} />
      <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold" fill="white">10</text>
    </svg>
  );
}

function D12({ color }: { color: string }) {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 12 - Math.PI / 2;
    return `${50 + 42 * Math.cos(angle)},${50 + 42 * Math.sin(angle)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <polygon points={pts} fill={color} opacity={0.9} />
      <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold" fill="white">12</text>
    </svg>
  );
}

function D20({ color }: { color: string }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return `${50 + 44 * Math.cos(angle)},${50 + 44 * Math.sin(angle)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <polygon points={pts} fill={color} opacity={0.9} />
      <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="bold" fill="white">20</text>
    </svg>
  );
}

function D100({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" width="52" height="52">
      <circle cx="50" cy="50" r="44" fill={color} opacity={0.9} />
      <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold" fill="white">d%</text>
    </svg>
  );
}

const DICE_COMPONENTS: Record<number, React.ComponentType<{ color: string }>> = {
  4: D4, 6: D6, 8: D8, 10: D10, 12: D12, 20: D20, 100: D100,
};

export default function DiceDisplay() {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6">
        {DICE.map((die) => {
          const DieComp = DICE_COMPONENTS[die.sides];
          return (
            <div key={die.sides} className="flex flex-col items-center gap-2">
              <DieComp color={die.color} />
              <span
                className="font-mono text-sm font-bold"
                style={{ color: die.color }}
              >
                {die.label}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="mt-6 rounded-xl p-4 text-center text-sm"
        style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" }}
      >
        <span className="font-semibold" style={{ color: "var(--color-accent-primary)" }}>d20</span> is the most important die — roll it to determine success or failure for almost every action in D&D.
      </div>
    </div>
  );
}
