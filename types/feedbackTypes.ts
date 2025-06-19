
export interface AIFeedback {
    summary: string;
    strengths: string[];
    improvementSuggestions: string[];
    nextFocus: string;
    motivationalTip?: string;
    estimatedTimeToNextMilestone?: string;
  }
  
  export interface ProgressAnalysis {
    completionRate: number;
    consistencyScore: number;
    strongAreas: string[];
    weakAreas: string[];
    missedWeeks: number[];
    currentWeek: number;
    totalWeeks: number;
    recentActivity: boolean;
  }
  