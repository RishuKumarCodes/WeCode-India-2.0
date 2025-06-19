
export interface DailyReminder {
    tasks: string[];
    estimatedTime: string;
    reminderTime: string;
    date: string;
  }
  
  export interface MissedTasksInfo {
    count: number;
    tasks: string[];
    recoveryPlan: string;
    daysOverdue: number;
  }
  
  export interface NotificationItem {
    id: string;
    message: string;
    time: string;
    cta?: string;
    type: 'daily' | 'missed' | 'encouragement' | 'milestone';
    priority: 'low' | 'medium' | 'high';
  }
  
  export interface SmartReminders {
    today: DailyReminder;
    missedTasks: MissedTasksInfo;
    notifications: NotificationItem[];
    weeklyGoal: {
      targetTasks: number;
      completedTasks: number;
      remainingDays: number;
    };
  }
  