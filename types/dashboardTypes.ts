export interface DashboardAnalytics {
    completionPercent: number;
    tasksCompleted: number;
    totalTasks: number;
    monthWiseProgress: Record<string, number>;
    streakDays: number;
    hoursRemainingEstimate: number;
    motivationalMessage: string;
    currentLevel: number;
    tasksCompletedToday: number;
    averageTasksPerDay: number;
    estimatedCompletionDate: string;
  }
  
  export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastCompletionDate: string | null;
  }
  
  export interface MonthProgress {
    [month: string]: number;
  }
  