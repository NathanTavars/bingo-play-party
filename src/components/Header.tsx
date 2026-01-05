import { Button } from "@/components/ui/button";
import { CircleDot, User, Wallet } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <CircleDot className="w-8 h-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="font-display text-2xl font-bold text-gradient-gold">
              BingoMax
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#jogos" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Jogos Ao Vivo
            </a>
            <a href="#cartelas" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Cartelas
            </a>
            <a href="#premios" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Prêmios
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
              <Wallet className="w-4 h-4" />
              <span>R$ 0,00</span>
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Entrar</span>
            </Button>
            <Button variant="hero" size="sm">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
