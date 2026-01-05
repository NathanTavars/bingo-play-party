import { Button } from "@/components/ui/button";
import { Users, Clock, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface LiveGame {
  id: number;
  name: string;
  prize: string;
  players: number;
  startsIn: number; // seconds
  type: 'classic' | 'turbo' | 'jackpot';
  cardPrice: string;
}

const liveGames: LiveGame[] = [
  { id: 1, name: "Bingo Clássico", prize: "R$ 500", players: 89, startsIn: 120, type: 'classic', cardPrice: "R$ 2,00" },
  { id: 2, name: "Mega Jackpot", prize: "R$ 5.000", players: 234, startsIn: 45, type: 'jackpot', cardPrice: "R$ 10,00" },
  { id: 3, name: "Bingo Turbo", prize: "R$ 200", players: 56, startsIn: 300, type: 'turbo', cardPrice: "R$ 1,00" },
  { id: 4, name: "Super Prêmio", prize: "R$ 1.500", players: 178, startsIn: 180, type: 'jackpot', cardPrice: "R$ 5,00" },
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const GameCard = ({ game }: { game: LiveGame }) => {
  const [timeLeft, setTimeLeft] = useState(game.startsIn);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : game.startsIn));
    }, 1000);
    return () => clearInterval(timer);
  }, [game.startsIn]);

  const typeStyles = {
    classic: "from-bingo-blue/20 to-bingo-purple/20 border-bingo-blue/30",
    turbo: "from-bingo-pink/20 to-bingo-red/20 border-bingo-pink/30",
    jackpot: "from-bingo-gold/20 to-bingo-gold/10 border-bingo-gold/30",
  };

  const typeLabels: Record<string, { label: string; color: string; icon?: React.ElementType }> = {
    classic: { label: "Clássico", color: "text-bingo-blue" },
    turbo: { label: "Turbo", color: "text-bingo-pink", icon: Zap },
    jackpot: { label: "Jackpot", color: "text-bingo-gold", icon: Trophy },
  };

  const TypeIcon = typeLabels[game.type]?.icon;

  return (
    <div className={`relative group rounded-2xl p-6 bg-gradient-to-br ${typeStyles[game.type]} border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-card`}>
      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-bingo-red animate-pulse" />
        <span className="text-xs font-medium text-bingo-red uppercase">Ao Vivo</span>
      </div>

      {/* Game type badge */}
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-card/50 mb-4 ${typeLabels[game.type].color}`}>
        {TypeIcon && <TypeIcon className="w-3 h-3" />}
        <span className="text-xs font-semibold">{typeLabels[game.type].label}</span>
      </div>

      {/* Game name */}
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        {game.name}
      </h3>

      {/* Prize */}
      <div className="font-display text-3xl font-bold text-gradient-gold mb-4">
        {game.prize}
      </div>

      {/* Info row */}
      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{game.players} jogadores</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className={timeLeft < 60 ? "text-bingo-red font-semibold" : ""}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Cartela a partir de</span>
          <div className="font-semibold text-foreground">{game.cardPrice}</div>
        </div>
        <Button variant={game.type === 'jackpot' ? 'hero' : 'default'} size="sm">
          Entrar
        </Button>
      </div>
    </div>
  );
};

const LiveGamesSection = () => {
  return (
    <section id="jogos" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <span className="w-2 h-2 rounded-full bg-bingo-red animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Jogos Ao Vivo</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Escolha seu <span className="text-gradient-gold">jogo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Participe de jogos com milhares de jogadores e concorra a prêmios incríveis em tempo real
          </p>
        </div>

        {/* Games grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            Ver Todos os Jogos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LiveGamesSection;
