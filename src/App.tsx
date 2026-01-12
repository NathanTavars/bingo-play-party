import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import BingoGame from "./pages/BingoGame";
import BingoTurbo from "./pages/BingoTurbo";
import BingoJackpot from "./pages/BingoJackpot";
import VideoPoker from "./pages/VideoPoker";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Clients from "./pages/admin/Clients";
import Reports from "./pages/admin/Reports";
import Transactions from "./pages/admin/Transactions";
import AdminUsers from "./pages/admin/AdminUsers";
import Gateways from "./pages/admin/Gateways";
import Settings from "./pages/admin/Settings";
import Rounds from "./pages/admin/Rounds";
import LiveRounds from "./pages/admin/LiveRounds";
import PayTables from "./pages/admin/PayTables";
import VideoPokerSettings from "./pages/admin/VideoPokerSettings";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/jogo" element={<BingoGame />} />
          <Route path="/jogo/turbo" element={<BingoTurbo />} />
          <Route path="/jogo/jackpot" element={<BingoJackpot />} />
          <Route path="/video-poker" element={<VideoPoker />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="ao-vivo" element={<LiveRounds />} />
            <Route path="clientes" element={<Clients />} />
            <Route path="relatorios" element={<Reports />} />
            <Route path="transacoes" element={<Transactions />} />
            <Route path="usuarios" element={<AdminUsers />} />
            <Route path="gateways" element={<Gateways />} />
            <Route path="configuracoes" element={<Settings />} />
            <Route path="rodadas" element={<Rounds />} />
            <Route path="tabelas-pagamento" element={<PayTables />} />
            <Route path="video-poker" element={<VideoPokerSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
