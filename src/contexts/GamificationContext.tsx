import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
}

interface RankingUser {
  id: string;
  name: string;
  points: number;
  streak: number;
}

interface GamificationContextType {
  points: number;
  addPoints: (amount: number) => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  ranking: RankingUser[];
  streak: number;
  incrementStreak: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Primeira Semana',
    description: 'Complete 7 dias consecutivos de medições',
    icon: '🌟',
    points: 100,
    unlocked: false,
  },
  {
    id: '2',
    name: 'Aderência 90%',
    description: 'Mantenha 90% de aderência por 30 dias',
    icon: '🎯',
    points: 200,
    unlocked: false,
  },
  {
    id: '3',
    name: '30 Dias Consecutivos',
    description: 'Complete um mês inteiro de medições',
    icon: '🏆',
    points: 500,
    unlocked: false,
  },
];

const defaultRanking: RankingUser[] = [
  { id: '1', name: 'Maria Silva', points: 850, streak: 12 },
  { id: '2', name: 'João Santos', points: 720, streak: 8 },
  { id: '3', name: 'Ana Oliveira', points: 650, streak: 6 },
  { id: '4', name: 'Pedro Costa', points: 580, streak: 5 },
  { id: '5', name: 'Lucia Ferreira', points: 450, streak: 4 },
];

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('gamification_points');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : defaultAchievements;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [ranking] = useState(defaultRanking);

  useEffect(() => {
    localStorage.setItem('gamification_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
    toast.success(`+${amount} pontos!`);
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === id && !achievement.unlocked
          ? {
              ...achievement,
              unlocked: true,
            }
          : achievement
      )
    );

    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      toast.success(`🎉 Conquista desbloqueada: ${achievement.name}`);
      addPoints(achievement.points);
    }
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
    if (streak + 1 === 7) {
      unlockAchievement('1');
    }
    if (streak + 1 === 30) {
      unlockAchievement('3');
    }
  };

  return (
    <GamificationContext.Provider
      value={{
        points,
        addPoints,
        achievements,
        unlockAchievement,
        ranking,
        streak,
        incrementStreak,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};