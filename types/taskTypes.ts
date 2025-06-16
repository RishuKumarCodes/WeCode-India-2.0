
export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  status: 'incomplete' | 'completed';
  completedAt?: string;
}

export interface WeekTasks {
  month: number;
  monthTitle: string;
  week: number;
  weekTitle: string;
  tasks: Task[];
}

export interface TaskProgress {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
  currentLevel: number;
}
