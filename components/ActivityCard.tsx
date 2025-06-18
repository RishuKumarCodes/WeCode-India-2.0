"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Dummy totals (should be equal to sum in your real data)
const TOTALS = { Easy: 209, Medium: 651, Hard: 366 };
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getRecentActivity() {
  const today = new Date();
  const arr = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const iso = date.toISOString().slice(0, 10);
    arr.push({
      date: iso,
      label: DAYS[(date.getDay() + 6) % 7],
      solved: Math.random() > 0.5 ? Math.floor(Math.random() * 4) : 0,
    });
  }
  return arr;
}

function getSolvedTotals() {
  return {
    Easy: 39,
    Medium: 143,
    Hard: 21,
  };
}

export function ActivityCard() {
  const activity = React.useMemo(getRecentActivity, []);
  const solvedTotals = React.useMemo(getSolvedTotals, []);
  const progressCount =
    solvedTotals.Easy + solvedTotals.Medium + solvedTotals.Hard;
  const progressTotal = TOTALS.Easy + TOTALS.Medium + TOTALS.Hard;
  const progressPercent =
    progressTotal === 0
      ? 0
      : Math.round((progressCount / progressTotal) * 100);

  return (
    <TooltipProvider>
      <div className="bg-muted rounded-xl shadow-sm p-6 flex flex-col min-h-[240px]">
        <h2 className="font-semibold text-lg mb-4 text-foreground">Activity</h2>

        {/* 7-day tracker */}
        <div className="flex items-center gap-2 mb-6">
          {activity.map((day) => (
            <Tooltip key={day.date}>
              <TooltipTrigger asChild>
                <div
                  className={`
                    w-8 h-8 flex flex-col items-center justify-center rounded-lg 
                    ${
                      day.solved > 0
                        ? "bg-green-500/80 text-white font-bold"
                        : "bg-muted-foreground/10 text-muted-foreground"
                    }
                    border border-border shadow-sm transition
                  `}
                >
                  <span className="text-xs font-semibold">{day.label}</span>
                  <span className="text-xs">
                    {day.solved > 0 ? day.solved : ""}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  {day.date} <br />
                  {day.solved > 0
                    ? `${day.solved} solved`
                    : "No problems solved"}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">
            {progressCount} / {progressTotal}
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="rounded-full h-4 bg-secondary"
        />

        {/* Difficulty Breakdown */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <Badge className="bg-green-100 text-green-800 rounded-xl px-3 text-sm">
            Easy:{" "}
            <span className="ml-1 font-semibold">
              {solvedTotals.Easy}
            </span>{" "}
            / {TOTALS.Easy}
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 rounded-xl px-3 text-sm">
            Medium:{" "}
            <span className="ml-1 font-semibold">
              {solvedTotals.Medium}
            </span>{" "}
            / {TOTALS.Medium}
          </Badge>
          <Badge className="bg-red-100 text-red-700 rounded-xl px-3 text-sm">
            Hard:{" "}
            <span className="ml-1 font-semibold">
              {solvedTotals.Hard}
            </span>{" "}
            / {TOTALS.Hard}
          </Badge>
        </div>
      </div>
    </TooltipProvider>
  );
}
