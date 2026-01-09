import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
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
import { Plus, Edit, Trash2, Copy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PayTableEntry {
  hand: string;
  payout: number;
  description: string;
}

interface PayTable {
  id: string;
  name: string;
  active: boolean;
  isDefault: boolean;
  createdAt: string;
  entries: PayTableEntry[];
}

const defaultHands = [
  { hand: "Royal Flush", description: "A-K-Q-J-10 do mesmo naipe", defaultPayout: 800 },
  { hand: "Straight Flush", description: "5 cartas consecutivas do mesmo naipe", defaultPayout: 50 },
  { hand: "Quadra", description: "4 cartas iguais", defaultPayout: 25 },
  { hand: "Full House", description: "Trinca + Par", defaultPayout: 9 },
  { hand: "Flush", description: "5 cartas do mesmo naipe", defaultPayout: 6 },
  { hand: "Straight", description: "5 cartas consecutivas", defaultPayout: 4 },
  { hand: "Trinca", description: "3 cartas iguais", defaultPayout: 3 },
  { hand: "Dois Pares", description: "2 pares diferentes", defaultPayout: 2 },
  { hand: "Jacks or Better", description: "Par de J, Q, K ou A", defaultPayout: 1 },
];

const initialPayTables: PayTable[] = [
  {
    id: "1",
    name: "Padrão - Jacks or Better",
    active: true,
    isDefault: true,
    createdAt: "2024-01-01",
    entries: defaultHands.map(h => ({ hand: h.hand, payout: h.defaultPayout, description: h.description })),
  },
  {
    id: "2",
    name: "Premium - Alto Risco",
    active: true,
    isDefault: false,
    createdAt: "2024-01-15",
    entries: [
      { hand: "Royal Flush", payout: 1200, description: "A-K-Q-J-10 do mesmo naipe" },
      { hand: "Straight Flush", payout: 80, description: "5 cartas consecutivas do mesmo naipe" },
      { hand: "Quadra", payout: 40, description: "4 cartas iguais" },
      { hand: "Full House", payout: 12, description: "Trinca + Par" },
      { hand: "Flush", payout: 8, description: "5 cartas do mesmo naipe" },
      { hand: "Straight", payout: 5, description: "5 cartas consecutivas" },
      { hand: "Trinca", payout: 3, description: "3 cartas iguais" },
      { hand: "Dois Pares", payout: 2, description: "2 pares diferentes" },
      { hand: "Jacks or Better", payout: 1, description: "Par de J, Q, K ou A" },
    ],
  },
  {
    id: "3",
    name: "Conservador - Baixo Risco",
    active: false,
    isDefault: false,
    createdAt: "2024-02-01",
    entries: [
      { hand: "Royal Flush", payout: 500, description: "A-K-Q-J-10 do mesmo naipe" },
      { hand: "Straight Flush", payout: 40, description: "5 cartas consecutivas do mesmo naipe" },
      { hand: "Quadra", payout: 20, description: "4 cartas iguais" },
      { hand: "Full House", payout: 8, description: "Trinca + Par" },
      { hand: "Flush", payout: 5, description: "5 cartas do mesmo naipe" },
      { hand: "Straight", payout: 4, description: "5 cartas consecutivas" },
      { hand: "Trinca", payout: 3, description: "3 cartas iguais" },
      { hand: "Dois Pares", payout: 2, description: "2 pares diferentes" },
      { hand: "Jacks or Better", payout: 1, description: "Par de J, Q, K ou A" },
    ],
  },
];

const PayTables = () => {
  const [payTables, setPayTables] = useState<PayTable[]>(initialPayTables);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<PayTable | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    entries: defaultHands.map(h => ({ hand: h.hand, payout: h.defaultPayout, description: h.description })),
  });
  const { toast } = useToast();

  const handleOpenCreate = () => {
    setEditingTable(null);
    setFormData({
      name: "",
      entries: defaultHands.map(h => ({ hand: h.hand, payout: h.defaultPayout, description: h.description })),
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (table: PayTable) => {
    setEditingTable(table);
    setFormData({
      name: table.name,
      entries: [...table.entries],
    });
    setIsDialogOpen(true);
  };

  const handleDuplicate = (table: PayTable) => {
    const newTable: PayTable = {
      id: Date.now().toString(),
      name: `${table.name} (Cópia)`,
      active: false,
      isDefault: false,
      createdAt: new Date().toISOString().split("T")[0],
      entries: [...table.entries],
    };
    setPayTables([...payTables, newTable]);
    toast({
      title: "Tabela duplicada",
      description: "A tabela foi duplicada com sucesso.",
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da tabela é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (editingTable) {
      setPayTables(payTables.map(t => 
        t.id === editingTable.id 
          ? { ...t, name: formData.name, entries: formData.entries }
          : t
      ));
      toast({
        title: "Tabela atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      const newTable: PayTable = {
        id: Date.now().toString(),
        name: formData.name,
        active: true,
        isDefault: false,
        createdAt: new Date().toISOString().split("T")[0],
        entries: formData.entries,
      };
      setPayTables([...payTables, newTable]);
      toast({
        title: "Tabela criada",
        description: "A nova tabela de pagamento foi criada.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setPayTables(payTables.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    ));
  };

  const handleSetDefault = (id: string) => {
    setPayTables(payTables.map(t => ({
      ...t,
      isDefault: t.id === id,
      active: t.id === id ? true : t.active,
    })));
    toast({
      title: "Tabela padrão definida",
      description: "Esta tabela será usada como padrão para novos jogadores.",
    });
  };

  const handleDelete = (id: string) => {
    const table = payTables.find(t => t.id === id);
    if (table?.isDefault) {
      toast({
        title: "Erro",
        description: "Não é possível excluir a tabela padrão.",
        variant: "destructive",
      });
      return;
    }
    setPayTables(payTables.filter(t => t.id !== id));
    toast({
      title: "Tabela excluída",
      description: "A tabela foi removida com sucesso.",
    });
  };

  const handlePayoutChange = (index: number, value: string) => {
    const payout = parseInt(value) || 0;
    setFormData({
      ...formData,
      entries: formData.entries.map((e, i) => i === index ? { ...e, payout } : e),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Tabelas de Pagamento</h1>
          <p className="text-muted-foreground">Gerencie os multiplicadores do Video Poker</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Tabela
        </Button>
      </div>

      {/* Pay Tables Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {payTables.map((table) => (
          <Card key={table.id} className={table.isDefault ? "ring-2 ring-primary" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {table.name}
                    {table.isDefault && (
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    )}
                  </CardTitle>
                  <CardDescription>Criada em {table.createdAt}</CardDescription>
                </div>
                <Badge variant={table.active ? "default" : "secondary"}>
                  {table.active ? "Ativa" : "Inativa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mini Pay Table Preview */}
              <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                {table.entries.slice(0, 4).map((entry) => (
                  <div key={entry.hand} className="flex justify-between">
                    <span className="text-muted-foreground">{entry.hand}</span>
                    <span className="font-mono font-bold text-primary">{entry.payout}x</span>
                  </div>
                ))}
                <div className="text-muted-foreground text-xs text-center pt-1">
                  ... e mais {table.entries.length - 4} mãos
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={table.active}
                    onCheckedChange={() => handleToggleActive(table.id)}
                    disabled={table.isDefault}
                  />
                  <span className="text-sm text-muted-foreground">
                    {table.active ? "Ativa" : "Inativa"}
                  </span>
                </div>
                <div className="flex gap-1">
                  {!table.isDefault && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSetDefault(table.id)}
                      title="Definir como padrão"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicate(table)}
                    title="Duplicar"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEdit(table)}
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {!table.isDefault && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(table.id)}
                      className="text-destructive hover:text-destructive"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTable ? "Editar Tabela de Pagamento" : "Nova Tabela de Pagamento"}
            </DialogTitle>
            <DialogDescription>
              Configure os multiplicadores para cada mão do Video Poker
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Tabela</Label>
              <Input
                id="name"
                placeholder="Ex: Premium - Alto Risco"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Multiplicadores (x)</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mão</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="w-24 text-right">Payout (x)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.entries.map((entry, index) => (
                    <TableRow key={entry.hand}>
                      <TableCell className="font-medium">{entry.hand}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {entry.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="0"
                          className="w-20 text-right ml-auto"
                          value={entry.payout}
                          onChange={(e) => handlePayoutChange(index, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editingTable ? "Salvar Alterações" : "Criar Tabela"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayTables;
