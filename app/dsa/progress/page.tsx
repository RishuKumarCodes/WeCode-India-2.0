"use client";
import React from "react";
import { BarChart3, CheckCircle, Circle, Clock } from "lucide-react";

// no hooks needed here, so we can render immediately
export default function ProgressPage() {
  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Problems Solved", value: "142" },
          { label: "Current Streak", value: "23 Days" },
          { label: "Topics Completed", value: "6/12" },
          { label: "Time Invested", value: "142 hrs" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-4"
          >
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart3 size={20} />
          Performance Analytics
        </h3>
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Problems Solved This Week
          </h4>
          <div className="flex items-end gap-2 h-32">
            {[
              { day: "Mon", count: 3, height: "60%" },
              { day: "Tue", count: 5, height: "100%" },
              { day: "Wed", count: 2, height: "40%" },
              { day: "Thu", count: 4, height: "80%" },
              { day: "Fri", count: 6, height: "120%" },
              { day: "Sat", count: 1, height: "20%" },
              { day: "Sun", count: 3, height: "60%" },
            ].map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gray-100 dark:bg-zinc-800 rounded-t flex items-end justify-center relative"
                  style={{ height: "120px" }}
                >
                  <div
                    className="w-full bg-gray-800 dark:bg-zinc-100 rounded-t transition-all duration-500 flex items-end justify-center pb-2"
                    style={{ height: day.height }}
                  >
                    <span className="text-white dark:text-black text-xs font-medium">
                      {day.count}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {day.day}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Problem Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Problem Categories
          </h4>
          <div className="space-y-3">
            {[
              { category: "Array & String", solved: 45, total: 60, percentage: 75 },
              { category: "Tree & Graph", solved: 32, total: 50, percentage: 64 },
              { category: "Dynamic Programming", solved: 18, total: 40, percentage: 45 },
              { category: "Sorting & Searching", solved: 28, total: 35, percentage: 80 },
            ].map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {cat.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {cat.solved}/{cat.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded h-2">
                    <div
                      className="h-2 bg-gray-700 dark:bg-zinc-200 rounded transition-all duration-300"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Streak
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              23 Days
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Longest streak: 45 days
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Milestones
          </h3>
          <div className="space-y-3">
            {[
              { title: "100 Problems Solved", date: "Last week", completed: true },
              { title: "First Hard Problem", date: "2 weeks ago", completed: true },
              { title: "30-Day Streak", date: "In progress", completed: false },
              { title: "All Easy Problems", date: "Next milestone", completed: false },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                {m.completed ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Circle size={16} className="text-gray-300 dark:text-gray-600" />
                )}
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium ${
                      m.completed
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {m.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {m.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
