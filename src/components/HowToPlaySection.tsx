import { Card } from "@/components/ui/card";
import { 
  UserPlus, 
  Wallet, 
  ShoppingCart, 
  Gamepad2, 
  Trophy, 
  ArrowRight,
  CreditCard,
  Banknote,
  QrCode
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Cadastre-se",
    description: "Crie sua conta gratuita em menos de 1 minuto. Basta informar nome, e-mail e senha.",
    color: "text-bingo-blue",
    bgColor: "bg-bingo-blue/20",
  },
  {
    icon: Wallet,
    title: "2. Deposite",
    description: "Adicione saldo à sua carteira via PIX, cartão ou boleto. Depósito mínimo de R$ 10.",
    color: "text-bingo-green",
    bgColor: "bg-bingo-green/20",
  },
  {
    icon: ShoppingCart,
    title: "3. Compre Cartelas",
    description: "Escolha sua sala favorita e compre quantas cartelas quiser. Quanto mais cartelas, maiores as chances!",
    color: "text-bingo-purple",
    bgColor: "bg-bingo-purple/20",
  },
  {
    icon: Gamepad2,
    title: "4. Jogue",
    description: "Acompanhe o sorteio ao vivo. Os números são marcados automaticamente nas suas cartelas.",
    color: "text-bingo-pink",
    bgColor: "bg-bingo-pink/20",
  },
  {
    icon: Trophy,
    title: "5. Ganhe!",
    description: "Complete uma linha, coluna ou diagonal e grite BINGO! O prêmio cai direto na sua carteira.",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
];

const paymentMethods = [
  { icon: QrCode, name: "PIX", description: "Instantâneo" },
  { icon: CreditCard, name: "Cartão", description: "Crédito/Débito" },
  { icon: Banknote, name: "Boleto", description: "Até 3 dias úteis" },
];

const HowToPlaySection = () => {
  return (
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Como <span className="text-gradient-gold">Jogar</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            É super simples começar a jogar e ganhar prêmios no BingoMax. Siga os passos abaixo!
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-5 gap-4 mb-16">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Card className="glass p-6 h-full text-center hover:scale-105 transition-transform">
                <div className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment Methods & Withdrawals */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Deposit */}
          <Card className="glass p-8">
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <Wallet className="w-8 h-8 text-bingo-green" />
              Como Depositar
            </h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Adicione saldo à sua conta de forma rápida e segura através dos nossos métodos de pagamento:
              </p>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="bg-muted/50 rounded-xl p-4 text-center">
                    <method.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{method.name}</div>
                    <div className="text-xs text-muted-foreground">{method.description}</div>
                  </div>
                ))}
              </div>
              <div className="bg-bingo-green/10 border border-bingo-green/30 rounded-xl p-4">
                <p className="text-sm">
                  <strong className="text-bingo-green">💡 Dica:</strong> Use PIX para depósitos instantâneos! Seu saldo fica disponível em segundos.
                </p>
              </div>
            </div>
          </Card>

          {/* Withdrawal */}
          <Card className="glass p-8">
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <Banknote className="w-8 h-8 text-primary" />
              Como Sacar
            </h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Retire seus ganhos a qualquer momento! O processo é simples e rápido:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">1</span>
                  <span className="text-sm">Acesse sua carteira e clique em "Sacar"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">2</span>
                  <span className="text-sm">Informe o valor e sua chave PIX</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">3</span>
                  <span className="text-sm">Confirme e receba em até 24 horas</span>
                </li>
              </ul>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                <p className="text-sm">
                  <strong className="text-primary">⚡ Rápido:</strong> Saques via PIX são processados em até 1 hora durante dias úteis!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowToPlaySection;
