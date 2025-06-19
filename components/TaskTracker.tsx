import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Trophy, Rocket, Star } from "lucide-react";
import { Task, WeekTasks, TaskProgress } from "@/types/taskTypes";
import { DashboardAnalytics } from "@/types/dashboardTypes";
import { SmartReminders as SmartRemindersType } from "@/types/reminderTypes";
import { AIFeedback as AIFeedbackType } from "@/types/feedbackTypes";
import { calculateDashboardAnalytics } from "@/utils/dashboardAnalytics";
import { generateSmartReminders } from "@/utils/smartReminder";
import { generateAIFeedback } from "@/utils/aiFeedback";
// import UserDashboard from "@/components/ai-roadmap/RoadmapAnalytics";
// import SmartReminders from "@/components/ai-roadmap/SmartReminders";
// import AIFeedback from "@/components/ai-roadmap/AIFeedback";

interface TaskTrackerProps {
  weeklyTasks: WeekTasks[];
  onProgressUpdate?: (progress: TaskProgress) => void;
  onAnalyticsUpdate?: (analytics: DashboardAnalytics) => void;
  showDashboard?: boolean;
  userName?: string;
  roadmapId?: string;
}

export default function TaskTracker({ 
  weeklyTasks, 
  onProgressUpdate, 
  onAnalyticsUpdate,
  showDashboard = true,
  userName,
  roadmapId
}: TaskTrackerProps) {
  const [tasks, setTasks] = useState<WeekTasks[]>(() => {
    const key = roadmapId ? `roadmapTasks_${roadmapId}` : 'roadmapTasks';
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : weeklyTasks;
    }
    return weeklyTasks;
  });
  const [progress, setProgress] = useState<TaskProgress>({
    totalTasks: 0,
    completedTasks: 0,
    completionPercentage: 0,
    currentLevel: 1,
  });
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [smartReminders, setSmartReminders] = useState<SmartRemindersType | null>(null);
  const [aiFeedback, setAiFeedback] = useState<AIFeedbackType | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    const totalTasks = tasks.reduce((sum, week) => sum + week.tasks.length, 0);
    const completedTasks = tasks.reduce(
      (sum, week) => sum + week.tasks.filter(task => task.status === 'completed').length,
      0
    );
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const currentLevel = Math.floor(completedTasks / 3) + 1;

    const newProgress = {
      totalTasks,
      completedTasks,
      completionPercentage,
      currentLevel,
    };

    setProgress(newProgress);
    onProgressUpdate?.(newProgress);

    // Calculate detailed analytics
    const newAnalytics = calculateDashboardAnalytics(tasks);
    setAnalytics(newAnalytics);
    onAnalyticsUpdate?.(newAnalytics);

    // Generate smart reminders
    const newSmartReminders = generateSmartReminders(tasks);
    setSmartReminders(newSmartReminders);

    // Generate AI feedback
    const newAiFeedback = generateAIFeedback(tasks);
    setAiFeedback(newAiFeedback);
  }, [tasks, onProgressUpdate, onAnalyticsUpdate]);

  // When roadmapId or weeklyTasks change, re-check localStorage or use new weeklyTasks
  useEffect(() => {
    const key = roadmapId ? `roadmapTasks_${roadmapId}` : 'roadmapTasks';
    const saved = localStorage.getItem(key);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, [roadmapId]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    const key = roadmapId ? `roadmapTasks_${roadmapId}` : 'roadmapTasks';
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks, roadmapId]);

  const handleTaskComplete = (weekKey: string, taskId: string) => {
    setTasks(prevTasks => prevTasks.map(week => {
      const currentWeekKey = `${week.month}-${week.week}`;
      return currentWeekKey === weekKey
        ? {
            ...week,
            tasks: week.tasks.map(task =>
              task.id === taskId
                ? { ...task, status: 'completed', completedAt: new Date().toISOString() }
                : task
            ),
          }
        : week;
    }));

    // Show motivational toast
    const week = tasks.find(w => `${w.month}-${w.week}` === weekKey);
    const task = week?.tasks.find(t => t.id === taskId);
    if (!task) return;
    const motivationalMessages = [
      `🎉 Hurray! You completed '${task.title}' — one step closer to your goal!`,
      `🚀 Awesome job! Keep up the momentum. Your consistency is your power.`,
      `⭐ Outstanding! You're building unstoppable momentum with '${task.title}'!`,
      `🔥 Great work! Every completed task brings you closer to mastery.`,
      `💪 You're crushing it! '${task.title}' is done and dusted!`,
    ];
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    toast({
      title: "Task Completed!",
      description: randomMessage,
      duration: 4000,
      className: "fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700",
    });

    // Check for level up
    const newCompletedCount = progress.completedTasks + 1;
    if (newCompletedCount % 3 === 0) {
      setTimeout(() => {
        toast({
          title: "🏆 LEVEL UP!",
          description: `You've completed ${newCompletedCount} tasks. Keep going, champion!`,
          duration: 5000,
          className: "fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700",
        });
      }, 1000);
    }
  };

  const handleTaskUncomplete = (weekKey: string, taskId: string) => {
    setTasks(prevTasks => prevTasks.map(week => {
      const currentWeekKey = `${week.month}-${week.week}`;
      return currentWeekKey === weekKey
        ? {
            ...week,
            tasks: week.tasks.map(task =>
              task.id === taskId
                ? { ...task, status: 'incomplete', completedAt: undefined }
                : task
            ),
          }
        : week;
    }));
  };

  const resetAllTasks = () => {
    const resetTasks = tasks.map(month => ({
      ...month,
      tasks: month.tasks.map(task => ({
        ...task,
        status: 'incomplete' as const,
        completedAt: undefined,
      })),
    }));
    
    setTasks(resetTasks);
    
    toast({
      title: "Progress Reset",
      description: "All tasks have been reset. Ready for a fresh start!",
    });
  };

  return (
    <div className="space-y-8 mt-6">

      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Your Progress Journey
            </h3>
            <p className="text-muted-foreground">
              Level {progress.currentLevel} • {progress.completedTasks}/{progress.totalTasks} tasks completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{progress.completionPercentage}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
        <Progress value={progress.completionPercentage} className="h-3" />
      </div>

      {/* Task List */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">📋 Interactive Task Tracker</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetAllTasks}
            className="text-xs"
          >
            Reset All
          </Button>
        </div>

        {tasks.map((week) => {
          const weekKey = `${week.month}-${week.week}`;
          console.log('Rendering week:', weekKey, week.monthTitle, week.weekTitle);
          week.tasks.forEach(task => {
            console.log('  Task ID:', task.id, '| Title:', task.title);
          });
          return (
            <div
              key={weekKey}
              className="p-5 rounded-lg border-l-4 border-primary bg-muted/30"
            >
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-accent-foreground">
                  {week.monthTitle} - {week.weekTitle}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-sm text-muted-foreground">
                    {week.tasks.filter(t => t.status === 'completed').length}/{week.tasks.length} completed
                  </div>
                  {week.tasks.filter(t => t.status === 'completed').length === week.tasks.length && (
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4" />
                      Week Complete!
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {week.tasks.map((task) => {
                  return (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-3 rounded-md border transition-all ${
                        task.status === 'completed'
                          ? 'bg-green-50 border-green-200 opacity-75'
                          : 'bg-background border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={(checked) => {
                          console.log('Checkbox changed for task:', task.id, '| Checked:', checked, '| Week:', weekKey);
                          if (checked) {
                            handleTaskComplete(weekKey, task.id);
                          } else {
                            handleTaskUncomplete(weekKey, task.id);
                          }
                        }}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>⏱️ {task.estimatedTime}</span>
                          {task.completedAt && (
                            <span className="text-green-600">
                              ✅ Completed {new Date(task.completedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Footer */}
      {progress.completionPercentage > 0 && (
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-lg">Keep Going!</span>
          </div>
          <p className="text-muted-foreground">
            {progress.completionPercentage < 25 && "Every expert was once a beginner. You've got this! 💪"}
            {progress.completionPercentage >= 25 && progress.completionPercentage < 50 && "You're building momentum! Great progress so far! 🚀"}
            {progress.completionPercentage >= 50 && progress.completionPercentage < 75 && "Halfway there! Your dedication is paying off! ⭐"}
            {progress.completionPercentage >= 75 && progress.completionPercentage < 100 && "Almost there! The finish line is in sight! 🏆"}
            {progress.completionPercentage === 100 && "Congratulations! You've completed your entire roadmap! 🎉🎊"}
          </p>
        </div>
      )}
    </div>
  );
}
