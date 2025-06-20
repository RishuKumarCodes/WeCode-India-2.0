
"use client";
import { Flame, Calendar, Trophy } from "lucide-react";

interface DSAStreakBadgesProps {
  solvedToday: number;
  dailyStreak: number;
  weeklyStreak: number;
}

export function DSAStreakBadges({ solvedToday, dailyStreak, weeklyStreak }: DSAStreakBadgesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Flame className="text-orange-600" size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{solvedToday}</div>
          <div className="text-sm text-gray-600">Problems Today</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Calendar className="text-blue-600" size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{dailyStreak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Trophy className="text-green-600" size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{weeklyStreak}</div>
          <div className="text-sm text-gray-600">Weekly Active Days</div>
        </div>
      </div>
    </div>
  );
}
    