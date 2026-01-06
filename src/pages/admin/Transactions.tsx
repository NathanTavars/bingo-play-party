import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Check, X, Eye, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const deposits = [
  { id: 1, user: "João Silva", amount: "R$ 100,00", method: "PIX", status: "approved", date: "06/01/2024 14:32" },
  { id: 2, user: "Maria Santos", amount: "R$ 250,00", method: "PIX", status: "pending", date: "06/01/2024 14:28" },
  { id: 3, user: "Pedro Costa", amount: "R$ 50,00", method: "Cartão", status: "approved", date: "06/01/2024 14:15" },
  { id: 4, user: "Ana Oliveira", amount: "R$ 500,00", method: "PIX", status: "approved", date: "06/01/2024 13:55" },
  { id: 5, user: "Carlos Lima", amount: "R$ 200,00", method: "PIX", status: "pending", date: "06/01/2024 13:42" },
];

const withdrawals = [
  { id: 1, user: "Maria Santos", amount: "R$ 250,00", pixKey: "***.456.789-**", status: "pending", date: "06/01/2024 14:30" },
  { id: 2, user: "Ana Oliveira", amount: "R$ 500,00", pixKey: "***.123.456-**", status: "approved", date: "06/01/2024 14:00" },
  { id: 3, user: "Carlos Lima", amount: "R$ 1.000,00", pixKey: "***.789.012-**", status: "pending", date: "06/01/2024 13:45" },
  { id: 4, user: "João Silva", amount: "R$ 150,00", pixKey: "***.234.567-**", status: "rejected", date: "06/01/2024 12:30" },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-bingo-green/20 text-bingo-green">Aprovado</Badge>;
      case 'pending':
        return <Badge className="bg-primary/20 text-primary">Pendente</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Transações</h1>
        <p className="text-muted-foreground">Gerencie depósitos e saques</p>
      </div>

      <Tabs defaultValue="deposits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deposits" className="gap-2">
            <ArrowDownCircle className="w-4 h-4" />
            Depósitos
          </TabsTrigger>
          <TabsTrigger value="withdrawals" className="gap-2">
            <ArrowUpCircle className="w-4 h-4" />
            Saques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposits">
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por usuário..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-mono">#{deposit.id}</TableCell>
                    <TableCell className="font-medium">{deposit.user}</TableCell>
                    <TableCell className="text-bingo-green font-semibold">{deposit.amount}</TableCell>
                    <TableCell>{deposit.method}</TableCell>
                    <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{deposit.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="Ver detalhes">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {deposit.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="text-bingo-green" title="Aprovar">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive" title="Rejeitar">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals">
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por usuário..." 
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Chave PIX</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-mono">#{withdrawal.id}</TableCell>
                    <TableCell className="font-medium">{withdrawal.user}</TableCell>
                    <TableCell className="text-bingo-red font-semibold">{withdrawal.amount}</TableCell>
                    <TableCell className="font-mono text-sm">{withdrawal.pixKey}</TableCell>
                    <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{withdrawal.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="Ver detalhes">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {withdrawal.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="text-bingo-green" title="Aprovar">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive" title="Rejeitar">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
