import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, CreditCard, Smartphone, Building2, Check, X } from "lucide-react";

const gateways = [
  { 
    id: 1, 
    name: "PIX Automático", 
    provider: "MercadoPago", 
    icon: Smartphone,
    status: "active", 
    deposits: true, 
    withdrawals: true,
    fee: "0.99%",
    minDeposit: "R$ 10,00",
    maxDeposit: "R$ 10.000,00"
  },
  { 
    id: 2, 
    name: "Cartão de Crédito", 
    provider: "Stripe", 
    icon: CreditCard,
    status: "active", 
    deposits: true, 
    withdrawals: false,
    fee: "2.99%",
    minDeposit: "R$ 20,00",
    maxDeposit: "R$ 5.000,00"
  },
  { 
    id: 3, 
    name: "Transferência Bancária", 
    provider: "Manual", 
    icon: Building2,
    status: "inactive", 
    deposits: true, 
    withdrawals: true,
    fee: "0%",
    minDeposit: "R$ 100,00",
    maxDeposit: "R$ 50.000,00"
  },
];

const Gateways = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Gateways de Pagamento</h1>
          <p className="text-muted-foreground">Configure os métodos de pagamento</p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Adicionar Gateway
        </Button>
      </div>

      <div className="grid gap-6">
        {gateways.map((gateway) => {
          const GatewayIcon = gateway.icon;
          return (
            <Card key={gateway.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    gateway.status === 'active' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <GatewayIcon className={`w-7 h-7 ${gateway.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-display font-bold">{gateway.name}</h3>
                      {gateway.status === 'active' ? (
                        <Badge className="bg-bingo-green/20 text-bingo-green">Ativo</Badge>
                      ) : (
                        <Badge variant="secondary">Inativo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Provedor: {gateway.provider}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Taxa</p>
                    <p className="font-semibold">{gateway.fee}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Depósito Mín.</p>
                    <p className="font-semibold">{gateway.minDeposit}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Depósito Máx.</p>
                    <p className="font-semibold">{gateway.maxDeposit}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Funcionalidades</p>
                    <div className="flex justify-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${gateway.deposits ? 'bg-bingo-green/20 text-bingo-green' : 'bg-muted text-muted-foreground'}`}>
                        Depósito
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${gateway.withdrawals ? 'bg-bingo-blue/20 text-bingo-blue' : 'bg-muted text-muted-foreground'}`}>
                        Saque
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={gateway.status === 'active'} />
                    <span className="text-sm">Ativo</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Configurar {gateway.name}</DialogTitle>
                        <DialogDescription>
                          Ajuste as configurações do gateway de pagamento.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Depósito Mínimo</Label>
                            <Input defaultValue={gateway.minDeposit} />
                          </div>
                          <div className="space-y-2">
                            <Label>Depósito Máximo</Label>
                            <Input defaultValue={gateway.maxDeposit} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Taxa (%)</Label>
                          <Input defaultValue={gateway.fee.replace('%', '')} />
                        </div>
                        <div className="space-y-2">
                          <Label>API Key</Label>
                          <Input type="password" placeholder="••••••••••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label>Webhook URL</Label>
                          <Input defaultValue="https://api.bingomax.com/webhooks/payment" disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked={gateway.deposits} />
                            <Label>Habilitar Depósitos</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked={gateway.withdrawals} />
                            <Label>Habilitar Saques</Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Salvar Configurações</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Gateways;
