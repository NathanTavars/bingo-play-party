import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Volume2, VolumeX, Trophy, Users, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// Generate a random bingo card
const generateBingoCard = () => {
  const card: (number | null)[][] = [];
  const ranges = [
    { min: 1, max: 15 },   // B
    { min: 16, max: 30 },  // I
    { min: 31, max: 45 },  // N
    { min: 46, max: 60 },  // G
    { min: 61, max: 75 },  // O
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

  // Free space in center
  card[2][2] = null;
  return card;
};

const BingoGame = () => {
  const [card] = useState(generateBingoCard);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [markedCells, setMarkedCells] = useState<Set<string>>(new Set(["2-2"])); // Free space
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "bingo">("waiting");
  const [prize] = useState("R$ 5.000,00");
  const [players] = useState(127);
  const [timeLeft, setTimeLeft] = useState(180);

  const letters = ["B", "I", "N", "G", "O"];
  const letterColors = [
    "bg-bingo-red",
    "bg-bingo-blue", 
    "bg-bingo-green",
    "bg-bingo-purple",
    "bg-bingo-gold"
  ];

  // Check for bingo
  const checkBingo = useCallback((marked: Set<string>) => {
    // Check rows
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

    // Check columns
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

    // Check diagonals
    let diag1 = true, diag2 = true;
    for (let i = 0; i < 5; i++) {
      if (!marked.has(`${i}-${i}`)) diag1 = false;
      if (!marked.has(`${i}-${4-i}`)) diag2 = false;
    }
    if (diag1 || diag2) return true;

    return false;
  }, []);

  // Draw numbers automatically
  useEffect(() => {
    if (!isPlaying || gameStatus === "bingo") return;

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
        return [...prev, newNum];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, gameStatus]);

  // Auto-mark numbers on card
  useEffect(() => {
    if (currentNumber === null) return;

    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (card[col][row] === currentNumber) {
          setMarkedCells((prev) => {
            const newSet = new Set(prev);
            newSet.add(`${col}-${row}`);
            
            if (checkBingo(newSet)) {
              setGameStatus("bingo");
              setIsPlaying(false);
            }
            
            return newSet;
          });
        }
      }
    }
  }, [currentNumber, card, checkBingo]);

  // Timer countdown
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
    setTimeLeft(180);
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <div className="flex items-center gap-4">
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

      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Game Info Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass p-4 text-center">
            <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Prêmio</div>
            <div className="font-display text-xl font-bold text-primary">{prize}</div>
          </Card>
          <Card className="glass p-4 text-center">
            <Users className="w-6 h-6 text-bingo-purple mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Jogadores</div>
            <div className="font-display text-xl font-bold">{players}</div>
          </Card>
          <Card className="glass p-4 text-center">
            <Clock className="w-6 h-6 text-bingo-blue mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Tempo</div>
            <div className="font-display text-xl font-bold">{formatTime(timeLeft)}</div>
          </Card>
          <Card className="glass p-4 text-center">
            <Zap className="w-6 h-6 text-bingo-green mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Números</div>
            <div className="font-display text-xl font-bold">{drawnNumbers.length}/75</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bingo Card */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">Sua Cartela</h2>
            <Card className="glass p-4 md:p-6">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                {letters.map((letter, i) => (
                  <div
                    key={letter}
                    className={`${letterColors[i]} rounded-lg py-2 text-center font-display text-2xl font-bold text-white`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              {/* Number Grid */}
              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((row) =>
                  [0, 1, 2, 3, 4].map((col) => {
                    const cellKey = `${col}-${row}`;
                    const number = card[col][row];
                    const isMarked = markedCells.has(cellKey);
                    const isFreeSpace = number === null;
                    const isCurrentNumber = number === currentNumber;

                    return (
                      <div
                        key={cellKey}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center
                          font-display text-xl md:text-2xl font-bold
                          transition-all duration-300 cursor-pointer
                          ${isFreeSpace 
                            ? "bg-primary text-primary-foreground" 
                            : isMarked
                              ? "bg-bingo-green text-white scale-95 shadow-lg"
                              : isCurrentNumber
                                ? "bg-primary/30 border-2 border-primary animate-pulse"
                                : "bg-muted hover:bg-muted/80"
                          }
                        `}
                      >
                        {isFreeSpace ? "★" : number}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bingo Button */}
              <div className="mt-6">
                {gameStatus === "bingo" ? (
                  <Button variant="hero" size="xl" className="w-full animate-pulse-glow">
                    <Trophy className="w-6 h-6 mr-2" />
                    🎉 BINGO! VOCÊ GANHOU! 🎉
                  </Button>
                ) : gameStatus === "waiting" ? (
                  <Button variant="hero" size="xl" className="w-full" onClick={startGame}>
                    Iniciar Jogo Demo
                  </Button>
                ) : (
                  <Button variant="outline" size="xl" className="w-full" disabled>
                    Aguardando números...
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Drawn Numbers */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">Números Sorteados</h2>
            
            {/* Current Number Display */}
            {currentNumber && (
              <div className="mb-6 text-center">
                <div className="inline-block">
                  <div className="text-sm text-muted-foreground mb-2">Número atual</div>
                  <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold animate-pulse-glow mx-auto">
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary-foreground">
                        {getNumberLetter(currentNumber)}
                      </div>
                      <div className="font-display text-3xl font-bold text-primary-foreground">
                        {currentNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Number History */}
            <Card className="glass p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-5 gap-2">
                {drawnNumbers.slice().reverse().map((num, idx) => (
                  <div
                    key={`${num}-${idx}`}
                    className={`
                      aspect-square rounded-full flex items-center justify-center
                      font-display text-sm font-bold
                      ${idx === 0 ? "bg-primary text-primary-foreground" : "bg-muted"}
                    `}
                  >
                    {num}
                  </div>
                ))}
              </div>
              {drawnNumbers.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Aguardando início do jogo...
                </p>
              )}
            </Card>

            {/* Number Board Reference */}
            <div className="mt-6">
              <h3 className="font-display text-lg font-bold mb-3">Tabela de Referência</h3>
              <Card className="glass p-4">
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {letters.map((letter, colIdx) => (
                    <div key={letter}>
                      <div className={`${letterColors[colIdx]} rounded text-center py-1 text-white font-bold mb-1`}>
                        {letter}
                      </div>
                      {Array.from({ length: 15 }, (_, i) => {
                        const num = colIdx * 15 + i + 1;
                        const isDrawn = drawnNumbers.includes(num);
                        return (
                          <div
                            key={num}
                            className={`
                              text-center py-0.5 rounded mb-0.5
                              ${isDrawn ? "bg-primary/30 text-primary" : "text-muted-foreground"}
                            `}
                          >
                            {num}
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

export default BingoGame;
