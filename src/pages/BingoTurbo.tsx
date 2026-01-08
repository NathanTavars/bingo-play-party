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

const BingoTurbo = () => {
  const [card] = useState(generateBingoCard);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [markedCells, setMarkedCells] = useState<Set<string>>(new Set(["2-2"]));
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "bingo">("waiting");
  const [prize] = useState("R$ 200,00");
  const [players] = useState(56);
  const [timeLeft, setTimeLeft] = useState(90);
  const [speed, setSpeed] = useState(1000);

  const letters = ["B", "I", "N", "G", "O"];
  const letterColors = [
    "bg-bingo-pink",
    "bg-bingo-red", 
    "bg-bingo-pink",
    "bg-bingo-red",
    "bg-bingo-pink"
  ];

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

      // Speed increases as game progresses
      if (drawnNumbers.length > 20) {
        setSpeed(800);
      }
      if (drawnNumbers.length > 40) {
        setSpeed(600);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, gameStatus, speed, drawnNumbers.length]);

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
    setTimeLeft(90);
    setSpeed(1000);
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-bingo-pink/30 via-bingo-red/20 to-background flex flex-col">
      {/* Header */}
      <header className="shrink-0 glass z-50 border-b-2 border-bingo-pink/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-bingo-pink transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <div className="flex items-center gap-4">
              <Badge className="bg-bingo-pink text-white animate-pulse flex items-center gap-1">
                <Zap className="w-3 h-3" />
                MODO TURBO
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
        {/* Speed Indicator */}
        <div className="shrink-0 mb-2 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-bingo-pink/20 border border-bingo-pink/50">
            <Zap className="w-4 h-4 text-bingo-pink animate-pulse" />
            <span className="text-sm font-semibold text-bingo-pink">
              Velocidade: {speed === 1000 ? "Normal" : speed === 800 ? "Rápido" : "Ultra Rápido!"}
            </span>
            <Zap className="w-4 h-4 text-bingo-pink animate-pulse" />
          </div>
        </div>

        {/* Game Info Bar */}
        <div className="shrink-0 grid grid-cols-4 gap-2 mb-3">
          <Card className="bg-bingo-pink/10 border-bingo-pink/30 p-2 text-center">
            <Trophy className="w-5 h-5 text-bingo-pink mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Prêmio</div>
            <div className="font-display text-base font-bold text-bingo-pink">{prize}</div>
          </Card>
          <Card className="bg-bingo-red/10 border-bingo-red/30 p-2 text-center">
            <Users className="w-5 h-5 text-bingo-red mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Jogadores</div>
            <div className="font-display text-base font-bold">{players}</div>
          </Card>
          <Card className="bg-bingo-pink/10 border-bingo-pink/30 p-2 text-center">
            <Clock className="w-5 h-5 text-bingo-pink mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Tempo</div>
            <div className={`font-display text-base font-bold ${timeLeft < 30 ? "text-bingo-red animate-pulse" : ""}`}>
              {formatTime(timeLeft)}
            </div>
          </Card>
          <Card className="bg-bingo-red/10 border-bingo-red/30 p-2 text-center">
            <Zap className="w-5 h-5 text-bingo-red mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Números</div>
            <div className="font-display text-base font-bold">{drawnNumbers.length}/75</div>
          </Card>
        </div>

        <div className="flex-1 overflow-hidden grid lg:grid-cols-2 gap-4">
          {/* Bingo Card */}
          <div className="flex flex-col overflow-hidden">
            <h2 className="shrink-0 font-display text-lg font-bold mb-2 text-center flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-bingo-pink" />
              Sua Cartela Turbo
              <Zap className="w-5 h-5 text-bingo-pink" />
            </h2>
            <Card className="flex-1 bg-gradient-to-br from-bingo-pink/10 to-bingo-red/10 border-bingo-pink/30 p-3 flex flex-col overflow-hidden">
              {/* Header Row */}
              <div className="shrink-0 grid grid-cols-5 gap-1.5 mb-1.5">
                {letters.map((letter, i) => (
                  <div
                    key={letter}
                    className={`${letterColors[i]} rounded-lg py-1.5 text-center font-display text-lg font-bold text-white`}
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

                    return (
                      <div
                        key={cellKey}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center
                          font-display text-lg font-bold
                          transition-all duration-150 cursor-pointer
                          ${isFreeSpace 
                            ? "bg-bingo-pink text-white" 
                            : isMarked
                              ? "bg-bingo-red text-white scale-95 shadow-lg"
                              : isCurrentNumber
                                ? "bg-bingo-pink/50 border-2 border-bingo-pink animate-pulse"
                                : "bg-muted hover:bg-muted/80"
                          }
                        `}
                      >
                        {isFreeSpace ? "⚡" : number}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bingo Button */}
              <div className="shrink-0 mt-3">
                {gameStatus === "bingo" ? (
                  <Button className="w-full bg-bingo-pink hover:bg-bingo-pink/90 animate-pulse text-lg h-12">
                    <Trophy className="w-5 h-5 mr-2" />
                    ⚡ TURBO BINGO! ⚡
                  </Button>
                ) : gameStatus === "waiting" ? (
                  <Button className="w-full bg-bingo-pink hover:bg-bingo-pink/90 text-lg h-12" onClick={startGame}>
                    <Zap className="w-5 h-5 mr-2" />
                    Iniciar Turbo Demo
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full border-bingo-pink/50 h-12" disabled>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Sorteando em alta velocidade...
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
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bingo-pink to-bingo-red flex items-center justify-center shadow-lg animate-bounce mx-auto">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">
                        {getNumberLetter(currentNumber)}
                      </div>
                      <div className="font-display text-xl font-bold text-white">
                        {currentNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Number History */}
            <Card className="flex-1 bg-bingo-pink/5 border-bingo-pink/20 p-3 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8 gap-1.5">
                  {drawnNumbers.slice().reverse().map((num, idx) => (
                    <div
                      key={`${num}-${idx}`}
                      className={`
                        aspect-square rounded-full flex items-center justify-center
                        font-display text-xs font-bold transition-all duration-150
                        ${idx === 0 ? "bg-bingo-pink text-white scale-110" : "bg-muted"}
                      `}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                {drawnNumbers.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    Prepare-se para velocidade máxima! ⚡
                  </p>
                )}
              </div>
            </Card>

            {/* Number Board Reference */}
            <div className="shrink-0 mt-3">
              <h3 className="font-display text-sm font-bold mb-2">Tabela de Referência</h3>
              <Card className="bg-bingo-pink/5 border-bingo-pink/20 p-2">
                <div className="grid grid-cols-5 gap-0.5 text-[10px]">
                  {letters.map((letter, colIdx) => (
                    <div key={letter}>
                      <div className={`${letterColors[colIdx]} rounded text-center py-0.5 text-white font-bold mb-0.5`}>
                        {letter}
                      </div>
                      {Array.from({ length: 15 }, (_, i) => {
                        const num = colIdx * 15 + i + 1;
                        const isDrawn = drawnNumbers.includes(num);
                        return (
                          <div
                            key={num}
                            className={`
                              text-center py-0.5 rounded
                              ${isDrawn ? "bg-bingo-pink/30 text-bingo-pink font-semibold" : "text-muted-foreground"}
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

export default BingoTurbo;
