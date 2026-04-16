const PIECES: Record<string, string> = {
  // White pieces (uppercase)
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  // Black pieces (lowercase)
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
};

const INITIAL_POSITION = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export default function ChessBoard() {
  const CELL = 52;
  const LABEL = 18;
  const SIZE = CELL * 8 + LABEL * 2;

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        style={{ maxWidth: 480 }}
        aria-label="Chess initial position"
        role="img"
      >
        {/* Board squares */}
        {INITIAL_POSITION.map((row, rowIdx) =>
          row.map((piece, colIdx) => {
            const x = LABEL + colIdx * CELL;
            const y = LABEL + rowIdx * CELL;
            const isLight = (rowIdx + colIdx) % 2 === 0;
            return (
              <g key={`${rowIdx}-${colIdx}`}>
                <rect
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  fill={isLight ? "#e8e0d5" : "#b58863"}
                />
                {piece && (
                  <text
                    x={x + CELL / 2}
                    y={y + CELL / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={CELL * 0.65}
                    className="select-none"
                    style={{
                      filter: piece === piece.toUpperCase()
                        ? "drop-shadow(0 1px 1px rgba(0,0,0,0.4))"
                        : "drop-shadow(0 1px 1px rgba(0,0,0,0.6))",
                    }}
                  >
                    {PIECES[piece]}
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* File labels (a-h) */}
        {FILES.map((file, i) => (
          <text
            key={file}
            x={LABEL + i * CELL + CELL / 2}
            y={LABEL + CELL * 8 + LABEL / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="#a0a4b2"
            fontFamily="monospace"
          >
            {file}
          </text>
        ))}

        {/* Rank labels (1-8) */}
        {RANKS.map((rank, i) => (
          <text
            key={rank}
            x={LABEL / 2}
            y={LABEL + i * CELL + CELL / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="#a0a4b2"
            fontFamily="monospace"
          >
            {rank}
          </text>
        ))}

        {/* Board border */}
        <rect
          x={LABEL}
          y={LABEL}
          width={CELL * 8}
          height={CELL * 8}
          fill="none"
          stroke="#2a2d35"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
