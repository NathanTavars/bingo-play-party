import { Card } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  GamepadIcon,
  ArrowUpRight,
  ArrowDownRight,
  Spade
} from "lucide-react";

const stats = [
  { 
    title: "Usuários Ativos", 
    value: "2.847", 
    change: "+12%", 
    trend: "up",
    icon: Users,
    color: "text-bingo-blue"
  },
  { 
    title: "Receita Hoje", 
    value: "R$ 15.420", 
    change: "+8%", 
    trend: "up",
    icon: DollarSign,
    color: "text-bingo-green"
  },
  { 
    title: "Rodadas Bingo", 
    value: "234", 
    change: "+23%", 
    trend: "up",
    icon: GamepadIcon,
    color: "text-bingo-purple"
  },
  { 
    title: "Rodadas Video Poker", 
    value: "1.892", 
    change: "+45%", 
    trend: "up",
    icon: Spade,
    color: "text-amber-500"
  },
];

const recentTransactions = [
  { id: 1, user: "João Silva", type: "deposit", amount: "R$ 100,00", status: "approved", time: "2 min atrás" },
  { id: 2, user: "Maria Santos", type: "withdraw", amount: "R$ 250,00", status: "pending", time: "5 min atrás" },
  { id: 3, user: "Pedro Costa", type: "deposit", amount: "R$ 50,00", status: "approved", time: "8 min atrás" },
  { id: 4, user: "Ana Oliveira", type: "withdraw", amount: "R$ 500,00", status: "approved", time: "12 min atrás" },
  { id: 5, user: "Carlos Lima", type: "deposit", amount: "R$ 200,00", status: "approved", time: "15 min atrás" },
];

const activeGames = [
  { id: 1, name: "Bingo Clássico #1247", type: "bingo", players: 89, prize: "R$ 500", status: "Em andamento" },
  { id: 2, name: "Mega Jackpot #892", type: "bingo", players: 234, prize: "R$ 5.000", status: "Aguardando" },
  { id: 3, name: "Turbo Express #445", type: "bingo", players: 56, prize: "R$ 200", status: "Em andamento" },
  { id: 4, name: "Video Poker Mesa 1", type: "poker", players: 1, prize: "Variável", status: "Em andamento" },
  { id: 5, name: "Video Poker Mesa 2", type: "poker", players: 1, prize: "Variável", status: "Em andamento" },
];

const gameStats = {
  bingo: { played: 234, wins: 89, revenue: 8540, payout: 4200 },
  poker: { played: 1892, wins: 567, revenue: 12880, payout: 6340 },
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-bingo-green' : 'text-bingo-red'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-display font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Game Stats by Type */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-bingo-purple/20 rounded-lg">
              <GamepadIcon className="w-6 h-6 text-bingo-purple" />
            </div>
            <h2 className="text-xl font-display font-bold">Bingo</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Rodadas Jogadas</p>
              <p className="text-2xl font-bold">{gameStats.bingo.played}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Vitórias</p>
              <p className="text-2xl font-bold text-bingo-green">{gameStats.bingo.wins}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Receita</p>
              <p className="text-2xl font-bold text-primary">R$ {gameStats.bingo.revenue.toLocaleString('pt-BR')}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Pagamentos</p>
              <p className="text-2xl font-bold text-bingo-red">R$ {gameStats.bingo.payout.toLocaleString('pt-BR')}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Taxa de Vitória</p>
            <p className="text-lg font-bold">{((gameStats.bingo.wins / gameStats.bingo.played) * 100).toFixed(1)}%</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Spade className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-display font-bold">Video Poker</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Rodadas Jogadas</p>
              <p className="text-2xl font-bold">{gameStats.poker.played}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Vitórias</p>
              <p className="text-2xl font-bold text-bingo-green">{gameStats.poker.wins}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Receita</p>
              <p className="text-2xl font-bold text-primary">R$ {gameStats.poker.revenue.toLocaleString('pt-BR')}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Pagamentos</p>
              <p className="text-2xl font-bold text-bingo-red">R$ {gameStats.poker.payout.toLocaleString('pt-BR')}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-500/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Taxa de Vitória</p>
            <p className="text-lg font-bold">{((gameStats.poker.wins / gameStats.poker.played) * 100).toFixed(1)}%</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">Transações Recentes</h2>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{tx.user}</p>
                  <p className="text-sm text-muted-foreground">{tx.time}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.type === 'deposit' ? 'text-bingo-green' : 'text-bingo-red'}`}>
                    {tx.type === 'deposit' ? '+' : '-'}{tx.amount}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tx.status === 'approved' ? 'bg-bingo-green/20 text-bingo-green' : 'bg-primary/20 text-primary'
                  }`}>
                    {tx.status === 'approved' ? 'Aprovado' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Games */}
        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">Jogos Ativos</h2>
          <div className="space-y-3">
            {activeGames.map((game) => (
              <div key={game.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  {game.type === 'bingo' ? (
                    <GamepadIcon className="w-4 h-4 text-bingo-purple" />
                  ) : (
                    <Spade className="w-4 h-4 text-amber-500" />
                  )}
                  <div>
                    <p className="font-medium">{game.name}</p>
                    <p className="text-sm text-muted-foreground">{game.players} jogador{game.players > 1 ? 'es' : ''}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{game.prize}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    game.status === 'Em andamento' ? 'bg-bingo-green/20 text-bingo-green' : 'bg-muted text-muted-foreground'
                  }`}>
                    {game.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
