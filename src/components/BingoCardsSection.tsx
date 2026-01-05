import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Sparkles } from "lucide-react";

interface CardPackage {
  id: number;
  name: string;
  quantity: number;
  price: string;
  originalPrice?: string;
  popular?: boolean;
  features: string[];
  icon: React.ElementType;
  gradient: string;
}

const cardPackages: CardPackage[] = [
  {
    id: 1,
    name: "Iniciante",
    quantity: 3,
    price: "R$ 5,00",
    features: ["3 cartelas", "Bingo clássico", "Chat ao vivo"],
    icon: Sparkles,
    gradient: "from-bingo-blue/20 to-bingo-blue/5",
  },
  {
    id: 2,
    name: "Popular",
    quantity: 10,
    price: "R$ 15,00",
    originalPrice: "R$ 20,00",
    popular: true,
    features: ["10 cartelas", "Todos os jogos", "Bônus de 2 cartelas", "Chat VIP"],
    icon: Star,
    gradient: "from-bingo-gold/20 to-bingo-gold/5",
  },
  {
    id: 3,
    name: "Premium",
    quantity: 25,
    price: "R$ 30,00",
    originalPrice: "R$ 50,00",
    features: ["25 cartelas", "Jogos exclusivos", "Bônus de 5 cartelas", "Prioridade no sorteio", "Suporte 24h"],
    icon: Crown,
    gradient: "from-bingo-purple/20 to-bingo-purple/5",
  },
];

const BingoCard = () => {
  // Generate random bingo card numbers
  const generateColumn = (min: number, max: number) => {
    const numbers: (number | null)[] = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) numbers.push(num);
    }
    // Add free space in middle for some columns
    return numbers;
  };

  const columns = [
    generateColumn(1, 15),   // B
    generateColumn(16, 30),  // I
    generateColumn(31, 45),  // N
    generateColumn(46, 60),  // G
    generateColumn(61, 75),  // O
  ];

  // Set center as free space
  columns[2][2] = null;

  return (
    <div className="w-full max-w-[180px] mx-auto">
      {/* Header */}
      <div className="grid grid-cols-5 gap-1 mb-1">
        {['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
          <div
            key={letter}
            className="aspect-square rounded-lg bg-gradient-gold flex items-center justify-center font-display font-bold text-primary-foreground text-sm"
          >
            {letter}
          </div>
        ))}
      </div>
      {/* Numbers */}
      <div className="grid grid-cols-5 gap-1">
        {[0, 1, 2, 3, 4].map((row) =>
          columns.map((col, colIndex) => (
            <div
              key={`${row}-${colIndex}`}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold ${
                col[row] === null
                  ? 'bg-bingo-gold text-primary-foreground'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              {col[row] === null ? <Star className="w-3 h-3" /> : col[row]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const PackageCard = ({ pkg }: { pkg: CardPackage }) => {
  const Icon = pkg.icon;

  return (
    <div className={`relative rounded-3xl p-6 bg-gradient-to-br ${pkg.gradient} border border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-card ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full bg-gradient-gold text-xs font-bold text-primary-foreground">
            MAIS VENDIDO
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Name */}
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        {pkg.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-display text-3xl font-bold text-gradient-gold">
          {pkg.price}
        </span>
        {pkg.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            {pkg.originalPrice}
          </span>
        )}
      </div>

      {/* Sample card */}
      <div className="mb-6 p-3 rounded-xl bg-card/50">
        <BingoCard />
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-foreground/80">
            <Check className="w-4 h-4 text-bingo-green flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button variant={pkg.popular ? 'hero' : 'default'} className="w-full">
        Comprar Agora
      </Button>
    </div>
  );
};

const BingoCardsSection = () => {
  return (
    <section id="cartelas" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Compre suas <span className="text-gradient-gold">cartelas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha o pacote ideal para você. Quanto mais cartelas, maiores suas chances de ganhar!
          </p>
        </div>

        {/* Packages grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cardPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BingoCardsSection;
