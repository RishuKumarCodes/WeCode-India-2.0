import { Task, WeekTasks } from "@/types/taskTypes";

// Helper to generate globally unique task IDs
function generateTaskId(month: number, week: number, taskIndex: number): string {
  return `m${month}-w${week}-t${taskIndex + 1}`;
}

// Convert weekly plan to structured tasks
export function convertToTasks(weeklyPlan: any[]): WeekTasks[] {
  return weeklyPlan.map((month, monthIndex) => {
    return month.weekly.map((week: any, weekIndex: number) => {
      let tasks: Task[] = [];
      
      // First, convert existing tasks from the weekly plan
      const existingTasks = week.tasks.map((taskText: string, taskIndex: number) => {
        // Extract estimated time from task text if present
        const timeMatch = taskText.match(/\((\d+[-\s]*hours?|\d+[-\s]*hrs?|\d+[-\s]*min)\)/i);
        let estimatedTime = "1-2 hours"; // default
        let cleanTitle = taskText;

        if (timeMatch) {
          estimatedTime = timeMatch[1];
          cleanTitle = taskText.replace(timeMatch[0], "").trim();
        }

        // Create shorter, more actionable titles
        let title = cleanTitle;
        let description = cleanTitle;

        // Shorten titles and improve them
        if (cleanTitle.length > 40) {
          // Extract key action words
          if (cleanTitle.toLowerCase().includes("solve") && cleanTitle.toLowerCase().includes("problem")) {
            title = "Solve Practice Problems";
          } else if (cleanTitle.toLowerCase().includes("watch") || cleanTitle.toLowerCase().includes("read")) {
            title = "Study Core Concepts";
          } else if (cleanTitle.toLowerCase().includes("build") || cleanTitle.toLowerCase().includes("project")) {
            title = "Build Mini Project";
          } else if (cleanTitle.toLowerCase().includes("practice") || cleanTitle.toLowerCase().includes("exercise")) {
            title = "Practice Exercises";
          } else {
            // Generic shortening
            const words = cleanTitle.split(" ");
            title = words.slice(0, 4).join(" ");
          }
          description = cleanTitle;
        } else {
          // For shorter titles, still clean them up
          title = cleanTitle.replace(/^(Read\/watch:|Watch:|Read:|Study:|Practice:)/i, "").trim();
          if (title.length === 0) title = cleanTitle;
        }

        // Add contextual estimated times based on task type
        if (cleanTitle.toLowerCase().includes("solve") && cleanTitle.toLowerCase().includes("problem")) {
          estimatedTime = "2-3 hours";
        } else if (cleanTitle.toLowerCase().includes("watch") || cleanTitle.toLowerCase().includes("read")) {
          estimatedTime = "1-2 hours";
        } else if (cleanTitle.toLowerCase().includes("build") || cleanTitle.toLowerCase().includes("project")) {
          estimatedTime = "3-5 hours";
        } else if (cleanTitle.toLowerCase().includes("practice") || cleanTitle.toLowerCase().includes("exercise")) {
          estimatedTime = "1-2 hours";
        }

        const id = generateTaskId(month.month, week.week, taskIndex);
        console.log('[convertToTasks] Generated Task ID:', id, '| Month:', month.month, '| Week:', week.week, '| TaskIdx:', taskIndex);

        return {
          id,
          title,
          description,
          estimatedTime,
          status: 'incomplete' as const,
        };
      });

      tasks = [...existingTasks];

      // Ensure minimum 4 tasks per week by adding supplementary tasks
      while (tasks.length < 4) {
        const taskIndex = tasks.length;
        let supplementaryTask: Task;

        if (taskIndex === existingTasks.length) {
          // First supplementary task - Review & Notes
          supplementaryTask = {
            id: generateTaskId(month.month, week.week, taskIndex),
            title: "Review & Take Notes",
            description: "Review all completed tasks and organize your learning notes",
            estimatedTime: "30-45 min",
            status: 'incomplete' as const,
          };
        } else if (taskIndex === existingTasks.length + 1) {
          // Second supplementary task - Self Assessment
          supplementaryTask = {
            id: generateTaskId(month.month, week.week, taskIndex),
            title: "Self Assessment Quiz",
            description: "Test your understanding with a quick self-assessment or online quiz",
            estimatedTime: "30 min",
            status: 'incomplete' as const,
          };
        } else if (taskIndex === existingTasks.length + 2) {
          // Third supplementary task - Community Engagement
          supplementaryTask = {
            id: generateTaskId(month.month, week.week, taskIndex),
            title: "Share Progress",
            description: "Share your learning progress on social media or with study group",
            estimatedTime: "15-20 min",
            status: 'incomplete' as const,
          };
        } else {
          // Additional tasks if needed
          supplementaryTask = {
            id: generateTaskId(month.month, week.week, taskIndex),
            title: "Extra Practice",
            description: "Complete additional practice problems or exercises related to this week's topic",
            estimatedTime: "1 hour",
            status: 'incomplete' as const,
          };
        }

        tasks.push(supplementaryTask);
      }

      return {
        id: `month-${month.month}-week-${week.week}`,
        month: month.month,
        monthTitle: month.monthTitle,
        week: week.week,
        weekTitle: week.weekTitle,
        tasks,
      };
    });
  }).flat();
}
