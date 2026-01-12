import { Users, Clock, Trophy, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface GameRoomCardProps {
  id: number;
  name: string;
  prize: string;
  players: number;
  startsIn: number;
  type: 'classic' | 'turbo' | 'jackpot' | 'poker';
  cardPrice: string;
  totalNumbers?: number;
}

const formatTimeExtended = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (days > 0) {
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  if (hours > 0) {
    return `${hours}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
};

// Decorative bingo ball component
const BingoBall = ({ 
  number, 
  color, 
  size = 'sm', 
  className = '' 
}: { 
  number?: number; 
  color: string; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-[8px]',
    md: 'w-8 h-8 text-[10px]',
    lg: 'w-10 h-10 text-xs'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white shadow-lg ${className}`}
      style={{ 
        background: `radial-gradient(circle at 30% 30%, ${color}, ${color}dd 50%, ${color}99)`,
        boxShadow: `0 2px 8px ${color}66`
      }}
    >
      {number && <span>{number}</span>}
    </div>
  );
};

// Central badge with game numbers
const CenterBadge = ({ number }: { number: number }) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 p-1 shadow-xl">
        {/* Inner ring */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-100 to-amber-200 p-1">
          {/* Center */}
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{number}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Sparkle/confetti decoration
const Sparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-3 bg-white/40 rounded-full transform rotate-45"
        style={{
          left: `${15 + (i * 7)}%`,
          top: `${20 + Math.sin(i) * 30}%`,
          transform: `rotate(${45 + i * 15}deg)`,
          opacity: 0.3 + Math.random() * 0.4
        }}
      />
    ))}
  </div>
);

const typeConfig = {
  classic: {
    gradient: 'from-fuchsia-500 via-pink-500 to-purple-600',
    accentColor: '#d946ef',
    ballColors: ['#22c55e', '#3b82f6', '#ef4444', '#8b5cf6', '#f97316']
  },
  turbo: {
    gradient: 'from-orange-400 via-amber-500 to-yellow-500',
    accentColor: '#f59e0b',
    ballColors: ['#22c55e', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899']
  },
  jackpot: {
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-600',
    accentColor: '#8b5cf6',
    ballColors: ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b', '#ec4899']
  },
  poker: {
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    accentColor: '#14b8a6',
    ballColors: ['#ef4444', '#1e1e1e', '#ef4444', '#1e1e1e', '#ef4444']
  }
};

const GameRoomCard = ({ 
  id, 
  name, 
  prize, 
  players, 
  startsIn, 
  type, 
  cardPrice,
  totalNumbers = 90 
}: GameRoomCardProps) => {
  const [timeLeft, setTimeLeft] = useState(startsIn);
  const config = typeConfig[type];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : startsIn));
    }, 1000);
    return () => clearInterval(timer);
  }, [startsIn]);

  const getGameLink = () => {
    switch (type) {
      case 'turbo': return '/jogo/turbo';
      case 'jackpot': return '/jogo/jackpot';
      case 'poker': return '/video-poker';
      default: return '/jogo';
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Gradient background */}
      <div className={`relative h-40 bg-gradient-to-br ${config.gradient} overflow-hidden`}>
        {/* Diagonal lines pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              135deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.1) 20px,
              rgba(255,255,255,0.1) 40px
            )`
          }}
        />
        
        {/* Sparkles */}
        <Sparkles />
        
        {/* Decorative balls */}
        <BingoBall 
          number={7} 
          color={config.ballColors[0]} 
          size="md" 
          className="absolute top-3 left-3" 
        />
        <BingoBall 
          number={14} 
          color={config.ballColors[1]} 
          size="sm" 
          className="absolute top-6 right-8" 
        />
        <BingoBall 
          number={21} 
          color={config.ballColors[2]} 
          size="md" 
          className="absolute bottom-8 left-6" 
        />
        <BingoBall 
          number={35} 
          color={config.ballColors[3]} 
          size="sm" 
          className="absolute bottom-4 right-4" 
        />
        <BingoBall 
          number={42} 
          color={config.ballColors[4]} 
          size="sm" 
          className="absolute top-12 left-1/4" 
        />

        {/* Corner badge */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-xs font-bold text-white">{type === 'poker' ? '♠' : '6'}</span>
        </div>

        {/* Center badge */}
        <CenterBadge number={totalNumbers} />
      </div>

      {/* Info section */}
      <div className="bg-card p-4 space-y-2">
        {/* Game name */}
        <h3 className="font-display font-bold text-foreground text-lg truncate">
          {name}
        </h3>
        
        {/* Time remaining */}
        <p className="text-sm" style={{ color: config.accentColor }}>
          {type === 'poker' ? 'Jogue Agora' : formatTimeExtended(timeLeft)}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            <span className="font-semibold text-foreground">{prize}</span>
          </div>
          <div className="flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>{cardPrice}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{players}</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <Link to={getGameLink()} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 flex items-center justify-center">
        <Button variant="hero" size="lg">
          {type === 'poker' ? 'Jogar' : 'Entrar na Sala'}
        </Button>
      </Link>
    </div>
  );
};

export default GameRoomCard;
