import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import HowToPlaySection from "@/components/HowToPlaySection";
import LiveGamesSection from "@/components/LiveGamesSection";
import BingoCardsSection from "@/components/BingoCardsSection";
import PrizesSection from "@/components/PrizesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <HowToPlaySection />
        <LiveGamesSection />
        <BingoCardsSection />
        <PrizesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
