import { Button } from "@/components/ui/button";
import GameRoomCard from "@/components/game/GameRoomCard";

interface LiveGame {
  id: number;
  name: string;
  prize: string;
  players: number;
  startsIn: number;
  type: 'classic' | 'turbo' | 'jackpot' | 'poker';
  cardPrice: string;
  totalNumbers?: number;
}

const liveGames: LiveGame[] = [
  { id: 1, name: "SUPER PESO PESADO", prize: "R$ 1.300", players: 85, startsIn: 503683, type: 'classic', cardPrice: "R$ 0,65", totalNumbers: 90 },
  { id: 2, name: "PESO PESADO", prize: "R$ 650", players: 13, startsIn: 76483, type: 'classic', cardPrice: "R$ 0,65", totalNumbers: 90 },
  { id: 3, name: "ANIMINGO", prize: "R$ 65", players: 10, startsIn: 69573, type: 'turbo', cardPrice: "R$ 0,39", totalNumbers: 50 },
  { id: 4, name: "SALA DO JACKPOT", prize: "R$ 65", players: 4, startsIn: 283, type: 'jackpot', cardPrice: "R$ 0,65", totalNumbers: 90 },
  { id: 5, name: "COUNTRY ROADS", prize: "R$ 52", players: 10, startsIn: 273, type: 'turbo', cardPrice: "R$ 0,39", totalNumbers: 75 },
  { id: 6, name: "BEACHBALL BLAST", prize: "R$ 7", players: 0, startsIn: 35, type: 'classic', cardPrice: "R$ 0,07", totalNumbers: 90 },
  { id: 7, name: "SALA ZOOM", prize: "R$ 70", players: 21, startsIn: 36808, type: 'turbo', cardPrice: "R$ 0,07", totalNumbers: 30 },
  { id: 8, name: "Video Poker", prize: "Até 800x", players: 42, startsIn: 0, type: 'poker', cardPrice: "R$ 1,00", totalNumbers: 52 },
];

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
            <GameRoomCard 
              key={game.id} 
              id={game.id}
              name={game.name}
              prize={game.prize}
              players={game.players}
              startsIn={game.startsIn}
              type={game.type}
              cardPrice={game.cardPrice}
              totalNumbers={game.totalNumbers}
            />
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
