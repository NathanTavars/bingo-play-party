import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users,
  GamepadIcon,
  Download,
  Spade,
  Trophy
} from "lucide-react";

const summaryData = [
  { title: "Receita Total", value: "R$ 45.230,00", change: "+15%", trend: "up", icon: DollarSign },
  { title: "Saques", value: "R$ 12.450,00", change: "+8%", trend: "up", icon: TrendingDown },
  { title: "Lucro Líquido", value: "R$ 32.780,00", change: "+18%", trend: "up", icon: TrendingUp },
  { title: "Novos Usuários", value: "324", change: "+22%", trend: "up", icon: Users },
];

const dailyData = [
  { date: "01/01", deposits: 5200, withdrawals: 1800, bingoGames: 45, pokerGames: 312, bingoWins: 18, pokerWins: 94, users: 12 },
  { date: "02/01", deposits: 4800, withdrawals: 2200, bingoGames: 52, pokerGames: 289, bingoWins: 21, pokerWins: 87, users: 8 },
  { date: "03/01", deposits: 6100, withdrawals: 1500, bingoGames: 48, pokerGames: 356, bingoWins: 19, pokerWins: 107, users: 15 },
  { date: "04/01", deposits: 5500, withdrawals: 2800, bingoGames: 55, pokerGames: 298, bingoWins: 22, pokerWins: 89, users: 11 },
  { date: "05/01", deposits: 7200, withdrawals: 1200, bingoGames: 62, pokerGames: 423, bingoWins: 25, pokerWins: 127, users: 18 },
  { date: "06/01", deposits: 4300, withdrawals: 3100, bingoGames: 38, pokerGames: 245, bingoWins: 15, pokerWins: 73, users: 7 },
  { date: "07/01", deposits: 8900, withdrawals: 2400, bingoGames: 71, pokerGames: 512, bingoWins: 28, pokerWins: 154, users: 22 },
];

const gameTypeStats = {
  bingo: {
    totalGames: 371,
    totalWins: 148,
    revenue: 18540,
    payout: 9270,
    avgBet: 50,
    popularTime: "20:00 - 22:00"
  },
  poker: {
    totalGames: 2435,
    totalWins: 731,
    revenue: 26690,
    payout: 12140,
    avgBet: 11,
    popularTime: "21:00 - 23:00"
  }
};

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análise financeira e operacional</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item) => (
          <Card key={item.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <item.icon className="w-8 h-8 text-primary" />
              <span className={`flex items-center text-sm ${item.trend === 'up' ? 'text-bingo-green' : 'text-bingo-red'}`}>
                {item.change}
                {item.trend === 'up' ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />}
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold">{item.value}</h3>
            <p className="text-sm text-muted-foreground">{item.title}</p>
          </Card>
        ))}
      </div>

      {/* Game Type Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-bingo-purple/20 rounded-lg">
              <GamepadIcon className="w-6 h-6 text-bingo-purple" />
            </div>
            <h2 className="text-xl font-display font-bold">Resumo Bingo</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total de Rodadas</span>
              <span className="font-bold">{gameTypeStats.bingo.totalGames}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Vitórias</span>
              <span className="font-bold text-bingo-green">{gameTypeStats.bingo.totalWins}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Taxa de Vitória</span>
              <span className="font-bold">{((gameTypeStats.bingo.totalWins / gameTypeStats.bingo.totalGames) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Receita</span>
              <span className="font-bold text-primary">R$ {gameTypeStats.bingo.revenue.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Pagamentos</span>
              <span className="font-bold text-bingo-red">R$ {gameTypeStats.bingo.payout.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Aposta Média</span>
              <span className="font-bold">R$ {gameTypeStats.bingo.avgBet}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Horário Popular</span>
              <span className="font-bold">{gameTypeStats.bingo.popularTime}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Spade className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-display font-bold">Resumo Video Poker</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total de Rodadas</span>
              <span className="font-bold">{gameTypeStats.poker.totalGames}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Vitórias</span>
              <span className="font-bold text-bingo-green">{gameTypeStats.poker.totalWins}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Taxa de Vitória</span>
              <span className="font-bold">{((gameTypeStats.poker.totalWins / gameTypeStats.poker.totalGames) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Receita</span>
              <span className="font-bold text-primary">R$ {gameTypeStats.poker.revenue.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Pagamentos</span>
              <span className="font-bold text-bingo-red">R$ {gameTypeStats.poker.payout.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Aposta Média</span>
              <span className="font-bold">R$ {gameTypeStats.poker.avgBet}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Horário Popular</span>
              <span className="font-bold">{gameTypeStats.poker.popularTime}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold">Detalhamento Diário</h2>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="bingo">Bingo</TabsTrigger>
              <TabsTrigger value="poker">Video Poker</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Data</th>
                    <th className="text-right py-3 px-4 font-semibold">Depósitos</th>
                    <th className="text-right py-3 px-4 font-semibold">Saques</th>
                    <th className="text-right py-3 px-4 font-semibold">Saldo</th>
                    <th className="text-right py-3 px-4 font-semibold">Bingo</th>
                    <th className="text-right py-3 px-4 font-semibold">Poker</th>
                    <th className="text-right py-3 px-4 font-semibold">Novos Usuários</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.map((day) => (
                    <tr key={day.date} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{day.date}</td>
                      <td className="py-3 px-4 text-right text-bingo-green">
                        R$ {day.deposits.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-right text-bingo-red">
                        R$ {day.withdrawals.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        R$ {(day.deposits - day.withdrawals).toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1">
                          <GamepadIcon className="w-4 h-4 text-bingo-purple" />
                          {day.bingoGames} <span className="text-xs text-bingo-green">({day.bingoWins}W)</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1">
                          <Spade className="w-4 h-4 text-amber-500" />
                          {day.pokerGames} <span className="text-xs text-bingo-green">({day.pokerWins}W)</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {day.users}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 font-semibold">
                    <td className="py-3 px-4">Total</td>
                    <td className="py-3 px-4 text-right text-bingo-green">
                      R$ {dailyData.reduce((acc, d) => acc + d.deposits, 0).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right text-bingo-red">
                      R$ {dailyData.reduce((acc, d) => acc + d.withdrawals, 0).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      R$ {dailyData.reduce((acc, d) => acc + (d.deposits - d.withdrawals), 0).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">{dailyData.reduce((acc, d) => acc + d.bingoGames, 0)} ({dailyData.reduce((acc, d) => acc + d.bingoWins, 0)}W)</td>
                    <td className="py-3 px-4 text-right">{dailyData.reduce((acc, d) => acc + d.pokerGames, 0)} ({dailyData.reduce((acc, d) => acc + d.pokerWins, 0)}W)</td>
                    <td className="py-3 px-4 text-right">{dailyData.reduce((acc, d) => acc + d.users, 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="bingo">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Data</th>
                    <th className="text-right py-3 px-4 font-semibold">Rodadas</th>
                    <th className="text-right py-3 px-4 font-semibold">Vitórias</th>
                    <th className="text-right py-3 px-4 font-semibold">Taxa</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.map((day) => (
                    <tr key={day.date} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{day.date}</td>
                      <td className="py-3 px-4 text-right">{day.bingoGames}</td>
                      <td className="py-3 px-4 text-right text-bingo-green">
                        <Trophy className="w-4 h-4 inline mr-1" />
                        {day.bingoWins}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {((day.bingoWins / day.bingoGames) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="poker">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Data</th>
                    <th className="text-right py-3 px-4 font-semibold">Rodadas</th>
                    <th className="text-right py-3 px-4 font-semibold">Vitórias</th>
                    <th className="text-right py-3 px-4 font-semibold">Taxa</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.map((day) => (
                    <tr key={day.date} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{day.date}</td>
                      <td className="py-3 px-4 text-right">{day.pokerGames}</td>
                      <td className="py-3 px-4 text-right text-bingo-green">
                        <Trophy className="w-4 h-4 inline mr-1" />
                        {day.pokerWins}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {((day.pokerWins / day.pokerGames) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Reports;
