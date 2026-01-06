import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
import { Plus, Trash2, Edit, Shield, ShieldCheck, ShieldAlert } from "lucide-react";

const adminUsers = [
  { id: 1, name: "Admin Master", email: "admin@bingomax.com", role: "super_admin", lastLogin: "06/01/2024 14:30", status: "active" },
  { id: 2, name: "Carlos Gerente", email: "carlos@bingomax.com", role: "manager", lastLogin: "06/01/2024 12:15", status: "active" },
  { id: 3, name: "Ana Financeiro", email: "ana@bingomax.com", role: "finance", lastLogin: "05/01/2024 18:45", status: "active" },
  { id: 4, name: "Pedro Suporte", email: "pedro@bingomax.com", role: "support", lastLogin: "06/01/2024 10:00", status: "inactive" },
];

const roleLabels: Record<string, { label: string; icon: typeof Shield; color: string }> = {
  super_admin: { label: "Super Admin", icon: ShieldAlert, color: "text-bingo-red" },
  manager: { label: "Gerente", icon: ShieldCheck, color: "text-bingo-purple" },
  finance: { label: "Financeiro", icon: Shield, color: "text-bingo-green" },
  support: { label: "Suporte", icon: Shield, color: "text-bingo-blue" },
};

const AdminUsers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Usuários Admin</h1>
          <p className="text-muted-foreground">Gerencie os administradores do sistema</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Administrador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Administrador</DialogTitle>
              <DialogDescription>
                Adicione um novo usuário com acesso ao painel administrativo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Nome do administrador" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="finance">Financeiro</SelectItem>
                    <SelectItem value="support">Suporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Criar Administrador</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Administrador</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Último Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((user) => {
              const roleInfo = roleLabels[user.role];
              const RoleIcon = roleInfo.icon;
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-2 ${roleInfo.color}`}>
                      <RoleIcon className="w-4 h-4" />
                      <span className="font-medium">{roleInfo.label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    {user.status === 'active' ? (
                      <Badge className="bg-bingo-green/20 text-bingo-green">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Editar">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.role !== 'super_admin' && (
                        <Button variant="ghost" size="icon" className="text-destructive" title="Remover">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminUsers;
