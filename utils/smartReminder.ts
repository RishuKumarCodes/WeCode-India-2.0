import { WeekTasks } from "@/types/taskTypes";
import { SmartReminders, DailyReminder, MissedTasksInfo, NotificationItem } from "@/types/reminderTypes";

export function generateSmartReminders(weeklyTasks: WeekTasks[]): SmartReminders {
  const now = new Date();
  const today = new Date().toDateString();
  
  // Get all tasks with their completion status
  const allTasks = weeklyTasks.flatMap(week => week.tasks);
  const completedTasks = allTasks.filter(task => task.status === 'completed');
  const incompleteTasks = allTasks.filter(task => task.status === 'incomplete');
  
  // Calculate missed tasks (tasks that should have been done by now)
  const missedTasks = getMissedTasks(weeklyTasks);
  
  // Get today's suggested tasks
  const todaysTasks = getTodaysTasks(weeklyTasks, missedTasks.tasks);
  
  // Generate notifications
  const notifications = generateNotifications(todaysTasks, missedTasks, completedTasks.length);
  
  // Calculate weekly goal
  const weeklyGoal = calculateWeeklyGoal(weeklyTasks);
  
  return {
    today: todaysTasks,
    missedTasks,
    notifications,
    weeklyGoal
  };
}

function getMissedTasks(weeklyTasks: WeekTasks[]): MissedTasksInfo {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // For demo purposes, we'll consider tasks from first 2 weeks as potentially overdue
  const earlyTasks = weeklyTasks.slice(0, 2).flatMap(week => week.tasks);
  const missedTasks = earlyTasks.filter(task => task.status === 'incomplete');
  
  const count = missedTasks.length;
  const tasks = missedTasks.map(task => task.title);
  
  let recoveryPlan = "You're all caught up!";
  let daysOverdue = 0;
  
  if (count > 0) {
    daysOverdue = Math.floor(count / 2) + 1;
    if (count <= 2) {
      recoveryPlan = "Complete these tasks today to get back on track";
    } else if (count <= 5) {
      recoveryPlan = `Complete 2-3 tasks per day over the next ${Math.ceil(count / 2)} days`;
    } else {
      recoveryPlan = `Focus on 3-4 tasks daily for the next week to catch up`;
    }
  }
  
  return {
    count,
    tasks,
    recoveryPlan,
    daysOverdue
  };
}

function getTodaysTasks(weeklyTasks: WeekTasks[], missedTaskTitles: string[]): DailyReminder {
  const now = new Date();
  const today = now.toDateString();
  
  // If there are missed tasks, prioritize those
  if (missedTaskTitles.length > 0) {
    const tasksToShow = missedTaskTitles.slice(0, 2); // Show max 2 missed tasks
    return {
      tasks: tasksToShow,
      estimatedTime: calculateEstimatedTime(tasksToShow.length),
      reminderTime: "8:00 AM",
      date: today
    };
  }
  
  // Otherwise, suggest next incomplete tasks
  const incompleteTasks = weeklyTasks
    .flatMap(week => week.tasks)
    .filter(task => task.status === 'incomplete');
    
  const todaysTasks = incompleteTasks.slice(0, 2).map(task => task.title);
  
  return {
    tasks: todaysTasks,
    estimatedTime: calculateEstimatedTime(todaysTasks.length),
    reminderTime: "8:00 AM",
    date: today
  };
}

function calculateEstimatedTime(taskCount: number): string {
  if (taskCount === 0) return "0 hours";
  if (taskCount === 1) return "1-2 hours";
  if (taskCount === 2) return "2-3 hours";
  return `${taskCount * 1.5}-${taskCount * 2} hours`;
}

function generateNotifications(
  todaysTasks: DailyReminder, 
  missedTasks: MissedTasksInfo, 
  completedCount: number
): NotificationItem[] {
  const notifications: NotificationItem[] = [];
  
  // Morning task reminder
  if (todaysTasks.tasks.length > 0) {
    notifications.push({
      id: 'morning-reminder',
      message: `Good morning! You have ${todaysTasks.tasks.length} task${todaysTasks.tasks.length > 1 ? 's' : ''} waiting 🎯`,
      time: "8:00 AM",
      cta: "Start Now",
      type: 'daily',
      priority: 'medium'
    });
  }
  
  // Missed tasks notification
  if (missedTasks.count > 0) {
    notifications.push({
      id: 'missed-tasks',
      message: `You have ${missedTasks.count} pending task${missedTasks.count > 1 ? 's' : ''} from previous days. Let's catch up! 💪`,
      time: "7:30 AM",
      cta: "View Tasks",
      type: 'missed',
      priority: 'high'
    });
  }
  
  // Evening reflection
  notifications.push({
    id: 'evening-reflection',
    message: "How did your learning go today? Don't forget to mark completed tasks! 📝",
    time: "7:00 PM",
    cta: "Update Progress",
    type: 'daily',
    priority: 'low'
  });
  
  // Milestone encouragement
  if (completedCount > 0 && completedCount % 5 === 0) {
    notifications.push({
      id: 'milestone',
      message: `Amazing! You've completed ${completedCount} tasks. You're building great momentum! 🚀`,
      time: "12:00 PM",
      cta: "Keep Going",
      type: 'milestone',
      priority: 'medium'
    });
  }
  
  return notifications;
}

function calculateWeeklyGoal(weeklyTasks: WeekTasks[]) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const remainingDays = dayOfWeek === 0 ? 7 : 7 - dayOfWeek; // Days left in current week
  
  // For simplicity, let's assume a weekly goal of 7 tasks (1 per day)
  const targetTasks = 7;
  const thisWeekTasks = weeklyTasks.slice(0, 1).flatMap(week => week.tasks); // Current week
  const completedThisWeek = thisWeekTasks.filter(task => task.status === 'completed').length;
  
  return {
    targetTasks,
    completedTasks: completedThisWeek,
    remainingDays
  };
}
