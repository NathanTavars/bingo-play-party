import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ArrowLeftRight,
  UserCog,
  CreditCard,
  Settings,
  Gamepad2,
  LogOut,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Clientes", url: "/admin/clientes", icon: Users },
  { title: "Relatórios", url: "/admin/relatorios", icon: FileText },
  { title: "Transações", url: "/admin/transacoes", icon: ArrowLeftRight },
  { title: "Usuários Admin", url: "/admin/usuarios", icon: UserCog },
  { title: "Gateways", url: "/admin/gateways", icon: CreditCard },
  { title: "Rodadas", url: "/admin/rodadas", icon: Gamepad2 },
  { title: "Tabelas Video Poker", url: "/admin/tabelas-pagamento", icon: Gamepad2 },
  { title: "Configurações", url: "/admin/configuracoes", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="font-display text-xl font-bold text-primary-foreground">B</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-display font-bold text-lg">BingoMax</h2>
              <p className="text-xs text-muted-foreground">Painel Admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url || 
                  (item.url !== '/admin' && location.pathname.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border space-y-2">
        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <NavLink to="/">
            <Home className="w-4 h-4" />
            {!collapsed && <span>Voltar ao Site</span>}
          </NavLink>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
