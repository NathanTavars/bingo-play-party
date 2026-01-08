import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Coins, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const suits = ["♠", "♥", "♦", "♣"] as const;
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;

type Suit = (typeof suits)[number];
type Rank = (typeof ranks)[number];

interface CardType {
  suit: Suit;
  rank: Rank;
  held?: boolean;
}

const payTable = [
  { hand: "Royal Flush", payout: 800, description: "A-K-Q-J-10 do mesmo naipe" },
  { hand: "Straight Flush", payout: 50, description: "5 cartas consecutivas do mesmo naipe" },
  { hand: "Quadra", payout: 25, description: "4 cartas iguais" },
  { hand: "Full House", payout: 9, description: "Trinca + Par" },
  { hand: "Flush", payout: 6, description: "5 cartas do mesmo naipe" },
  { hand: "Straight", payout: 4, description: "5 cartas consecutivas" },
  { hand: "Trinca", payout: 3, description: "3 cartas iguais" },
  { hand: "Dois Pares", payout: 2, description: "2 pares diferentes" },
  { hand: "Jacks or Better", payout: 1, description: "Par de J, Q, K ou A" },
];

const createDeck = (): CardType[] => {
  const deck: CardType[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, held: false });
    }
  }
  return deck;
};

const shuffleDeck = (deck: CardType[]): CardType[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

const getRankValue = (rank: Rank): number => {
  const values: Record<Rank, number> = {
    "A": 14, "K": 13, "Q": 12, "J": 11, "10": 10,
    "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2,
  };
  return values[rank];
};

const evaluateHand = (hand: CardType[]): { name: string; payout: number } => {
  const sortedHand = [...hand].sort((a, b) => getRankValue(b.rank) - getRankValue(a.rank));
  const ranks = sortedHand.map((c) => c.rank);
  const suits = sortedHand.map((c) => c.suit);
  const values = sortedHand.map((c) => getRankValue(c.rank));

  const isFlush = suits.every((s) => s === suits[0]);
  const isStraight = values.every((v, i) => i === 0 || values[i - 1] - v === 1) ||
    (values[0] === 14 && values[1] === 5 && values[2] === 4 && values[3] === 3 && values[4] === 2);
  const isRoyal = isFlush && isStraight && values[0] === 14 && values[1] === 13;

  const rankCounts: Record<string, number> = {};
  ranks.forEach((r) => {
    rankCounts[r] = (rankCounts[r] || 0) + 1;
  });
  const counts = Object.values(rankCounts).sort((a, b) => b - a);

  if (isRoyal) return { name: "Royal Flush", payout: 800 };
  if (isFlush && isStraight) return { name: "Straight Flush", payout: 50 };
  if (counts[0] === 4) return { name: "Quadra", payout: 25 };
  if (counts[0] === 3 && counts[1] === 2) return { name: "Full House", payout: 9 };
  if (isFlush) return { name: "Flush", payout: 6 };
  if (isStraight) return { name: "Straight", payout: 4 };
  if (counts[0] === 3) return { name: "Trinca", payout: 3 };
  if (counts[0] === 2 && counts[1] === 2) return { name: "Dois Pares", payout: 2 };
  
  // Jacks or Better - check for pair of J, Q, K, or A
  const highPairs = Object.entries(rankCounts).filter(
    ([rank, count]) => count === 2 && ["J", "Q", "K", "A"].includes(rank)
  );
  if (highPairs.length > 0) return { name: "Jacks or Better", payout: 1 };

  return { name: "Sem Prêmio", payout: 0 };
};

const VideoPoker = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [hand, setHand] = useState<CardType[]>([]);
  const [deckIndex, setDeckIndex] = useState(5);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(5);
  const [gamePhase, setGamePhase] = useState<"betting" | "holding" | "result">("betting");
  const [result, setResult] = useState<{ name: string; payout: number } | null>(null);
  const [winAnimation, setWinAnimation] = useState(false);
  const [totalWins, setTotalWins] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const dealCards = () => {
    if (credits < bet) return;
    
    const newDeck = shuffleDeck(createDeck());
    const newHand = newDeck.slice(0, 5).map((c) => ({ ...c, held: false }));
    
    setDeck(newDeck);
    setHand(newHand);
    setDeckIndex(5);
    setCredits((prev) => prev - bet);
    setGamePhase("holding");
    setResult(null);
    setWinAnimation(false);
  };

  const toggleHold = (index: number) => {
    if (gamePhase !== "holding") return;
    
    setHand((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, held: !card.held } : card
      )
    );
  };

  const draw = () => {
    let currentDeckIndex = deckIndex;
    const newHand = hand.map((card) => {
      if (card.held) return card;
      const newCard = deck[currentDeckIndex];
      currentDeckIndex++;
      return { ...newCard, held: false };
    });

    setHand(newHand);
    setDeckIndex(currentDeckIndex);
    
    const handResult = evaluateHand(newHand);
    setResult(handResult);
    setGamesPlayed((prev) => prev + 1);

    if (handResult.payout > 0) {
      const winnings = handResult.payout * bet;
      setCredits((prev) => prev + winnings);
      setTotalWins((prev) => prev + 1);
      setWinAnimation(true);
    }

    setGamePhase("result");
  };

  const getCardColor = (suit: Suit) => {
    return suit === "♥" || suit === "♦" ? "text-red-500" : "text-foreground";
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-green-900 via-green-800 to-green-900 flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 bg-background/90 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold">Video Poker</span>
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/50">
              Jacks or Better
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-bold">{credits}</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-amber-500">{totalWins}/{gamesPlayed}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 max-w-7xl mx-auto w-full">
        {/* Pay Table */}
        <Card className="mb-4 p-3 bg-background/80 backdrop-blur-sm">
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2 text-center text-xs md:text-sm">
            {payTable.map((item, idx) => (
              <div
                key={item.hand}
                className={`p-2 rounded transition-all ${
                  result?.name === item.hand
                    ? "bg-primary text-primary-foreground scale-105 ring-2 ring-primary"
                    : "bg-muted/50"
                }`}
              >
                <div className="font-bold truncate">{item.hand}</div>
                <div className="text-primary font-mono">{item.payout}x</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cards Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-2 md:gap-4">
            {gamePhase === "betting" ? (
              // Placeholder cards
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-24 md:w-24 md:h-36 lg:w-28 lg:h-40 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center"
                >
                  <span className="text-2xl md:text-4xl text-primary/30">?</span>
                </div>
              ))
            ) : (
              hand.map((card, index) => (
                <div
                  key={index}
                  onClick={() => toggleHold(index)}
                  className={`relative w-16 h-24 md:w-24 md:h-36 lg:w-28 lg:h-40 bg-white rounded-xl shadow-lg cursor-pointer transition-all transform ${
                    card.held ? "-translate-y-3 ring-2 ring-primary" : "hover:-translate-y-1"
                  } ${winAnimation && result && result.payout > 0 ? "animate-pulse" : ""}`}
                >
                  <div className={`absolute inset-0 flex flex-col items-center justify-center ${getCardColor(card.suit)}`}>
                    <span className="text-lg md:text-2xl lg:text-3xl font-bold">{card.rank}</span>
                    <span className="text-2xl md:text-4xl lg:text-5xl">{card.suit}</span>
                  </div>
                  {card.held && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-bold">
                      HOLD
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`text-center mb-4 transition-all ${winAnimation ? "animate-bounce" : ""}`}>
            {result.payout > 0 ? (
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full">
                <Sparkles className="w-6 h-6" />
                <span className="text-xl md:text-2xl font-bold">{result.name}</span>
                <span className="text-lg">+{result.payout * bet} créditos!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-3 rounded-full">
                <span className="text-xl font-bold">Sem Prêmio</span>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <Card className="p-4 bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Bet Controls */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Aposta:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBet(Math.max(1, bet - 1))}
                  disabled={gamePhase !== "betting"}
                >
                  -
                </Button>
                <span className="font-bold text-xl w-12 text-center">{bet}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBet(Math.min(50, bet + 1))}
                  disabled={gamePhase !== "betting"}
                >
                  +
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">(1-50)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {gamePhase === "betting" && (
                <Button
                  onClick={dealCards}
                  disabled={credits < bet}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                >
                  <Coins className="w-5 h-5 mr-2" />
                  Distribuir ({bet} créditos)
                </Button>
              )}

              {gamePhase === "holding" && (
                <Button
                  onClick={draw}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Trocar Cartas
                </Button>
              )}

              {gamePhase === "result" && (
                <Button
                  onClick={() => setGamePhase("betting")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                >
                  Nova Rodada
                </Button>
              )}
            </div>

            {/* Quick Bet */}
            <div className="flex gap-2">
              {[1, 5, 10, 25].map((amount) => (
                <Button
                  key={amount}
                  variant={bet === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBet(amount)}
                  disabled={gamePhase !== "betting"}
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Instructions */}
      <div className="flex-shrink-0 bg-background/50 backdrop-blur-sm p-2 text-center text-xs text-muted-foreground">
        {gamePhase === "betting" && "Escolha sua aposta e clique em Distribuir para começar"}
        {gamePhase === "holding" && "Clique nas cartas para segurar (HOLD), depois clique em Trocar Cartas"}
        {gamePhase === "result" && "Clique em Nova Rodada para jogar novamente"}
      </div>
    </div>
  );
};

export default VideoPoker;
