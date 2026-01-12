import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Users, 
  Trophy, 
  Clock, 
  Eye,
  Volume2,
  VolumeX,
  Maximize2,
  RefreshCw,
  Circle
} from "lucide-react";

interface DrawnNumber {
  number: number;
  letter: string;
  timestamp: Date;
}

interface LiveRound {
  id: number;
  name: string;
  type: "classic" | "turbo" | "jackpot";
  prize: string;
  players: number;
  cards: number;
  drawnNumbers: DrawnNumber[];
  totalNumbers: number;
  currentNumber: number | null;
  status: "active" | "paused";
  startedAt: string;
  winnersCount: number;
}

const mockLiveRounds: LiveRound[] = [
  {
    id: 1,
    name: "Bingo Clássico #1248",
    type: "classic",
    prize: "R$ 500,00",
    players: 89,
    cards: 156,
    drawnNumbers: [],
    totalNumbers: 75,
    currentNumber: null,
    status: "active",
    startedAt: "14:30",
    winnersCount: 0,
  },
  {
    id: 2,
    name: "Mega Jackpot #893",
    type: "jackpot",
    prize: "R$ 5.000,00",
    players: 234,
    cards: 412,
    drawnNumbers: [],
    totalNumbers: 75,
    currentNumber: null,
    status: "active",
    startedAt: "15:00",
    winnersCount: 0,
  },
];

const getNumberLetter = (num: number): string => {
  if (num <= 15) return "B";
  if (num <= 30) return "I";
  if (num <= 45) return "N";
  if (num <= 60) return "G";
  return "O";
};

const typeLabels: Record<string, { label: string; color: string }> = {
  classic: { label: "Clássico", color: "bg-bingo-blue/20 text-bingo-blue" },
  turbo: { label: "Turbo", color: "bg-bingo-purple/20 text-bingo-purple" },
  jackpot: { label: "Jackpot", color: "bg-primary/20 text-primary" },
};

const LiveRounds = () => {
  const [rounds, setRounds] = useState<LiveRound[]>(mockLiveRounds);
  const [selectedRound, setSelectedRound] = useState<LiveRound | null>(mockLiveRounds[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSimulating, setIsSimulating] = useState(true);

  // Simulate number drawing
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setRounds(prevRounds => {
        return prevRounds.map(round => {
          if (round.status !== "active" || round.drawnNumbers.length >= round.totalNumbers) {
            return round;
          }

          const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
            .filter(n => !round.drawnNumbers.some(dn => dn.number === n));

          if (availableNumbers.length === 0) return round;

          const randomIndex = Math.floor(Math.random() * availableNumbers.length);
          const newNumber = availableNumbers[randomIndex];

          const newDrawnNumber: DrawnNumber = {
            number: newNumber,
            letter: getNumberLetter(newNumber),
            timestamp: new Date(),
          };

          return {
            ...round,
            drawnNumbers: [...round.drawnNumbers, newDrawnNumber],
            currentNumber: newNumber,
            players: round.players + Math.floor(Math.random() * 3) - 1,
          };
        });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Update selected round when rounds change
  useEffect(() => {
    if (selectedRound) {
      const updated = rounds.find(r => r.id === selectedRound.id);
      if (updated) setSelectedRound(updated);
    }
  }, [rounds, selectedRound?.id]);

  const toggleRoundStatus = (roundId: number) => {
    setRounds(prevRounds =>
      prevRounds.map(round =>
        round.id === roundId
          ? { ...round, status: round.status === "active" ? "paused" : "active" }
          : round
      )
    );
  };

  const getLetterColor = (letter: string) => {
    switch (letter) {
      case "B": return "bg-bingo-blue text-white";
      case "I": return "bg-bingo-green text-white";
      case "N": return "bg-bingo-purple text-white";
      case "G": return "bg-primary text-primary-foreground";
      case "O": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-display font-bold">Monitoramento Ao Vivo</h1>
            <span className="flex items-center gap-1 text-bingo-green animate-pulse">
              <Circle className="w-3 h-3 fill-current" />
              <span className="text-sm font-medium">AO VIVO</span>
            </span>
          </div>
          <p className="text-muted-foreground">Acompanhe as rodadas em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Simulando' : 'Pausado'}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-bingo-green/50 bg-bingo-green/5">
          <div className="flex items-center gap-3">
            <Play className="w-8 h-8 text-bingo-green" />
            <div>
              <p className="text-xs text-muted-foreground">Rodadas Ativas</p>
              <p className="text-2xl font-display font-bold">{rounds.filter(r => r.status === "active").length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-bingo-blue" />
            <div>
              <p className="text-xs text-muted-foreground">Total Jogadores</p>
              <p className="text-2xl font-display font-bold">{rounds.reduce((acc, r) => acc + r.players, 0)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Cartelas</p>
              <p className="text-2xl font-display font-bold">{rounds.reduce((acc, r) => acc + r.cards, 0)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-bingo-purple" />
            <div>
              <p className="text-xs text-muted-foreground">Números Sorteados</p>
              <p className="text-2xl font-display font-bold">{rounds.reduce((acc, r) => acc + r.drawnNumbers.length, 0)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Round List */}
        <Card className="p-4 space-y-3">
          <h2 className="font-display font-bold text-lg">Rodadas em Andamento</h2>
          {rounds.map(round => (
            <Card
              key={round.id}
              className={`p-4 cursor-pointer transition-all hover:border-primary ${
                selectedRound?.id === round.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedRound(round)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{round.name}</p>
                  <Badge className={`${typeLabels[round.type].color} text-xs mt-1`}>
                    {typeLabels[round.type].label}
                  </Badge>
                </div>
                <Badge variant={round.status === "active" ? "default" : "secondary"}>
                  {round.status === "active" ? "Ativo" : "Pausado"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {round.players} jogadores
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {round.prize}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progresso</span>
                  <span>{round.drawnNumbers.length}/{round.totalNumbers}</span>
                </div>
                <Progress value={(round.drawnNumbers.length / round.totalNumbers) * 100} className="h-2" />
              </div>
            </Card>
          ))}
        </Card>

        {/* Selected Round Details */}
        {selectedRound && (
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-xl">{selectedRound.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={typeLabels[selectedRound.type].color}>
                    {typeLabels[selectedRound.type].label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Iniciado às {selectedRound.startedAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRoundStatus(selectedRound.id)}
                >
                  {selectedRound.status === "active" ? (
                    <><Pause className="w-4 h-4 mr-1" /> Pausar</>
                  ) : (
                    <><Play className="w-4 h-4 mr-1" /> Retomar</>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Current Number Display */}
            <div className="flex justify-center mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Número Atual</p>
                {selectedRound.currentNumber ? (
                  <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ${getLetterColor(getNumberLetter(selectedRound.currentNumber))} shadow-lg animate-pulse`}>
                    <span className="text-lg font-bold">{getNumberLetter(selectedRound.currentNumber)}</span>
                    <span className="text-3xl font-display font-bold">{selectedRound.currentNumber}</span>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                    <span className="text-sm">Aguardando</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-bingo-blue">{selectedRound.players}</p>
                <p className="text-xs text-muted-foreground">Jogadores</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-bingo-green">{selectedRound.cards}</p>
                <p className="text-xs text-muted-foreground">Cartelas</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{selectedRound.drawnNumbers.length}</p>
                <p className="text-xs text-muted-foreground">Sorteados</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-bingo-purple">{selectedRound.winnersCount}</p>
                <p className="text-xs text-muted-foreground">Vencedores</p>
              </div>
            </div>

            {/* Drawn Numbers History */}
            <div>
              <h3 className="font-semibold mb-3">Números Sorteados ({selectedRound.drawnNumbers.length})</h3>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {selectedRound.drawnNumbers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum número sorteado ainda</p>
                ) : (
                  [...selectedRound.drawnNumbers].reverse().map((drawn, index) => (
                    <div
                      key={drawn.number}
                      className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs ${
                        index === 0 ? getLetterColor(drawn.letter) + ' ring-2 ring-offset-2 ring-primary' : 'bg-muted'
                      }`}
                    >
                      <span className="font-bold">{drawn.letter}</span>
                      <span>{drawn.number}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bingo Board Reference */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Tabela de Referência</h3>
              <div className="grid grid-cols-5 gap-1">
                {["B", "I", "N", "G", "O"].map((letter, letterIndex) => (
                  <div key={letter} className="space-y-1">
                    <div className={`text-center py-1 rounded font-bold text-sm ${getLetterColor(letter)}`}>
                      {letter}
                    </div>
                    {Array.from({ length: 15 }, (_, i) => {
                      const num = letterIndex * 15 + i + 1;
                      const isDrawn = selectedRound.drawnNumbers.some(d => d.number === num);
                      const isCurrent = selectedRound.currentNumber === num;
                      return (
                        <div
                          key={num}
                          className={`text-center py-1 rounded text-xs transition-all ${
                            isCurrent
                              ? getLetterColor(letter) + ' animate-pulse'
                              : isDrawn
                              ? 'bg-primary/20 text-primary font-semibold'
                              : 'bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {num}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LiveRounds;
