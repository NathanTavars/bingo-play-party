import { Trophy, Gift, Coins, Crown, Gem, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Prize {
  id: number;
  name: string;
  value: string;
  game: string;
  winner?: string;
  time: string;
  icon: React.ElementType;
}

const recentPrizes: Prize[] = [
  { id: 1, name: "Jackpot Mega", value: "R$ 5.000", game: "Mega Jackpot", winner: "Maria S.", time: "há 5 min", icon: Crown },
  { id: 2, name: "Bingo Cheio", value: "R$ 800", game: "Bingo Clássico", winner: "João P.", time: "há 12 min", icon: Trophy },
  { id: 3, name: "Linha Horizontal", value: "R$ 150", game: "Bingo Turbo", winner: "Ana C.", time: "há 18 min", icon: Gift },
  { id: 4, name: "Quadra", value: "R$ 50", game: "Super Prêmio", winner: "Pedro M.", time: "há 25 min", icon: Coins },
  { id: 5, name: "Jackpot Noturno", value: "R$ 3.200", game: "Bingo Noturno", winner: "Lucia F.", time: "há 32 min", icon: Gem },
  { id: 6, name: "Prêmio Especial", value: "R$ 1.500", game: "VIP Bingo", winner: "Carlos R.", time: "há 45 min", icon: Star },
];

const upcomingPrizes = [
  { name: "Super Jackpot", value: "R$ 10.000", time: "20:00", highlight: true },
  { name: "Prêmio Noturno", value: "R$ 3.000", time: "21:00", highlight: false },
  { name: "Mega Bingo", value: "R$ 5.000", time: "22:00", highlight: false },
];

const PrizesSection = () => {
  return (
    <section id="premios" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bingo-gold/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Prêmios do Dia</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ganhe <span className="text-gradient-gold">prêmios</span> incríveis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja os últimos ganhadores e os prêmios que estão por vir
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent winners */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bingo-green animate-pulse" />
              Ganhadores Recentes
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {recentPrizes.map((prize) => {
                const Icon = prize.icon;
                return (
                  <div
                    key={prize.id}
                    className="glass rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:bg-card/80"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-foreground truncate">
                          {prize.winner}
                        </span>
                        <span className="font-display font-bold text-gradient-gold whitespace-nowrap">
                          {prize.value}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="truncate">{prize.game}</span>
                        <span className="whitespace-nowrap">{prize.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming prizes */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bingo-gold animate-pulse" />
              Próximos Prêmios
            </h3>
            <div className="space-y-4">
              {upcomingPrizes.map((prize, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-5 transition-all duration-300 ${
                    prize.highlight
                      ? 'bg-gradient-to-r from-bingo-gold/20 to-bingo-gold/5 border border-bingo-gold/30 shadow-gold'
                      : 'glass'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-foreground">
                      {prize.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {prize.time}
                    </span>
                  </div>
                  <div className="font-display text-2xl font-bold text-gradient-gold mb-3">
                    {prize.value}
                  </div>
                  <Button
                    variant={prize.highlight ? 'hero' : 'outline'}
                    size="sm"
                    className="w-full"
                  >
                    {prize.highlight ? 'Participar Agora' : 'Reservar Lugar'}
                  </Button>
                </div>
              ))}
            </div>

            {/* Total distributed */}
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-bingo-green/20 to-bingo-green/5 border border-bingo-green/30">
              <div className="text-sm text-muted-foreground mb-1">
                Total distribuído hoje
              </div>
              <div className="font-display text-3xl font-bold text-bingo-green">
                R$ 47.850
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
