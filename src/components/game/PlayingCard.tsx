import React from "react";

type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface PlayingCardProps {
  suit: Suit;
  rank: Rank;
  held?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  animate?: boolean;
}

const getSuitColor = (suit: Suit) => {
  return suit === "♥" || suit === "♦" ? "#dc2626" : "#1e293b";
};

const getSuitSymbol = (suit: Suit) => {
  const symbols: Record<Suit, string> = {
    "♠": "♠",
    "♥": "♥",
    "♦": "♦",
    "♣": "♣",
  };
  return symbols[suit];
};

// Face card component with classic illustration style
const FaceCardIllustration = ({ rank, suit }: { rank: "J" | "Q" | "K"; suit: Suit }) => {
  const color = getSuitColor(suit);
  const isRed = suit === "♥" || suit === "♦";
  
  // Different face designs
  const faceConfigs = {
    J: {
      hairColor: isRed ? "#f59e0b" : "#374151",
      crownColor: "#dc2626",
      faceColor: "#fcd9b6",
      robeColor: isRed ? "#dc2626" : "#1e40af",
    },
    Q: {
      hairColor: isRed ? "#92400e" : "#1f2937",
      crownColor: "#f59e0b",
      faceColor: "#fcd9b6",
      robeColor: isRed ? "#7c3aed" : "#059669",
    },
    K: {
      hairColor: isRed ? "#78350f" : "#374151",
      crownColor: "#f59e0b",
      faceColor: "#fcd9b6",
      robeColor: isRed ? "#dc2626" : "#1e40af",
    },
  };

  const config = faceConfigs[rank];

  return (
    <svg viewBox="0 0 60 80" className="w-full h-full">
      {/* Background pattern */}
      <defs>
        <pattern id={`diagonal-${rank}-${suit}`} patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke={config.robeColor} strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      
      {/* Robe/body */}
      <rect x="10" y="40" width="40" height="40" fill={config.robeColor} />
      <rect x="10" y="40" width="40" height="40" fill={`url(#diagonal-${rank}-${suit})`} />
      
      {/* Decorative collar */}
      <polygon points="30,35 20,50 40,50" fill="#fbbf24" />
      <polygon points="30,38 23,48 37,48" fill={config.robeColor} />
      
      {/* Face */}
      <ellipse cx="30" cy="25" rx="12" ry="14" fill={config.faceColor} />
      
      {/* Hair */}
      {rank === "Q" ? (
        <>
          <ellipse cx="30" cy="16" rx="14" ry="10" fill={config.hairColor} />
          <path d="M16,20 Q15,35 20,40" fill={config.hairColor} />
          <path d="M44,20 Q45,35 40,40" fill={config.hairColor} />
        </>
      ) : (
        <ellipse cx="30" cy="14" rx="13" ry="8" fill={config.hairColor} />
      )}
      
      {/* Crown (for K and Q) or hat (for J) */}
      {rank === "K" && (
        <>
          <rect x="20" y="5" width="20" height="8" fill={config.crownColor} />
          <polygon points="20,5 25,0 25,5" fill={config.crownColor} />
          <polygon points="30,5 30,0 30,5" fill={config.crownColor} />
          <polygon points="35,5 35,0 40,5" fill={config.crownColor} />
          <circle cx="25" cy="8" r="2" fill="#fbbf24" />
          <circle cx="30" cy="8" r="2" fill="#fbbf24" />
          <circle cx="35" cy="8" r="2" fill="#fbbf24" />
        </>
      )}
      {rank === "Q" && (
        <>
          <ellipse cx="30" cy="6" rx="8" ry="4" fill={config.crownColor} />
          <circle cx="30" cy="4" r="3" fill="#fbbf24" />
        </>
      )}
      {rank === "J" && (
        <>
          <ellipse cx="30" cy="8" rx="10" ry="5" fill={config.crownColor} />
          <rect x="26" y="3" width="8" height="5" fill={config.crownColor} />
          <circle cx="30" cy="3" r="2" fill="#fbbf24" />
        </>
      )}
      
      {/* Eyes */}
      <ellipse cx="25" cy="23" rx="2" ry="2.5" fill="white" />
      <ellipse cx="35" cy="23" rx="2" ry="2.5" fill="white" />
      <circle cx="25" cy="24" r="1" fill="#1e293b" />
      <circle cx="35" cy="24" r="1" fill="#1e293b" />
      
      {/* Nose */}
      <path d="M30,25 L28,30 L32,30 Z" fill="#e5a88a" />
      
      {/* Mouth */}
      <path d="M26,33 Q30,36 34,33" stroke="#9a4a4a" strokeWidth="1" fill="none" />
      
      {/* Suit symbol on body */}
      <text x="30" y="70" textAnchor="middle" fontSize="16" fill={color}>
        {getSuitSymbol(suit)}
      </text>
    </svg>
  );
};

// Number card layout with suit symbols
const NumberCardLayout = ({ rank, suit }: { rank: Rank; suit: Suit }) => {
  const color = getSuitColor(suit);
  const symbol = getSuitSymbol(suit);
  
  const getSymbolPositions = (rank: Rank): { x: number; y: number; flip?: boolean }[] => {
    const positions: Record<string, { x: number; y: number; flip?: boolean }[]> = {
      "A": [{ x: 50, y: 50 }],
      "2": [{ x: 50, y: 25 }, { x: 50, y: 75, flip: true }],
      "3": [{ x: 50, y: 20 }, { x: 50, y: 50 }, { x: 50, y: 80, flip: true }],
      "4": [{ x: 30, y: 25 }, { x: 70, y: 25 }, { x: 30, y: 75, flip: true }, { x: 70, y: 75, flip: true }],
      "5": [{ x: 30, y: 25 }, { x: 70, y: 25 }, { x: 50, y: 50 }, { x: 30, y: 75, flip: true }, { x: 70, y: 75, flip: true }],
      "6": [{ x: 30, y: 25 }, { x: 70, y: 25 }, { x: 30, y: 50 }, { x: 70, y: 50 }, { x: 30, y: 75, flip: true }, { x: 70, y: 75, flip: true }],
      "7": [{ x: 30, y: 22 }, { x: 70, y: 22 }, { x: 50, y: 36 }, { x: 30, y: 50 }, { x: 70, y: 50 }, { x: 30, y: 78, flip: true }, { x: 70, y: 78, flip: true }],
      "8": [{ x: 30, y: 22 }, { x: 70, y: 22 }, { x: 50, y: 36 }, { x: 30, y: 50 }, { x: 70, y: 50 }, { x: 50, y: 64, flip: true }, { x: 30, y: 78, flip: true }, { x: 70, y: 78, flip: true }],
      "9": [{ x: 30, y: 20 }, { x: 70, y: 20 }, { x: 30, y: 38 }, { x: 70, y: 38 }, { x: 50, y: 50 }, { x: 30, y: 62, flip: true }, { x: 70, y: 62, flip: true }, { x: 30, y: 80, flip: true }, { x: 70, y: 80, flip: true }],
      "10": [{ x: 30, y: 18 }, { x: 70, y: 18 }, { x: 50, y: 30 }, { x: 30, y: 38 }, { x: 70, y: 38 }, { x: 30, y: 62, flip: true }, { x: 70, y: 62, flip: true }, { x: 50, y: 70, flip: true }, { x: 30, y: 82, flip: true }, { x: 70, y: 82, flip: true }],
    };
    return positions[rank] || [];
  };

  const positions = getSymbolPositions(rank);
  
  if (rank === "A") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ color, fontSize: "3rem" }}>{symbol}</span>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ padding: "15%" }}>
      {positions.map((pos, i) => (
        <text
          key={i}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fill={color}
          transform={pos.flip ? `rotate(180, ${pos.x}, ${pos.y})` : undefined}
        >
          {symbol}
        </text>
      ))}
    </svg>
  );
};

export const PlayingCard: React.FC<PlayingCardProps> = ({
  suit,
  rank,
  held = false,
  onClick,
  disabled = false,
  animate = false,
}) => {
  const color = getSuitColor(suit);
  const isFaceCard = ["J", "Q", "K"].includes(rank);

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative transition-all transform ${
        held ? "-translate-y-4" : "hover:-translate-y-1"
      } ${disabled ? "" : "cursor-pointer"} ${animate ? "animate-pulse" : ""}`}
    >
      {/* Card container with blue border */}
      <div
        className="relative w-20 h-28 md:w-28 md:h-40 lg:w-32 lg:h-44 rounded-lg overflow-hidden shadow-xl"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)",
          padding: "4px",
        }}
      >
        {/* Inner white card */}
        <div className="relative w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-md overflow-hidden">
          {/* Top-left corner */}
          <div className="absolute top-1 left-1.5 md:top-2 md:left-2 flex flex-col items-center leading-none">
            <span
              className="text-lg md:text-2xl lg:text-3xl font-bold"
              style={{ color, fontFamily: "Georgia, serif" }}
            >
              {rank}
            </span>
            <span className="text-sm md:text-lg lg:text-xl" style={{ color }}>
              {getSuitSymbol(suit)}
            </span>
          </div>

          {/* Bottom-right corner (inverted) */}
          <div className="absolute bottom-1 right-1.5 md:bottom-2 md:right-2 flex flex-col items-center leading-none rotate-180">
            <span
              className="text-lg md:text-2xl lg:text-3xl font-bold"
              style={{ color, fontFamily: "Georgia, serif" }}
            >
              {rank}
            </span>
            <span className="text-sm md:text-lg lg:text-xl" style={{ color }}>
              {getSuitSymbol(suit)}
            </span>
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "20% 15%" }}>
            {isFaceCard ? (
              <FaceCardIllustration rank={rank as "J" | "Q" | "K"} suit={suit} />
            ) : (
              <NumberCardLayout rank={rank} suit={suit} />
            )}
          </div>
        </div>
      </div>

      {/* HOLD badge */}
      {held && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs md:text-sm px-3 py-1 rounded-full font-bold shadow-lg border-2 border-yellow-500">
          HOLD
        </div>
      )}
    </div>
  );
};

// Placeholder card for betting phase
export const PlaceholderCard: React.FC = () => {
  return (
    <div
      className="relative w-20 h-28 md:w-28 md:h-40 lg:w-32 lg:h-44 rounded-lg overflow-hidden shadow-lg"
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)",
        padding: "4px",
      }}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center">
        {/* Card back pattern */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <defs>
            <pattern id="cardback" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="transparent"/>
              <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="0.5" fill="none"/>
              <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.3"/>
              <circle cx="20" cy="0" r="3" fill="#fff" opacity="0.3"/>
              <circle cx="0" cy="20" r="3" fill="#fff" opacity="0.3"/>
              <circle cx="20" cy="20" r="3" fill="#fff" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#cardback)"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl md:text-5xl text-blue-400/50">?</span>
        </div>
      </div>
    </div>
  );
};

export default PlayingCard;
