import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Volume2, VolumeX, Trophy, Users, Clock, Crown, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Generate a random bingo card
const generateBingoCard = () => {
  const card: (number | null)[][] = [];
  const ranges = [
    { min: 1, max: 15 },
    { min: 16, max: 30 },
    { min: 31, max: 45 },
    { min: 46, max: 60 },
    { min: 61, max: 75 },
  ];

  for (let col = 0; col < 5; col++) {
    const colNumbers: number[] = [];
    while (colNumbers.length < 5) {
      const num = Math.floor(Math.random() * (ranges[col].max - ranges[col].min + 1)) + ranges[col].min;
      if (!colNumbers.includes(num)) {
        colNumbers.push(num);
      }
    }
    card.push(colNumbers);
  }

  card[2][2] = null;
  return card;
};

const BingoJackpot = () => {
  const [card] = useState(generateBingoCard);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [markedCells, setMarkedCells] = useState<Set<string>>(new Set(["2-2"]));
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "bingo" | "jackpot">("waiting");
  const [jackpotPrize, setJackpotPrize] = useState(15000);
  const [players] = useState(234);
  const [timeLeft, setTimeLeft] = useState(300);
  const [goldenNumber] = useState(Math.floor(Math.random() * 75) + 1);
  const [hasGoldenNumber, setHasGoldenNumber] = useState(false);
  const [jackpotMultiplier, setJackpotMultiplier] = useState(1);

  const letters = ["B", "I", "N", "G", "O"];
  const letterColors = [
    "bg-gradient-to-br from-yellow-400 to-yellow-600",
    "bg-gradient-to-br from-yellow-500 to-amber-600", 
    "bg-gradient-to-br from-amber-400 to-orange-500",
    "bg-gradient-to-br from-yellow-500 to-amber-600",
    "bg-gradient-to-br from-yellow-400 to-yellow-600"
  ];

  // Jackpot increases over time
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpotPrize((prev) => prev + Math.floor(Math.random() * 50) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const checkBingo = useCallback((marked: Set<string>) => {
    for (let row = 0; row < 5; row++) {
      let rowComplete = true;
      for (let col = 0; col < 5; col++) {
        if (!marked.has(`${col}-${row}`)) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) return true;
    }

    for (let col = 0; col < 5; col++) {
      let colComplete = true;
      for (let row = 0; row < 5; row++) {
        if (!marked.has(`${col}-${row}`)) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) return true;
    }

    let diag1 = true, diag2 = true;
    for (let i = 0; i < 5; i++) {
      if (!marked.has(`${i}-${i}`)) diag1 = false;
      if (!marked.has(`${i}-${4-i}`)) diag2 = false;
    }
    if (diag1 || diag2) return true;

    return false;
  }, []);

  useEffect(() => {
    if (!isPlaying || gameStatus === "bingo" || gameStatus === "jackpot") return;

    const interval = setInterval(() => {
      setDrawnNumbers((prev) => {
        if (prev.length >= 75) {
          setIsPlaying(false);
          return prev;
        }

        let newNum: number;
        do {
          newNum = Math.floor(Math.random() * 75) + 1;
        } while (prev.includes(newNum));

        setCurrentNumber(newNum);

        // Check if golden number was drawn
        if (newNum === goldenNumber) {
          setJackpotMultiplier(2);
        }

        return [...prev, newNum];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, gameStatus, goldenNumber]);

  useEffect(() => {
    if (currentNumber === null) return;

    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (card[col][row] === currentNumber) {
          // Check if it's the golden number on player's card
          if (currentNumber === goldenNumber) {
            setHasGoldenNumber(true);
          }

          setMarkedCells((prev) => {
            const newSet = new Set(prev);
            newSet.add(`${col}-${row}`);
            
            if (checkBingo(newSet)) {
              if (hasGoldenNumber) {
                setGameStatus("jackpot");
              } else {
                setGameStatus("bingo");
              }
              setIsPlaying(false);
            }
            
            return newSet;
          });
        }
      }
    }
  }, [currentNumber, card, checkBingo, goldenNumber, hasGoldenNumber]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setGameStatus("playing");
    setDrawnNumbers([]);
    setMarkedCells(new Set(["2-2"]));
    setCurrentNumber(null);
    setTimeLeft(300);
    setHasGoldenNumber(false);
    setJackpotMultiplier(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getNumberLetter = (num: number) => {
    if (num <= 15) return "B";
    if (num <= 30) return "I";
    if (num <= 45) return "N";
    if (num <= 60) return "G";
    return "O";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-yellow-900/30 via-amber-900/20 to-background flex flex-col">
      {/* Header */}
      <header className="shrink-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-b-2 border-yellow-500/50 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-yellow-500 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold animate-pulse flex items-center gap-1">
                <Crown className="w-3 h-3" />
                JACKPOT
              </Badge>
              <Badge variant="destructive" className="animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                AO VIVO
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden container mx-auto px-4 py-3 flex flex-col">
        {/* Jackpot Display */}
        <div className="shrink-0 mb-3 text-center">
          <div className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-400/30 to-yellow-500/20 border-2 border-yellow-500/50">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span className="text-sm font-semibold text-yellow-500">JACKPOT ACUMULADO</span>
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
            <div className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              {formatCurrency(jackpotPrize * jackpotMultiplier)}
            </div>
            {jackpotMultiplier > 1 && (
              <div className="text-xs text-yellow-500 mt-1 font-semibold">
                🌟 MULTIPLICADOR x{jackpotMultiplier} ATIVO! 🌟
              </div>
            )}
          </div>
        </div>

        {/* Golden Number Alert */}
        <div className="shrink-0 mb-2 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold">
              Número Dourado: <span className="text-yellow-500 font-bold">{getNumberLetter(goldenNumber)}-{goldenNumber}</span>
            </span>
            <Star className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Faça bingo com o número dourado para ganhar o JACKPOT!
          </p>
        </div>

        {/* Game Info Bar */}
        <div className="shrink-0 grid grid-cols-4 gap-2 mb-3">
          <Card className="bg-yellow-500/10 border-yellow-500/30 p-2 text-center">
            <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Prêmio Base</div>
            <div className="font-display text-sm font-bold text-yellow-500">R$ 5.000</div>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/30 p-2 text-center">
            <Users className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Jogadores</div>
            <div className="font-display text-base font-bold">{players}</div>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30 p-2 text-center">
            <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Tempo</div>
            <div className="font-display text-base font-bold">{formatTime(timeLeft)}</div>
          </Card>
          <Card className={`p-2 text-center ${hasGoldenNumber ? "bg-yellow-500/30 border-yellow-500 animate-pulse" : "bg-amber-500/10 border-amber-500/30"}`}>
            <Star className={`w-5 h-5 mx-auto mb-1 ${hasGoldenNumber ? "text-yellow-400" : "text-amber-500"}`} />
            <div className="text-xs text-muted-foreground">Nº Dourado</div>
            <div className="font-display text-base font-bold">
              {hasGoldenNumber ? "✓ SIM!" : "Aguardando"}
            </div>
          </Card>
        </div>

        <div className="flex-1 overflow-hidden grid lg:grid-cols-2 gap-4">
          {/* Bingo Card */}
          <div className="flex flex-col overflow-hidden">
            <h2 className="shrink-0 font-display text-lg font-bold mb-2 text-center flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Sua Cartela Jackpot
              <Crown className="w-5 h-5 text-yellow-500" />
            </h2>
            <Card className="flex-1 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30 p-3 flex flex-col overflow-hidden">
              {/* Header Row */}
              <div className="shrink-0 grid grid-cols-5 gap-1.5 mb-1.5">
                {letters.map((letter, i) => (
                  <div
                    key={letter}
                    className={`${letterColors[i]} rounded-lg py-1.5 text-center font-display text-lg font-bold text-white shadow-lg`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              {/* Number Grid */}
              <div className="flex-1 grid grid-cols-5 gap-1.5">
                {[0, 1, 2, 3, 4].map((row) =>
                  [0, 1, 2, 3, 4].map((col) => {
                    const cellKey = `${col}-${row}`;
                    const number = card[col][row];
                    const isMarked = markedCells.has(cellKey);
                    const isFreeSpace = number === null;
                    const isCurrentNumber = number === currentNumber;
                    const isGoldenNumber = number === goldenNumber;

                    return (
                      <div
                        key={cellKey}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center
                          font-display text-lg font-bold relative
                          transition-all duration-300 cursor-pointer
                          ${isFreeSpace 
                            ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white" 
                            : isGoldenNumber && isMarked
                              ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white scale-95 shadow-lg ring-2 ring-yellow-400 animate-pulse"
                              : isMarked
                                ? "bg-amber-600 text-white scale-95 shadow-lg"
                                : isCurrentNumber
                                  ? "bg-yellow-500/50 border-2 border-yellow-500 animate-pulse"
                                  : isGoldenNumber
                                    ? "bg-yellow-500/20 border-2 border-yellow-500/50 ring-1 ring-yellow-400"
                                    : "bg-muted hover:bg-muted/80"
                          }
                        `}
                      >
                        {isFreeSpace ? "👑" : number}
                        {isGoldenNumber && !isFreeSpace && (
                          <Star className="w-3 h-3 absolute top-0.5 right-0.5 text-yellow-400" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bingo Button */}
              <div className="shrink-0 mt-3">
                {gameStatus === "jackpot" ? (
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold animate-pulse text-lg h-12">
                    <Crown className="w-5 h-5 mr-2" />
                    🎉 JACKPOT! {formatCurrency(jackpotPrize * jackpotMultiplier)} 🎉
                  </Button>
                ) : gameStatus === "bingo" ? (
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-lg h-12">
                    <Trophy className="w-5 h-5 mr-2" />
                    BINGO! Você ganhou R$ 5.000!
                  </Button>
                ) : gameStatus === "waiting" ? (
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold text-lg h-12" onClick={startGame}>
                    <Crown className="w-5 h-5 mr-2" />
                    Jogar pelo Jackpot
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full border-yellow-500/50 h-12" disabled>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Aguardando números...
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Drawn Numbers */}
          <div className="flex flex-col overflow-hidden">
            <h2 className="shrink-0 font-display text-lg font-bold mb-2 text-center">Números Sorteados</h2>
            
            {/* Current Number Display */}
            {currentNumber && (
              <div className="shrink-0 mb-3 text-center">
                <div className="inline-block">
                  <div className="text-xs text-muted-foreground mb-1">Número atual</div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg mx-auto ${
                    currentNumber === goldenNumber 
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 animate-bounce ring-4 ring-yellow-400" 
                      : "bg-gradient-to-br from-yellow-500 to-amber-600"
                  }`}>
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">
                        {getNumberLetter(currentNumber)}
                      </div>
                      <div className="font-display text-xl font-bold text-white">
                        {currentNumber}
                      </div>
                    </div>
                    {currentNumber === goldenNumber && (
                      <Star className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-spin" />
                    )}
                  </div>
                  {currentNumber === goldenNumber && (
                    <div className="text-xs text-yellow-500 font-bold mt-1 animate-pulse">
                      ⭐ NÚMERO DOURADO! ⭐
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Number History */}
            <Card className="flex-1 bg-yellow-500/5 border-yellow-500/20 p-3 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8 gap-1.5">
                  {drawnNumbers.slice().reverse().map((num, idx) => (
                    <div
                      key={`${num}-${idx}`}
                      className={`
                        aspect-square rounded-full flex items-center justify-center
                        font-display text-xs font-bold relative
                        ${num === goldenNumber 
                          ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white ring-2 ring-yellow-400" 
                          : idx === 0 
                            ? "bg-amber-600 text-white" 
                            : "bg-muted"
                        }
                      `}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                {drawnNumbers.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    A grande premiação está por vir! 👑
                  </p>
                )}
              </div>
            </Card>

            {/* Number Board Reference */}
            <div className="shrink-0 mt-3">
              <h3 className="font-display text-sm font-bold mb-2">Tabela de Referência</h3>
              <Card className="bg-yellow-500/5 border-yellow-500/20 p-2">
                <div className="grid grid-cols-5 gap-0.5 text-[10px]">
                  {letters.map((letter, colIdx) => (
                    <div key={letter}>
                      <div className={`${letterColors[colIdx]} rounded text-center py-0.5 text-white font-bold mb-0.5`}>
                        {letter}
                      </div>
                      {Array.from({ length: 15 }, (_, i) => {
                        const num = colIdx * 15 + i + 1;
                        const isDrawn = drawnNumbers.includes(num);
                        const isGolden = num === goldenNumber;
                        return (
                          <div
                            key={num}
                            className={`
                              text-center py-0.5 rounded relative
                              ${isGolden 
                                ? "bg-yellow-500/40 text-yellow-500 font-bold" 
                                : isDrawn 
                                  ? "bg-amber-500/30 text-amber-500 font-semibold" 
                                  : "text-muted-foreground"
                              }
                            `}
                          >
                            {num}
                            {isGolden && <span className="text-[8px]">⭐</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BingoJackpot;
