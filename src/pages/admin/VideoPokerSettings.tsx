import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Copy, Star, Zap, DollarSign, Gauge, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickBetButton {
  id: string;
  label: string;
  value: number;
}

interface PokerRound {
  id: string;
  name: string;
  payTableId: string;
  payTableName: string;
  minBet: number;
  maxBet: number;
  quickButtons: QuickBetButton[];
  speed: number; // 0.5x a 3x
  active: boolean;
  createdAt: string;
}

const initialRounds: PokerRound[] = [
  {
    id: "1",
    name: "Video Poker Clássico",
    payTableId: "1",
    payTableName: "Padrão - Jacks or Better",
    minBet: 1,
    maxBet: 100,
    quickButtons: [
      { id: "1", label: "Mínimo", value: 1 },
      { id: "2", label: "R$ 5", value: 5 },
      { id: "3", label: "R$ 10", value: 10 },
      { id: "4", label: "R$ 25", value: 25 },
      { id: "5", label: "Máximo", value: 100 },
    ],
    speed: 1,
    active: true,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Video Poker Turbo",
    payTableId: "2",
    payTableName: "Premium - Alto Risco",
    minBet: 5,
    maxBet: 500,
    quickButtons: [
      { id: "1", label: "R$ 5", value: 5 },
      { id: "2", label: "R$ 20", value: 20 },
      { id: "3", label: "R$ 50", value: 50 },
      { id: "4", label: "R$ 100", value: 100 },
      { id: "5", label: "R$ 500", value: 500 },
    ],
    speed: 2,
    active: true,
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Video Poker High Roller",
    payTableId: "2",
    payTableName: "Premium - Alto Risco",
    minBet: 50,
    maxBet: 5000,
    quickButtons: [
      { id: "1", label: "R$ 50", value: 50 },
      { id: "2", label: "R$ 100", value: 100 },
      { id: "3", label: "R$ 500", value: 500 },
      { id: "4", label: "R$ 1000", value: 1000 },
      { id: "5", label: "R$ 5000", value: 5000 },
    ],
    speed: 1.5,
    active: false,
    createdAt: "2024-02-01",
  },
];

const availablePayTables = [
  { id: "1", name: "Padrão - Jacks or Better" },
  { id: "2", name: "Premium - Alto Risco" },
  { id: "3", name: "Conservador - Baixo Risco" },
];

const speedLabels: Record<number, string> = {
  0.5: "Muito Lento",
  0.75: "Lento",
  1: "Normal",
  1.5: "Rápido",
  2: "Muito Rápido",
  2.5: "Turbo",
  3: "Ultra Turbo",
};

const VideoPokerSettings = () => {
  const [rounds, setRounds] = useState<PokerRound[]>(initialRounds);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRound, setEditingRound] = useState<PokerRound | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    payTableId: "1",
    minBet: 1,
    maxBet: 100,
    quickButtons: [
      { id: "1", label: "Mínimo", value: 1 },
      { id: "2", label: "R$ 5", value: 5 },
      { id: "3", label: "R$ 10", value: 10 },
      { id: "4", label: "R$ 25", value: 25 },
      { id: "5", label: "Máximo", value: 100 },
    ] as QuickBetButton[],
    speed: 1,
  });
  const { toast } = useToast();

  const handleOpenCreate = () => {
    setEditingRound(null);
    setFormData({
      name: "",
      payTableId: "1",
      minBet: 1,
      maxBet: 100,
      quickButtons: [
        { id: "1", label: "Mínimo", value: 1 },
        { id: "2", label: "R$ 5", value: 5 },
        { id: "3", label: "R$ 10", value: 10 },
        { id: "4", label: "R$ 25", value: 25 },
        { id: "5", label: "Máximo", value: 100 },
      ],
      speed: 1,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (round: PokerRound) => {
    setEditingRound(round);
    setFormData({
      name: round.name,
      payTableId: round.payTableId,
      minBet: round.minBet,
      maxBet: round.maxBet,
      quickButtons: [...round.quickButtons],
      speed: round.speed,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da rodada é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (formData.minBet >= formData.maxBet) {
      toast({
        title: "Erro",
        description: "A aposta mínima deve ser menor que a máxima.",
        variant: "destructive",
      });
      return;
    }

    const payTable = availablePayTables.find(p => p.id === formData.payTableId);

    if (editingRound) {
      setRounds(rounds.map(r => 
        r.id === editingRound.id 
          ? { 
              ...r, 
              name: formData.name, 
              payTableId: formData.payTableId,
              payTableName: payTable?.name || "",
              minBet: formData.minBet,
              maxBet: formData.maxBet,
              quickButtons: formData.quickButtons,
              speed: formData.speed,
            }
          : r
      ));
      toast({
        title: "Rodada atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      const newRound: PokerRound = {
        id: Date.now().toString(),
        name: formData.name,
        payTableId: formData.payTableId,
        payTableName: payTable?.name || "",
        minBet: formData.minBet,
        maxBet: formData.maxBet,
        quickButtons: formData.quickButtons,
        speed: formData.speed,
        active: true,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setRounds([...rounds, newRound]);
      toast({
        title: "Rodada criada",
        description: "A nova rodada de Video Poker foi criada.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setRounds(rounds.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const handleDelete = (id: string) => {
    setRounds(rounds.filter(r => r.id !== id));
    toast({
      title: "Rodada excluída",
      description: "A rodada foi removida com sucesso.",
    });
  };

  const handleDuplicate = (round: PokerRound) => {
    const newRound: PokerRound = {
      ...round,
      id: Date.now().toString(),
      name: `${round.name} (Cópia)`,
      active: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setRounds([...rounds, newRound]);
    toast({
      title: "Rodada duplicada",
      description: "A rodada foi duplicada com sucesso.",
    });
  };

  const updateQuickButton = (index: number, field: 'label' | 'value', value: string | number) => {
    const updated = [...formData.quickButtons];
    if (field === 'label') {
      updated[index] = { ...updated[index], label: value as string };
    } else {
      updated[index] = { ...updated[index], value: value as number };
    }
    setFormData({ ...formData, quickButtons: updated });
  };

  const addQuickButton = () => {
    if (formData.quickButtons.length >= 8) {
      toast({
        title: "Limite atingido",
        description: "Máximo de 8 botões rápidos.",
        variant: "destructive",
      });
      return;
    }
    setFormData({
      ...formData,
      quickButtons: [
        ...formData.quickButtons,
        { id: Date.now().toString(), label: "Novo", value: formData.minBet },
      ],
    });
  };

  const removeQuickButton = (index: number) => {
    if (formData.quickButtons.length <= 2) {
      toast({
        title: "Mínimo de botões",
        description: "É necessário pelo menos 2 botões rápidos.",
        variant: "destructive",
      });
      return;
    }
    setFormData({
      ...formData,
      quickButtons: formData.quickButtons.filter((_, i) => i !== index),
    });
  };

  const getSpeedLabel = (speed: number) => {
    const closest = Object.keys(speedLabels)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - speed) < Math.abs(prev - speed) ? curr : prev
      );
    return speedLabels[closest];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Rodadas Video Poker</h1>
          <p className="text-muted-foreground">Configure apostas, botões rápidos e velocidade do jogo</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Rodada
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Play className="w-8 h-8 text-bingo-green" />
            <div>
              <p className="text-sm text-muted-foreground">Rodadas Ativas</p>
              <p className="text-2xl font-bold">{rounds.filter(r => r.active).length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Aposta Média</p>
              <p className="text-2xl font-bold">R$ {Math.round(rounds.reduce((acc, r) => acc + (r.minBet + r.maxBet) / 2, 0) / rounds.length)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-bingo-purple" />
            <div>
              <p className="text-sm text-muted-foreground">Rodadas Turbo</p>
              <p className="text-2xl font-bold">{rounds.filter(r => r.speed >= 2).length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Gauge className="w-8 h-8 text-bingo-blue" />
            <div>
              <p className="text-sm text-muted-foreground">Velocidade Média</p>
              <p className="text-2xl font-bold">{(rounds.reduce((acc, r) => acc + r.speed, 0) / rounds.length).toFixed(1)}x</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Rounds Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rounds.map((round) => (
          <Card key={round.id} className={round.active ? "ring-2 ring-bingo-green/50" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {round.name}
                    {round.speed >= 2 && (
                      <Zap className="w-4 h-4 text-bingo-purple fill-bingo-purple" />
                    )}
                  </CardTitle>
                  <CardDescription>{round.payTableName}</CardDescription>
                </div>
                <Badge variant={round.active ? "default" : "secondary"}>
                  {round.active ? "Ativa" : "Inativa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Bet Range */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Aposta Mínima</span>
                  <span className="font-mono font-bold text-bingo-green">R$ {round.minBet}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Aposta Máxima</span>
                  <span className="font-mono font-bold text-primary">R$ {round.maxBet}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Velocidade</span>
                  <span className="font-mono font-bold text-bingo-purple">{round.speed}x ({getSpeedLabel(round.speed)})</span>
                </div>
              </div>

              {/* Quick Buttons Preview */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Botões Rápidos:</p>
                <div className="flex flex-wrap gap-1">
                  {round.quickButtons.map((btn) => (
                    <Badge key={btn.id} variant="outline" className="text-xs">
                      {btn.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={round.active}
                    onCheckedChange={() => handleToggleActive(round.id)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {round.active ? "Ativa" : "Inativa"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicate(round)}
                    title="Duplicar"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEdit(round)}
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(round.id)}
                    className="text-destructive hover:text-destructive"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRound ? "Editar Rodada Video Poker" : "Nova Rodada Video Poker"}
            </DialogTitle>
            <DialogDescription>
              Configure as apostas, botões rápidos e velocidade do jogo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Rodada</Label>
                <Input
                  id="name"
                  placeholder="Ex: Video Poker VIP"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tabela de Pagamento</Label>
                <Select 
                  value={formData.payTableId} 
                  onValueChange={(value) => setFormData({ ...formData, payTableId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePayTables.map((table) => (
                      <SelectItem key={table.id} value={table.id}>
                        {table.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bet Range */}
            <Card className="p-4">
              <CardTitle className="text-base flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4" />
                Limites de Aposta
              </CardTitle>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Aposta Mínima (R$)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.minBet}
                    onChange={(e) => setFormData({ ...formData, minBet: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Aposta Máxima (R$)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.maxBet}
                    onChange={(e) => setFormData({ ...formData, maxBet: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </div>
            </Card>

            {/* Quick Buttons */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Botões Rápidos
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addQuickButton}>
                  <Plus className="w-3 h-3 mr-1" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-3">
                {formData.quickButtons.map((btn, index) => (
                  <div key={btn.id} className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Rótulo"
                        value={btn.label}
                        onChange={(e) => updateQuickButton(index, 'label', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Valor"
                        value={btn.value}
                        onChange={(e) => updateQuickButton(index, 'value', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuickButton(index)}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">Prévia dos botões:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.quickButtons.map((btn) => (
                    <Button key={btn.id} variant="outline" size="sm" className="pointer-events-none">
                      {btn.label} - R$ {btn.value}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Speed Control */}
            <Card className="p-4">
              <CardTitle className="text-base flex items-center gap-2 mb-4">
                <Gauge className="w-4 h-4" />
                Velocidade do Jogo
              </CardTitle>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0.5x</span>
                  <span className="text-lg font-bold text-primary">{formData.speed}x</span>
                  <span className="text-sm text-muted-foreground">3x</span>
                </div>
                <Slider
                  value={[formData.speed]}
                  onValueChange={(value) => setFormData({ ...formData, speed: value[0] })}
                  min={0.5}
                  max={3}
                  step={0.25}
                  className="w-full"
                />
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-base px-4 py-1">
                    {getSpeedLabel(formData.speed)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Velocidade mais rápida = animações mais curtas entre distribuição e troca de cartas
                </p>
              </div>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editingRound ? "Salvar Alterações" : "Criar Rodada"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoPokerSettings;
