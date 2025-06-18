"use client";
import * as React from "react";
import { DSAStreakBadges } from "../../components/dsa/DSAStreakBadges";
import { DSAQuestionList } from "../../components/dsa/DSAQuestionList";
import { AnalyticsHeader } from "../../components/dsa/AnalyticsHeader";

function useStreakFromStorage() {
  if (typeof window === "undefined") return { solvedToday: 0, dailyStreak: 0, weeklyStreak: 0 };
  try {
    const history = JSON.parse(localStorage.getItem("dsa-history") || "[]");
    const today = new Date().toISOString().slice(0, 10);
    let solvedToday = 0, dailyStreak = 0, weeklyStreak = 0;
    const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
    let cont = true, day = new Date(today);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].date === today) solvedToday = sorted[i].count;
      if (cont && sorted[i].count > 0) {
        const dayStr = day.toISOString().slice(0, 10);
        if (sorted[i].date === dayStr) {
          dailyStreak += 1;
          day.setDate(day.getDate() - 1);
        } else {
          cont = false;
        }
      }
    }
    const now = new Date(today);
    for (let i = 0; i < 7; i++) {
      const dayStr = new Date(now.getTime() - i * 86400000).toISOString().slice(0, 10);
      const entry = history.find((h: any) => h.date === dayStr);
      weeklyStreak += entry?.count ? 1 : 0;
    }
    return { solvedToday, dailyStreak, weeklyStreak };
  } catch { return { solvedToday: 0, dailyStreak: 0, weeklyStreak: 0 }; }
}

const Index = () => {
  const [streak, setStreak] = React.useState(useStreakFromStorage());
  React.useEffect(() => {
    const tick = () => setStreak(useStreakFromStorage());
    window.addEventListener("storage", tick);
    const poll = setInterval(tick, 2000);
    return () => {
      window.removeEventListener("storage", tick);
      clearInterval(poll);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <header className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight">
              DSA Practice
            </h1>
            <p className="text-muted-foreground text-base font-normal max-w-2xl">
              Practice DSA questions by topic and difficulty. Filter, bookmark, and keep your solving streak going!
            </p>
          </div>
        </header>
        {/* Analytics dashboard section */}
        <AnalyticsHeader />
        {/* Streak badge card */}
        <DSAStreakBadges
          solvedToday={streak.solvedToday}
          dailyStreak={streak.dailyStreak}
          weeklyStreak={streak.weeklyStreak}
        />
        <DSAQuestionList />
      </div>
    </main>
  );
};

export default Index;
