
import * as React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// ==== MOCK DATA ====
// For demo: Generates an activityData array with random easy/medium/hard for the past 365 days
function generateMockActivityData() {
  const arr = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (364 - i));
    const iso = d.toISOString().slice(0, 10);
    // Randomize some activity (denser at end for demo current streak)
    let easy = 0, medium = 0, hard = 0;
    if ((i > 300 && i % 6 !== 0) || (i > 355 && Math.random() > 0.2)) {
      easy = Math.floor(Math.random() * 3); // 0-2
      medium = Math.random() > 0.8 ? 1 : 0;
      hard = Math.random() > 0.95 ? 1 : 0;
    }
    arr.push({ date: iso, easy, medium, hard });
  }
  return arr;
}
const activityData = generateMockActivityData();
// ===================

// ---- Utility: sum for a cell
function sumSolved(cell: { easy: number; medium: number; hard: number }) {
  return cell.easy + cell.medium + cell.hard;
}

// ---- Utility: Color mapping
function getCellColor(total: number) {
  if (total === 0) return "bg-muted";
  if (total <= 2) return "bg-green-200";
  if (total <= 4) return "bg-green-400";
  return "bg-green-700";
}

// ---- Utility: Format date
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// ---- Streak computation (returns {current, max})
function computeStreaks(data: typeof activityData) {
  let current = 0, max = 0, cur = 0;
  // Most recent last in data
  for (let i = data.length - 1; i >= 0; i--) {
    const total = sumSolved(data[i]);
    if (total > 0) {
      cur += 1;
    } else {
      if (i === data.length - 1) cur = 0; // streak ends today
      if (cur > max) max = cur;
      cur = 0;
    }
    if (i === 0 && cur > max) max = cur; // edge: streak ends on day 0
  }
  // Compute current streak
  for (let i = data.length - 1; i >= 0; i--) {
    const total = sumSolved(data[i]);
    if (total > 0) current += 1;
    else break;
  }

  if (current > max) max = current;
  return { current, max };
}

// ---- Calendar grid transform: returns [weeks][days] (column-major, like GitHub)
function buildGrid(data: typeof activityData) {
  // 53 weeks to cover 365 days (GitHub style: columns=weeks, rows=days)
  const weeks: { date: string; easy: number; medium: number; hard: number }[][] = [];
  let week: typeof weeks[number] = [];
  for (let i = 0; i < data.length; i++) {
    const dayOfWeek = new Date(data[i].date).getDay(); // Sun=0 ... Sat=6
    week.push(data[i]);
    if (week.length === 7 || i === data.length - 1) {
      weeks.push(week);
      week = [];
    }
  }
  // Now, transpose: want [days][weeks]
  const byDay: typeof weeks = [];
  for (let day = 0; day < 7; day++) {
    byDay[day] = [];
    for (let w = 0; w < weeks.length; w++) {
      byDay[day][w] = weeks[w][day] || null;
    }
  }
  return byDay;
}

export function ContributionCalendar() {
  // Calendar display constants
  const gridData = React.useMemo(() => buildGrid(activityData), []);
  const streaks = React.useMemo(() => computeStreaks(activityData), []);

  return (
    <div className="bg-muted rounded-xl shadow-sm p-5 sm:p-6 w-full min-h-[260px] flex flex-col">
      {/* Header and legend */}
      <div className="flex flex-wrap justify-between items-center mb-2">
        <span className="font-semibold text-lg text-foreground">
          Streak Calendar
        </span>
        <div className="flex gap-1 items-center text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded bg-muted" />
          <div className="w-3 h-3 rounded bg-green-200" />
          <div className="w-3 h-3 rounded bg-green-400" />
          <div className="w-3 h-3 rounded bg-green-700" />
          <span className="ml-2">More problems solved</span>
        </div>
      </div>
      {/* Calendar grid */}
      <div className="overflow-x-auto my-3" style={{ WebkitOverflowScrolling: "touch" }}>
        <div
          className="grid grid-rows-7"
          style={{
            minWidth: "700px",
            gridTemplateColumns: `repeat(${gridData[0].length}, 16px)`,
            gridTemplateRows: `repeat(7, 16px)`,
            gap: "5px"
          }}
        >
          {gridData.map((row, dayIdx) =>
            row.map((cell, weekIdx) =>
              cell ? (
                <Tooltip key={cell.date}>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        w-4 h-4 rounded-lg transition
                        border border-border
                        ${getCellColor(sumSolved(cell))}
                        hover:scale-110 focus:outline-none
                        ${sumSolved(cell) === 0
                          ? "opacity-60 cursor-default"
                          : "cursor-pointer shadow-inner"}
                      `}
                      tabIndex={0}
                      aria-label={`Solved ${sumSolved(cell)} on ${cell.date}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="min-w-[130px] text-xs">
                      <div className="font-semibold">{formatDate(cell.date)}</div>
                      <div className="flex flex-col mt-1">
                        <span>
                          Easy: <span className="font-bold">{cell.easy}</span>
                        </span>
                        <span>
                          Medium: <span className="font-bold">{cell.medium}</span>
                        </span>
                        <span>
                          Hard: <span className="font-bold">{cell.hard}</span>
                        </span>
                        <span className="mt-1">
                          <span className="text-muted-foreground">Total: </span>
                          <span className="font-bold">
                            {sumSolved(cell)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={`${dayIdx}-${weekIdx}`} className="w-4 h-4 rounded-lg opacity-0" />
              )
            )
          )}
        </div>
      </div>
      {/* Streak Info */}
      <div className="flex gap-4 items-center mt-2 text-sm flex-wrap">
        <span>
          <span role="img" aria-label="current streak" className="mr-1">🔥</span>
          <b>Current streak:</b> {streaks.current} days
        </span>
        <span>
          <span role="img" aria-label="max streak" className="mr-1">🏆</span>
          <b>Max streak:</b> {streaks.max} days
        </span>
      </div>
    </div>
  );
}

