interface Hex {
  q: number;
  r: number;
  type: string;
  number?: number;
}

const TERRAIN_COLORS: Record<string, string> = {
  forest:  "#2d6a4f",
  pasture: "#95d5b2",
  fields:  "#e9c46a",
  mountains: "#6b7280",
  hills:   "#c1440e",
  desert:  "#d4a853",
  ocean:   "#1e3a5f",
};

const TERRAIN_LABELS: Record<string, string> = {
  forest:  "🌲",
  pasture: "🐑",
  fields:  "🌾",
  mountains: "⛰",
  hills:   "🧱",
  desert:  "🏜",
};

const HEXES: Hex[] = [
  // Row 0 (3 hexes)
  { q: 0, r: -2, type: "mountains", number: 10 },
  { q: 1, r: -2, type: "pasture",   number: 2  },
  { q: 2, r: -2, type: "forest",    number: 9  },
  // Row 1 (4 hexes)
  { q: -1, r: -1, type: "fields",   number: 12 },
  { q: 0,  r: -1, type: "hills",    number: 6  },
  { q: 1,  r: -1, type: "pasture",  number: 4  },
  { q: 2,  r: -1, type: "hills",    number: 10 },
  // Row 2 (5 hexes, center)
  { q: -2, r: 0,  type: "fields",   number: 9  },
  { q: -1, r: 0,  type: "forest",   number: 11 },
  { q: 0,  r: 0,  type: "desert"              },
  { q: 1,  r: 0,  type: "forest",   number: 3  },
  { q: 2,  r: 0,  type: "mountains",number: 8  },
  // Row 3 (4 hexes)
  { q: -2, r: 1,  type: "forest",   number: 8  },
  { q: -1, r: 1,  type: "mountains",number: 3  },
  { q: 0,  r: 1,  type: "fields",   number: 4  },
  { q: 1,  r: 1,  type: "pasture",  number: 5  },
  // Row 4 (3 hexes)
  { q: -2, r: 2,  type: "hills",    number: 5  },
  { q: -1, r: 2,  type: "fields",   number: 6  },
  { q: 0,  r: 2,  type: "pasture",  number: 11 },
];

function hexToXY(q: number, r: number, size: number) {
  const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const y = size * ((3 / 2) * r);
  return { x, y };
}

function hexCorners(cx: number, cy: number, size: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
  }).join(" ");
}

export default function CatanBoard() {
  const HEX_SIZE = 40;
  const WIDTH = 440;
  const HEIGHT = 400;
  const CX = WIDTH / 2;
  const CY = HEIGHT / 2 - 10;

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        style={{ maxWidth: 440 }}
        aria-label="Catan board layout"
        role="img"
      >
        {HEXES.map((hex, i) => {
          const { x, y } = hexToXY(hex.q, hex.r, HEX_SIZE);
          const cx = CX + x;
          const cy = CY + y;
          const corners = hexCorners(cx, cy, HEX_SIZE - 1);
          const color = TERRAIN_COLORS[hex.type] ?? "#555";
          const isRedNumber = hex.number === 6 || hex.number === 8;

          return (
            <g key={i}>
              <polygon
                points={corners}
                fill={color}
                stroke="#0a0b0e"
                strokeWidth={1.5}
                opacity={0.9}
              />
              {/* Terrain emoji */}
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={16}
              >
                {TERRAIN_LABELS[hex.type]}
              </text>
              {/* Number token */}
              {hex.number !== undefined && (
                <>
                  <circle cx={cx} cy={cy + 9} r={10} fill="rgba(245,240,225,0.92)" />
                  <text
                    x={cx}
                    y={cy + 9}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9}
                    fontWeight="bold"
                    fontFamily="monospace"
                    fill={isRedNumber ? "#dc2626" : "#1a1a1a"}
                  >
                    {hex.number}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
