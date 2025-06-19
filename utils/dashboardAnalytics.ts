
import type { WeekTasks, Task } from "@/types/taskTypes";
import type { DashboardAnalytics, StreakData, MonthProgress } from "@/types/dashboardTypes";

// Calculate streak based on task completion dates
export function calculateStreak(tasks: WeekTasks[]): StreakData {
  const completedTasks = tasks
    .flatMap(week => week.tasks)
    .filter(task => task.status === 'completed' && task.completedAt)
    .map(task => ({
      ...task,
      completedAt: new Date(task.completedAt!)
    }))
    .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());

  if (completedTasks.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastCompletionDate: null };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let currentDate = new Date(today);
  
  // Group tasks by date
  const tasksByDate = new Map<string, number>();
  completedTasks.forEach(task => {
    const dateStr = task.completedAt.toDateString();
    tasksByDate.set(dateStr, (tasksByDate.get(dateStr) || 0) + 1);
  });

  // Calculate current streak (working backwards from today)
  for (let i = 0; i <= 30; i++) { // Check last 30 days
    const dateStr = currentDate.toDateString();
    if (tasksByDate.has(dateStr)) {
      currentStreak++;
    } else if (currentStreak > 0) {
      break; // Streak broken
    }
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Calculate longest streak
  const uniqueDates = Array.from(tasksByDate.keys())
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());

  if (uniqueDates.length > 0) {
    tempStreak = 1;
    longestStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = uniqueDates[i - 1];
      const currDate = uniqueDates[i];
      const dayDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    lastCompletionDate: completedTasks[0]?.completedAt.toISOString() || null
  };
}

// Parse estimated time and convert to hours
function parseTimeToHours(timeStr: string): number {
  const lowerStr = timeStr.toLowerCase();
  
  // Match patterns like "2-3 hours", "30 min", "1 hour", etc.
  const hourMatch = lowerStr.match(/(\d+)(?:-(\d+))?\s*(?:hours?|hrs?)/);
  const minMatch = lowerStr.match(/(\d+)(?:-(\d+))?\s*(?:minutes?|mins?|min)/);
  
  if (hourMatch) {
    const min = parseInt(hourMatch[1]);
    const max = hourMatch[2] ? parseInt(hourMatch[2]) : min;
    return (min + max) / 2;
  }
  
  if (minMatch) {
    const min = parseInt(minMatch[1]);
    const max = minMatch[2] ? parseInt(minMatch[2]) : min;
    return ((min + max) / 2) / 60; // Convert minutes to hours
  }
  
  // Default fallback
  return 1.5;
}

// Calculate month-wise progress
export function calculateMonthProgress(tasks: WeekTasks[]): Record<string, number> {
  const monthGroups = new Map<string, { completed: number; total: number }>();
  
  tasks.forEach(week => {
    const monthKey = week.monthTitle;
    const existing = monthGroups.get(monthKey) || { completed: 0, total: 0 };
    
    const completedInWeek = week.tasks.filter(task => task.status === 'completed').length;
    const totalInWeek = week.tasks.length;
    
    monthGroups.set(monthKey, {
      completed: existing.completed + completedInWeek,
      total: existing.total + totalInWeek
    });
  });
  
  const monthProgress: Record<string, number> = {};
  monthGroups.forEach((data, monthTitle) => {
    monthProgress[monthTitle] = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
  });
  
  return monthProgress;
}

// Generate motivational message based on completion
function getMotivationalMessage(completionPercent: number, streakDays: number): string {
  const messages = {
    low: [
      "Let's get started! Small steps make a big difference. 🌱",
      "Every expert was once a beginner. You've got this! 💪",
      "The journey of a thousand miles begins with a single step. 🚀"
    ],
    medium: [
      "You're on a roll! Stay consistent and keep the momentum going! 🔥",
      "Fantastic progress! Your dedication is really paying off. ⭐",
      "Halfway there! Your consistency is your superpower. 🚀"
    ],
    high: [
      "Almost there! Push through the final stretch - you're crushing it! 🏆",
      "Outstanding! You're in the home stretch. Victory is in sight! 🎯",
      "Incredible progress! You're about to achieve something amazing! 🌟"
    ]
  };

  let category: 'low' | 'medium' | 'high';
  if (completionPercent < 25) category = 'low';
  else if (completionPercent <= 75) category = 'medium';
  else category = 'high';

  const baseMessages = messages[category];
  let message = baseMessages[Math.floor(Math.random() * baseMessages.length)];

  // Add streak bonus message
  if (streakDays >= 7) {
    message += ` 🔥 ${streakDays}-day streak! You're unstoppable!`;
  } else if (streakDays >= 3) {
    message += ` 🔥 ${streakDays} days in a row! Keep it up!`;
  }

  return message;
}

// Calculate estimated completion date
function getEstimatedCompletionDate(
  remainingTasks: number,
  averageTasksPerDay: number
): string {
  if (averageTasksPerDay === 0 || remainingTasks === 0) {
    return "Complete!";
  }

  const daysRemaining = Math.ceil(remainingTasks / averageTasksPerDay);
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + daysRemaining);
  
  return completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Main analytics calculation function
export function calculateDashboardAnalytics(tasks: WeekTasks[]): DashboardAnalytics {
  const allTasks = tasks.flatMap(week => week.tasks);
  const completedTasks = allTasks.filter(task => task.status === 'completed');
  
  const totalTasks = allTasks.length;
  const tasksCompleted = completedTasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;
  
  // Calculate remaining hours
  const remainingTasks = allTasks.filter(task => task.status === 'incomplete');
  const hoursRemainingEstimate = remainingTasks.reduce((total, task) => {
    return total + parseTimeToHours(task.estimatedTime);
  }, 0);
  
  // Calculate streak
  const streakData = calculateStreak(tasks);
  
  // Calculate month-wise progress
  const monthWiseProgress = calculateMonthProgress(tasks);
  
  // Calculate daily averages
  const today = new Date();
  const todayStr = today.toDateString();
  const tasksCompletedToday = completedTasks.filter(task => {
    if (!task.completedAt) return false;
    return new Date(task.completedAt).toDateString() === todayStr;
  }).length;
  
  // Calculate average tasks per day (based on last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentCompletedTasks = completedTasks.filter(task => {
    if (!task.completedAt) return false;
    return new Date(task.completedAt) >= sevenDaysAgo;
  });
  
  const averageTasksPerDay = recentCompletedTasks.length / 7;
  
  // Calculate current level (every 3 tasks = 1 level)
  const currentLevel = Math.floor(tasksCompleted / 3) + 1;
  
  // Get motivational message
  const motivationalMessage = getMotivationalMessage(completionPercent, streakData.currentStreak);
  
  // Estimated completion date
  const estimatedCompletionDate = getEstimatedCompletionDate(
    remainingTasks.length,
    averageTasksPerDay
  );
  
  return {
    completionPercent,
    tasksCompleted,
    totalTasks,
    monthWiseProgress,
    streakDays: streakData.currentStreak,
    hoursRemainingEstimate: Math.round(hoursRemainingEstimate * 10) / 10, // Round to 1 decimal
    motivationalMessage,
    currentLevel,
    tasksCompletedToday,
    averageTasksPerDay: Math.round(averageTasksPerDay * 10) / 10,
    estimatedCompletionDate
  };
}
