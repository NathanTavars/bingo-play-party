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
import { Search, Filter, MoreHorizontal, Eye, Ban, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  { id: 1, name: "João Silva", email: "joao@email.com", phone: "(11) 99999-1111", balance: "R$ 150,00", totalDeposits: "R$ 1.500,00", status: "active", createdAt: "15/01/2024" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", phone: "(11) 99999-2222", balance: "R$ 320,00", totalDeposits: "R$ 2.800,00", status: "active", createdAt: "10/01/2024" },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", phone: "(11) 99999-3333", balance: "R$ 0,00", totalDeposits: "R$ 500,00", status: "blocked", createdAt: "05/01/2024" },
  { id: 4, name: "Ana Oliveira", email: "ana@email.com", phone: "(11) 99999-4444", balance: "R$ 75,50", totalDeposits: "R$ 950,00", status: "active", createdAt: "20/12/2023" },
  { id: 5, name: "Carlos Lima", email: "carlos@email.com", phone: "(11) 99999-5555", balance: "R$ 1.200,00", totalDeposits: "R$ 5.000,00", status: "vip", createdAt: "01/12/2023" },
  { id: 6, name: "Fernanda Souza", email: "fernanda@email.com", phone: "(11) 99999-6666", balance: "R$ 45,00", totalDeposits: "R$ 300,00", status: "active", createdAt: "25/12/2023" },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-bingo-green/20 text-bingo-green hover:bg-bingo-green/30">Ativo</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Bloqueado</Badge>;
      case 'vip':
        return <Badge className="bg-primary/20 text-primary hover:bg-primary/30">VIP</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Clientes</h1>
        <p className="text-muted-foreground">Gerencie os usuários da plataforma</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome ou email..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Total Depositado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">ID: #{client.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{client.email}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{client.balance}</TableCell>
                  <TableCell className="text-bingo-green">{client.totalDeposits}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{client.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Wallet className="w-4 h-4 mr-2" />
                          Adicionar saldo
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="w-4 h-4 mr-2" />
                          Bloquear
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Clients;
