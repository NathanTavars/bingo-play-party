import { Button } from "@/components/ui/button";
import { CircleDot, User, Wallet, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <CircleDot className="w-8 h-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="font-display text-2xl font-bold text-gradient-gold">
              BingoMax
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Como Jogar
            </a>
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
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="sm">
                Cadastrar
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <a 
                href="#como-funciona" 
                className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Como Jogar
              </a>
              <a 
                href="#jogos" 
                className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jogos Ao Vivo
              </a>
              <a 
                href="#cartelas" 
                className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cartelas
              </a>
              <a 
                href="#premios" 
                className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Prêmios
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
