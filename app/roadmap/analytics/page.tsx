"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserDashboard from "@/components/ai-roadmap/RoadmapAnalytics";
import { DashboardAnalytics } from "@/types/dashboardTypes";
import { calculateDashboardAnalytics } from "@/utils/dashboardAnalytics";
import { generateMonthWisePlan, generateWeeklyBreakdown } from "@/utils/generateRoadmap";
import { convertToTasks } from "@/utils/taskConverter";

export default function RoadmapAnalyticsPage() {
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("id");
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [mergedTasks, setMergedTasks] = useState([]);

  useEffect(() => {
    if (!roadmapId) return;
    // Fetch analytics and roadmap input for the given roadmap ID
    fetch(`/api/get-user-roadmaps?id=${roadmapId}`)
      .then(res => res.json())
      .then(roadmapInput => {
        // Generate the full plan and tasks for this roadmap
        const monthPlans = generateMonthWisePlan(roadmapInput.goal, roadmapInput.skillLevel, Number(roadmapInput.months));
        const weeklyPlan = generateWeeklyBreakdown(roadmapInput, monthPlans);
        const fullTasks = convertToTasks(weeklyPlan);

        // Try to get local progress
        const local = localStorage.getItem(`roadmapTasks_${roadmapId}`);
        let mergedTasks = fullTasks;
        let localTasks = [];
        if (local) {
          try {
            localTasks = JSON.parse(local);
            // Build a lookup for local tasks by unique key (month, week)
            const localTaskMap = new Map();
            for (const week of localTasks) {
              localTaskMap.set(`${week.month}-${week.week}`, week);
            }
            mergedTasks = fullTasks.map((week) => {
              const localWeek = localTaskMap.get(`${week.month}-${week.week}`);
              if (!localWeek) return week;
              return {
                ...week,
                tasks: week.tasks.map((task, j) => {
                  const localTask = localWeek.tasks?.[j];
                  return localTask ? { ...task, status: localTask.status, completedAt: localTask.completedAt } : task;
                }),
              };
            });
          } catch (e) {
            // fallback to fullTasks
          }
        }
        console.log("Full tasks (weeks):", fullTasks.length, fullTasks);
        console.log("Local tasks (weeks):", localTasks.length, localTasks);
        console.log("Merged tasks (weeks):", mergedTasks.length, mergedTasks);
        console.log("Month titles in mergedTasks:", mergedTasks.map(w => w.monthTitle));

        setMergedTasks(mergedTasks);
        setAnalytics(calculateDashboardAnalytics(mergedTasks));
        setUserName(roadmapInput.userName);
      })
      .finally(() => setLoading(false));
  }, [roadmapId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="flex justify-center items-center min-h-screen">No analytics found for this roadmap.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <UserDashboard analytics={analytics} userName={userName} mergedTasks={mergedTasks} />
    </div>
  );
} 