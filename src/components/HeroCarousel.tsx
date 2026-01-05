import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Trophy, Gift, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    badge: "12 jogos ao vivo agora",
    title: "A sua sorte",
    highlight: "começa aqui!",
    description: "Jogue bingo online com milhares de jogadores. Compre cartelas, acompanhe sorteios em tempo real e ganhe prêmios incríveis!",
    cta: { text: "Jogar Agora", icon: Play, link: "/jogo" },
    secondaryCta: { text: "Ver Prêmios", icon: Trophy, link: "#premios" },
    stats: [
      { value: "R$ 50K+", label: "em prêmios hoje", color: "text-primary" },
      { value: "2.5K+", label: "jogadores online", color: "text-bingo-green" },
      { value: "150+", label: "ganhadores/dia", color: "text-bingo-purple" },
    ],
  },
  {
    id: 2,
    badge: "Promoção especial",
    title: "Compre 3 cartelas",
    highlight: "Ganhe 1 grátis!",
    description: "Aproveite nossa promoção exclusiva! Quanto mais você joga, mais chances de ganhar prêmios incríveis.",
    cta: { text: "Comprar Cartelas", icon: Gift, link: "#cartelas" },
    secondaryCta: { text: "Como Funciona", icon: Sparkles, link: "#como-funciona" },
    stats: [
      { value: "25%", label: "de desconto", color: "text-primary" },
      { value: "R$ 0,50", label: "por cartela", color: "text-bingo-green" },
      { value: "4x", label: "mais chances", color: "text-bingo-purple" },
    ],
  },
  {
    id: 3,
    badge: "Super jackpot",
    title: "Jackpot acumulado",
    highlight: "R$ 100.000!",
    description: "O maior prêmio já visto no BingoMax! Complete a cartela em até 30 bolas e leve o jackpot inteiro para casa.",
    cta: { text: "Tentar a Sorte", icon: Trophy, link: "/jogo" },
    secondaryCta: { text: "Ver Regras", icon: Sparkles, link: "#como-funciona" },
    stats: [
      { value: "R$ 100K", label: "jackpot", color: "text-primary" },
      { value: "30", label: "bolas máximo", color: "text-bingo-green" },
      { value: "1", label: "vencedor leva tudo", color: "text-bingo-purple" },
    ],
  },
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-bingo-red/20 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-bingo-purple/20 blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-bingo-gold/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-bingo-green/20 blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(220_20%_20%/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(220_20%_20%/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="max-w-4xl mx-auto text-center px-4">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
                    <span className="w-2 h-2 rounded-full bg-bingo-red animate-pulse" />
                    <span className="text-sm font-medium text-foreground/80">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Main heading */}
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                    <span className="text-foreground">{slide.title}</span>
                    <br />
                    <span className="text-gradient-gold">{slide.highlight}</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link to={slide.cta.link}>
                      <Button variant="hero" size="xl" className="group">
                        <slide.cta.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        {slide.cta.text}
                      </Button>
                    </Link>
                    <a href={slide.secondaryCta.link}>
                      <Button variant="outline" size="xl">
                        <slide.secondaryCta.icon className="w-5 h-5" />
                        {slide.secondaryCta.text}
                      </Button>
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                    {slide.stats.map((stat, index) => (
                      <div key={index} className="glass rounded-2xl p-4">
                        <div className={`font-display text-2xl md:text-3xl font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </Carousel>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index 
                  ? "bg-primary w-8" 
                  : "bg-muted hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroCarousel;
