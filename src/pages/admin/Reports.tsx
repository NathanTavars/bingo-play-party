import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users,
  GamepadIcon,
  Download
} from "lucide-react";

const summaryData = [
  { title: "Receita Total", value: "R$ 45.230,00", change: "+15%", trend: "up", icon: DollarSign },
  { title: "Saques", value: "R$ 12.450,00", change: "+8%", trend: "up", icon: TrendingDown },
  { title: "Lucro Líquido", value: "R$ 32.780,00", change: "+18%", trend: "up", icon: TrendingUp },
  { title: "Novos Usuários", value: "324", change: "+22%", trend: "up", icon: Users },
];

const dailyData = [
  { date: "01/01", deposits: 5200, withdrawals: 1800, games: 45, users: 12 },
  { date: "02/01", deposits: 4800, withdrawals: 2200, games: 52, users: 8 },
  { date: "03/01", deposits: 6100, withdrawals: 1500, games: 48, users: 15 },
  { date: "04/01", deposits: 5500, withdrawals: 2800, games: 55, users: 11 },
  { date: "05/01", deposits: 7200, withdrawals: 1200, games: 62, users: 18 },
  { date: "06/01", deposits: 4300, withdrawals: 3100, games: 38, users: 7 },
  { date: "07/01", deposits: 8900, withdrawals: 2400, games: 71, users: 22 },
];

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

      {/* Detailed Table */}
      <Card className="p-6">
        <h2 className="text-xl font-display font-bold mb-4">Detalhamento Diário</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Data</th>
                <th className="text-right py-3 px-4 font-semibold">Depósitos</th>
                <th className="text-right py-3 px-4 font-semibold">Saques</th>
                <th className="text-right py-3 px-4 font-semibold">Saldo</th>
                <th className="text-right py-3 px-4 font-semibold">Rodadas</th>
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
                      <GamepadIcon className="w-4 h-4 text-muted-foreground" />
                      {day.games}
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
                <td className="py-3 px-4 text-right">{dailyData.reduce((acc, d) => acc + d.games, 0)}</td>
                <td className="py-3 px-4 text-right">{dailyData.reduce((acc, d) => acc + d.users, 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
