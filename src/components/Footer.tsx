import { CircleDot, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CircleDot className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-bold text-gradient-gold">
                BingoMax
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              A melhor plataforma de bingo online do Brasil. Jogue com segurança e diversão!
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Jogos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Bingo Clássico</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Bingo Turbo</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Jackpot</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Torneios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Como Jogar</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Jogo Responsável</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Licenças</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 BingoMax. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">+18 | Jogue com responsabilidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
