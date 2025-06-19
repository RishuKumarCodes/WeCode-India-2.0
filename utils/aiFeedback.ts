
import { WeekTasks } from "@/types/taskTypes";
import { AIFeedback, ProgressAnalysis } from "@/types/feedbackTypes";

// Analyze user's progress patterns
export function analyzeProgress(weeklyTasks: WeekTasks[]): ProgressAnalysis {
  const totalTasks = weeklyTasks.reduce((sum, week) => sum + week.tasks.length, 0);
  const completedTasks = weeklyTasks.reduce(
    (sum, week) => sum + week.tasks.filter(task => task.status === 'completed').length,
    0
  );
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Calculate consistency score based on week completion rates
  const weekCompletionRates = weeklyTasks.map(week => {
    const weekCompleted = week.tasks.filter(task => task.status === 'completed').length;
    return week.tasks.length > 0 ? weekCompleted / week.tasks.length : 0;
  });
  
  const consistencyScore = weekCompletionRates.reduce((sum, rate) => sum + rate, 0) / weekCompletionRates.length * 100;
  
  // Identify strong and weak areas
  const monthProgress = new Map<string, { completed: number, total: number }>();
  weeklyTasks.forEach(week => {
    const existing = monthProgress.get(week.monthTitle) || { completed: 0, total: 0 };
    const weekCompleted = week.tasks.filter(task => task.status === 'completed').length;
    monthProgress.set(week.monthTitle, {
      completed: existing.completed + weekCompleted,
      total: existing.total + week.tasks.length
    });
  });
  
  const strongAreas: string[] = [];
  const weakAreas: string[] = [];
  
  monthProgress.forEach((progress, monthTitle) => {
    const monthRate = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    if (monthRate >= 70) {
      strongAreas.push(monthTitle);
    } else if (monthRate < 30 && progress.total > 0) {
      weakAreas.push(monthTitle);
    }
  });
  
  // Find missed weeks (weeks with 0% completion)
  const missedWeeks: number[] = [];
  weeklyTasks.forEach((week, index) => {
    const weekCompletion = week.tasks.filter(task => task.status === 'completed').length;
    if (weekCompletion === 0 && week.tasks.length > 0) {
      missedWeeks.push(index + 1);
    }
  });
  
  // Check recent activity (tasks completed in last 3 days)
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  const recentActivity = weeklyTasks.some(week =>
    week.tasks.some(task => 
      task.status === 'completed' && 
      task.completedAt && 
      new Date(task.completedAt) >= threeDaysAgo
    )
  );
  
  // Find current week (first week with incomplete tasks)
  const currentWeek = weeklyTasks.findIndex(week => 
    week.tasks.some(task => task.status === 'incomplete')
  ) + 1;
  
  return {
    completionRate,
    consistencyScore,
    strongAreas,
    weakAreas,
    missedWeeks,
    currentWeek: currentWeek || weeklyTasks.length,
    totalWeeks: weeklyTasks.length,
    recentActivity
  };
}

// Generate AI-powered feedback based on progress analysis
export function generateAIFeedback(weeklyTasks: WeekTasks[]): AIFeedback {
  const analysis = analyzeProgress(weeklyTasks);
  
  // Generate summary
  let summary = "";
  if (analysis.completionRate >= 75) {
    summary = `Outstanding! You've completed ${Math.round(analysis.completionRate)}% of your roadmap. You're in the final stretch! 🏆`;
  } else if (analysis.completionRate >= 50) {
    summary = `Great progress! You've completed ${Math.round(analysis.completionRate)}% of your roadmap. Keep up the excellent momentum! 🚀`;
  } else if (analysis.completionRate >= 25) {
    summary = `You've completed ${Math.round(analysis.completionRate)}% of your roadmap. Building steady progress! 💪`;
  } else {
    summary = `You've completed ${Math.round(analysis.completionRate)}% of your roadmap. Every journey starts with a single step! 🌱`;
  }
  
  // Generate strengths
  const strengths: string[] = [];
  
  if (analysis.consistencyScore >= 70) {
    strengths.push("Excellent consistency across different topics");
  }
  
  if (analysis.recentActivity) {
    strengths.push("Active learner - completed tasks in the last few days");
  }
  
  analysis.strongAreas.forEach(area => {
    strengths.push(`Strong performance in ${area}`);
  });
  
  if (analysis.missedWeeks.length === 0 && analysis.completionRate > 30) {
    strengths.push("Great follow-through - no completely missed weeks");
  }
  
  if (strengths.length === 0) {
    strengths.push("You've taken the important first step by starting your learning journey");
  }
  
  // Generate improvement suggestions
  const improvementSuggestions: string[] = [];
  
  if (analysis.missedWeeks.length > 0) {
    const missedWeeksList = analysis.missedWeeks.slice(0, 3).join(", ");
    improvementSuggestions.push(`Consider revisiting Week(s) ${missedWeeksList} - they contain important foundational concepts`);
  }
  
  analysis.weakAreas.forEach(area => {
    improvementSuggestions.push(`Focus more attention on ${area} - this area needs strengthening`);
  });
  
  if (!analysis.recentActivity && analysis.completionRate < 100) {
    improvementSuggestions.push("Try to complete at least one task every few days to maintain momentum");
  }
  
  if (analysis.consistencyScore < 50) {
    improvementSuggestions.push("Aim for more consistent progress across all weeks and topics");
  }
  
  if (improvementSuggestions.length === 0) {
    improvementSuggestions.push("Keep maintaining your current learning pace and consistency");
  }
  
  // Generate next focus
  let nextFocus = "";
  if (analysis.currentWeek <= analysis.totalWeeks) {
    const currentWeekData = weeklyTasks[analysis.currentWeek - 1];
    if (currentWeekData) {
      const incompleteTasks = currentWeekData.tasks.filter(task => task.status === 'incomplete');
      if (incompleteTasks.length > 0) {
        nextFocus = `Focus on ${currentWeekData.monthTitle} - ${currentWeekData.weekTitle}. Start with "${incompleteTasks[0].title}" and aim to complete ${Math.min(2, incompleteTasks.length)} tasks this week.`;
      } else {
        const nextWeek = weeklyTasks[analysis.currentWeek];
        if (nextWeek) {
          nextFocus = `Ready for ${nextWeek.monthTitle} - ${nextWeek.weekTitle}! Preview the upcoming topics and plan your schedule.`;
        } else {
          nextFocus = "Congratulations! You've completed your entire roadmap. Consider reviewing key concepts or starting an advanced track.";
        }
      }
    }
  } else {
    nextFocus = "Amazing! You've completed your roadmap. Time to apply your knowledge to real projects or advance to the next level.";
  }
  
  // Generate motivational tip
  const motivationalTips = [
    "Remember: consistency beats perfection. Small daily progress compounds over time.",
    "Tip: Explain concepts to others (or even to yourself) to reinforce your understanding.",
    "Pro tip: Take breaks when stuck. Often solutions come when you step away briefly.",
    "Remember: every expert was once a beginner. You're building valuable skills with each task.",
    "Tip: Connect new concepts to what you already know - it helps with retention."
  ];
  
  const motivationalTip = motivationalTips[Math.floor(Math.random() * motivationalTips.length)];
  
  // Estimate time to next milestone
  let estimatedTimeToNextMilestone = "";
  const remainingTasks = weeklyTasks.reduce(
    (sum, week) => sum + week.tasks.filter(task => task.status === 'incomplete').length,
    0
  );
  
  if (remainingTasks > 0) {
    const tasksToNextMilestone = Math.min(remainingTasks, 10); // Next 10 tasks or completion
    const avgTimePerTask = 1.5; // hours
    const estimatedHours = tasksToNextMilestone * avgTimePerTask;
    
    if (estimatedHours < 8) {
      estimatedTimeToNextMilestone = `About ${Math.round(estimatedHours)} hours to your next milestone`;
    } else {
      const days = Math.ceil(estimatedHours / 2); // 2 hours per day
      estimatedTimeToNextMilestone = `About ${days} days to your next milestone (2hrs/day)`;
    }
  }
  
  return {
    summary,
    strengths,
    improvementSuggestions,
    nextFocus,
    motivationalTip,
    estimatedTimeToNextMilestone
  };
}
