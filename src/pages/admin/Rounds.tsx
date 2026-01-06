import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Play, Pause, Eye, Trash2, Clock, Users, Trophy } from "lucide-react";

const rounds = [
  { 
    id: 1, 
    name: "Bingo Clássico #1248", 
    type: "classic",
    prize: "R$ 500,00",
    cardPrice: "R$ 2,00",
    players: 89,
    cards: 156,
    status: "active",
    startsAt: "14:30",
    createdAt: "06/01/2024"
  },
  { 
    id: 2, 
    name: "Mega Jackpot #893", 
    type: "jackpot",
    prize: "R$ 5.000,00",
    cardPrice: "R$ 10,00",
    players: 234,
    cards: 412,
    status: "waiting",
    startsAt: "15:00",
    createdAt: "06/01/2024"
  },
  { 
    id: 3, 
    name: "Turbo Express #446", 
    type: "turbo",
    prize: "R$ 200,00",
    cardPrice: "R$ 1,00",
    players: 56,
    cards: 98,
    status: "finished",
    startsAt: "14:00",
    createdAt: "06/01/2024"
  },
  { 
    id: 4, 
    name: "Super Prêmio #124", 
    type: "jackpot",
    prize: "R$ 1.500,00",
    cardPrice: "R$ 5,00",
    players: 0,
    cards: 0,
    status: "scheduled",
    startsAt: "16:00",
    createdAt: "06/01/2024"
  },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  classic: { label: "Clássico", color: "bg-bingo-blue/20 text-bingo-blue" },
  turbo: { label: "Turbo", color: "bg-bingo-purple/20 text-bingo-purple" },
  jackpot: { label: "Jackpot", color: "bg-primary/20 text-primary" },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Em Andamento", color: "bg-bingo-green/20 text-bingo-green" },
  waiting: { label: "Aguardando", color: "bg-primary/20 text-primary" },
  scheduled: { label: "Agendada", color: "bg-bingo-blue/20 text-bingo-blue" },
  finished: { label: "Finalizada", color: "bg-muted text-muted-foreground" },
};

const Rounds = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Rodadas</h1>
          <p className="text-muted-foreground">Gerencie os jogos de bingo</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Rodada
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Nova Rodada</DialogTitle>
              <DialogDescription>
                Configure os detalhes da nova rodada de bingo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome da Rodada</Label>
                <Input placeholder="Ex: Bingo Especial de Ano Novo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Clássico</SelectItem>
                      <SelectItem value="turbo">Turbo</SelectItem>
                      <SelectItem value="jackpot">Jackpot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Horário de Início</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prêmio</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
                <div className="space-y-2">
                  <Label>Preço da Cartela</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mín. Jogadores</Label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label>Máx. Cartelas/Jogador</Label>
                  <Input type="number" defaultValue="6" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Criar Rodada</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Round Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-bingo-green/50 bg-bingo-green/5">
          <div className="flex items-center gap-4">
            <Play className="w-10 h-10 text-bingo-green" />
            <div>
              <p className="text-sm text-muted-foreground">Rodadas Ativas</p>
              <p className="text-3xl font-display font-bold">2</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="w-10 h-10 text-bingo-blue" />
            <div>
              <p className="text-sm text-muted-foreground">Jogadores Online</p>
              <p className="text-3xl font-display font-bold">323</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-10 h-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Prêmios Hoje</p>
              <p className="text-3xl font-display font-bold">R$ 12.500</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rodada</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Prêmio</TableHead>
              <TableHead>Cartela</TableHead>
              <TableHead>Jogadores</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds.map((round) => (
              <TableRow key={round.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{round.name}</p>
                    <p className="text-xs text-muted-foreground">{round.cards} cartelas vendidas</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={typeLabels[round.type].color}>
                    {typeLabels[round.type].label}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-primary">{round.prize}</TableCell>
                <TableCell>{round.cardPrice}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {round.players}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {round.startsAt}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={statusLabels[round.status].color}>
                    {statusLabels[round.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" title="Ver detalhes">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {round.status === 'waiting' && (
                      <Button variant="ghost" size="icon" className="text-bingo-green" title="Iniciar">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    {round.status === 'active' && (
                      <Button variant="ghost" size="icon" className="text-primary" title="Pausar">
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    {round.status === 'scheduled' && (
                      <Button variant="ghost" size="icon" className="text-destructive" title="Cancelar">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Rounds;
