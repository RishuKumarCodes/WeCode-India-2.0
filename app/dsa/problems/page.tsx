// app/dsa/problems/page.tsx
"use client";

import * as React from "react";
import { DSAStreakBadges } from "../../../components/dsa/DSAStreakBadges";
import { AnalyticsHeader } from "../../../components/dsa/problems/AnalyticsHeader";
import { dsaQuestions } from "../../../data/dsa-questions";
import SearchAndFilters from "@/components/dsa/problems/SearchAndFilters";
import ProblemsRows from "@/components/dsa/problems/ProblemsRows";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ActivityCard } from "@/components/dsa/problems/ActivityCard";
import { ContributionCalendar } from "@/components/dsa/problems/ContributionCalendar";

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

const getDifficultyBadge = (difficulty: string) => {
  const base = "rounded-full px-3 py-1 text-xs font-medium";
  switch (difficulty) {
    case "Easy":
      return `${base} bg-green-100 text-green-800`;
    case "Medium":
      return `${base} bg-yellow-100 text-yellow-800`;
    case "Hard":
      return `${base} bg-red-100 text-red-800`;
    default:
      return `${base} bg-gray-100 text-gray-800`;
  }
};

export default function Page() {
  const [streak, setStreak] = React.useState(useStreakFromStorage());
  const [searchTerm, setSearchTerm] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState("all");
  const [domainFilter, setDomainFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [solvedProblems, setSolvedProblems] = React.useState<Set<number>>(
    new Set()
  );

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("dsa-solved");
      const parsed = JSON.parse(raw || "[]");
      const ids = Array.isArray(parsed) ? parsed.map((x) => Number(x)) : [];
      setSolvedProblems(new Set(ids));
    } catch {
      setSolvedProblems(new Set());
    }
  }, []);

  const filteredQuestions = dsaQuestions.filter((q) => {
    const matchesSearch = q.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || q.difficulty === difficultyFilter;
    const matchesDomain = domainFilter === "all" || q.domain === domainFilter;
    const isSolved = solvedProblems.has(q.id);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "solved" && isSolved) ||
      (statusFilter === "unsolved" && !isSolved);

    return matchesSearch && matchesDifficulty && matchesDomain && matchesStatus;
  });

  React.useEffect(() => {
    const tick = () => setStreak(useStreakFromStorage());
    const interval = setInterval(tick, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <TooltipProvider>
        <div className="flex gap-4">
          <ActivityCard />
          <ContributionCalendar />
        </div>
      </TooltipProvider>

      <SearchAndFilters
        setSearchTerm={setSearchTerm}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        domainFilter={domainFilter}
        setDomainFilter={setDomainFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
      />

      <ProblemsRows
        filteredQuestions={filteredQuestions}
        getDifficultyBadge={getDifficultyBadge}
        solvedProblems={solvedProblems}
        setSolvedProblems={setSolvedProblems}
      />

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredQuestions.length} of {dsaQuestions.length} problems
      </div>
    </div>
  );
}
