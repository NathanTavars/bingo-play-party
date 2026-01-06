import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Configurações</h1>
        <p className="text-muted-foreground">Personalize o sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-lg">
          <TabsTrigger value="general" className="gap-2">
            <Globe className="w-4 h-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-display font-bold">Configurações Gerais</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nome da Plataforma</Label>
                <Input defaultValue="BingoMax" />
              </div>
              <div className="space-y-2">
                <Label>URL do Site</Label>
                <Input defaultValue="https://bingomax.com" />
              </div>
              <div className="space-y-2">
                <Label>Email de Suporte</Label>
                <Input defaultValue="suporte@bingomax.com" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input defaultValue="+55 11 99999-9999" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição do Site</Label>
              <Textarea 
                defaultValue="A maior plataforma de bingo online do Brasil. Jogue, ganhe e divirta-se!"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Modo de Manutenção</Label>
                <p className="text-sm text-muted-foreground">Desativa o acesso ao site para usuários</p>
              </div>
              <Switch />
            </div>

            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-display font-bold">Notificações</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <Label>Notificar novos depósitos</Label>
                  <p className="text-sm text-muted-foreground">Receba alertas quando houver novos depósitos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <Label>Notificar pedidos de saque</Label>
                  <p className="text-sm text-muted-foreground">Alertas para novos pedidos de saque</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <Label>Notificar novos cadastros</Label>
                  <p className="text-sm text-muted-foreground">Alertas quando novos usuários se cadastram</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Relatórios diários</Label>
                  <p className="text-sm text-muted-foreground">Receba um resumo diário por email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-display font-bold">Segurança</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <Label>Autenticação em 2 fatores</Label>
                  <p className="text-sm text-muted-foreground">Exigir 2FA para todos os admins</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <Label>Verificação de email</Label>
                  <p className="text-sm text-muted-foreground">Exigir verificação de email para novos usuários</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <Label>Bloqueio por tentativas</Label>
                  <p className="text-sm text-muted-foreground">Bloquear após 5 tentativas de login falhas</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Label>IPs Permitidos (Whitelist)</Label>
              <Textarea 
                placeholder="Um IP por linha..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Deixe vazio para permitir todos os IPs</p>
            </div>

            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-display font-bold">Aparência</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Cor Primária</Label>
                <div className="flex gap-2">
                  <Input defaultValue="#FFD700" className="flex-1" />
                  <div className="w-10 h-10 rounded-lg bg-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input defaultValue="#1a1a2e" className="flex-1" />
                  <div className="w-10 h-10 rounded-lg bg-background border" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input defaultValue="/logo.png" />
            </div>

            <div className="space-y-2">
              <Label>Favicon URL</Label>
              <Input defaultValue="/favicon.ico" />
            </div>

            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
