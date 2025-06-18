"use client";
import * as React from "react";
import { DSAStreakBadges } from "../DSAStreakBadges";
import { AnalyticsHeader } from "../AnalyticsHeader";
import { CheckCircle, ChevronRight, CircleEllipsis } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { dsaQuestions, DsaQuestion } from "../../../data/dsa-questions";

function useStreakFromStorage() {
  if (typeof window === "undefined")
    return { solvedToday: 0, dailyStreak: 0, weeklyStreak: 0 };
  try {
    const history = JSON.parse(localStorage.getItem("dsa-history") || "[]");
    const today = new Date().toISOString().slice(0, 10);
    let solvedToday = 0,
      dailyStreak = 0,
      weeklyStreak = 0;
    const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
    let cont = true,
      day = new Date(today);
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
      const dayStr = new Date(now.getTime() - i * 86400000)
        .toISOString()
        .slice(0, 10);
      const entry = history.find((h: any) => h.date === dayStr);
      weeklyStreak += entry?.count ? 1 : 0;
    }
    return { solvedToday, dailyStreak, weeklyStreak };
  } catch {
    return { solvedToday: 0, dailyStreak: 0, weeklyStreak: 0 };
  }
}

// Helper function to get difficulty badge styling
const getDifficultyBadge = (difficulty: string) => {
  const baseClasses = "rounded-full px-2 py-1 text-xs font-medium";
  
  switch (difficulty) {
    case "Easy":
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500`;
    case "Medium":
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500`;
    case "Hard":
      return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500`;
  }
};

// Helper function to convert title to URL slug
const titleToSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const ProblemsSection = () => {
  const [streak, setStreak] = React.useState(useStreakFromStorage());
  
  // Get a subset of questions to display (first 5 for preview)
  const displayQuestions = dsaQuestions.slice(0, 5);

  React.useEffect(() => {
    const tick = () => setStreak(useStreakFromStorage());
    window.addEventListener("storage", tick);
    const poll = setInterval(tick, 2000);
    return () => {
      window.removeEventListener("storage", tick);
      clearInterval(poll);
    };
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <header className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight">
              DSA Practice
            </h1>
            <p className="text-muted-foreground text-base font-normal max-w-2xl">
              Practice DSA questions by topic and difficulty. Filter, bookmark,
              and keep your solving streak going!
            </p>
          </div>
        </header>
        <AnalyticsHeader />
        <DSAStreakBadges
          solvedToday={streak.solvedToday}
          dailyStreak={streak.dailyStreak}
          weeklyStreak={streak.weeklyStreak}
        />
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="flex flex-col">
          <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
            <div className="col-span-6">Problem</div>
            <div className="col-span-2 text-center">Difficulty</div>
            <div className="col-span-2 text-center">Category</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          {displayQuestions.map((question: DsaQuestion) => (
            <div key={question.id} className="grid grid-cols-12 border-b px-4 py-3 hover:bg-muted/50">
              <div className="col-span-6">
                <Link
                  href={`/dsa/problems/${titleToSlug(question.title)}`}
                  className="font-medium hover:text-primary"
                >
                  {question.title}
                </Link>
              </div>
              <div className="col-span-2 text-center">
                <span className={getDifficultyBadge(question.difficulty)}>
                  {question.difficulty}
                </span>
              </div>
              <div className="col-span-2 text-center text-sm">{question.domain}</div>
              <div className="col-span-2 text-center">
                {question.solved ? (
                  <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                ) : (
                  <CircleEllipsis className="mx-auto h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center p-4">
          <Button variant="outline" asChild>
            <Link href="/dsa/problems">
              View All Problems ({dsaQuestions.length})
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProblemsSection;