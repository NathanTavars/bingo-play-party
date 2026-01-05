import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveGamesSection from "@/components/LiveGamesSection";
import BingoCardsSection from "@/components/BingoCardsSection";
import PrizesSection from "@/components/PrizesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LiveGamesSection />
        <BingoCardsSection />
        <PrizesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
