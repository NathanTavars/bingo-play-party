import { Button } from "@/components/ui/button";
import { Play, Trophy, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating bingo balls */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-bingo-red/20 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-bingo-purple/20 blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-bingo-gold/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-bingo-green/20 blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(220_20%_20%/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(220_20%_20%/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
            <span className="w-2 h-2 rounded-full bg-bingo-red animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              12 jogos ao vivo agora
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-foreground">A sua sorte</span>
            <br />
            <span className="text-gradient-gold">começa aqui!</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Jogue bingo online com milhares de jogadores. Compre cartelas, 
            acompanhe sorteios em tempo real e ganhe prêmios incríveis!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              Jogar Agora
            </Button>
            <Button variant="outline" size="xl">
              <Trophy className="w-5 h-5" />
              Ver Prêmios
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="glass rounded-2xl p-4">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                R$ 50K+
              </div>
              <div className="text-sm text-muted-foreground">
                em prêmios hoje
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="font-display text-2xl md:text-3xl font-bold text-bingo-green">
                2.5K+
              </div>
              <div className="text-sm text-muted-foreground">
                jogadores online
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="font-display text-2xl md:text-3xl font-bold text-bingo-purple">
                150+
              </div>
              <div className="text-sm text-muted-foreground">
                ganhadores/dia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
