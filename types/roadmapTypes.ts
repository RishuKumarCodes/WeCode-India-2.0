export interface RoadmapInput {
  goal: string;
  skillLevel: string;
  months: number;
  dailyHours?: number;
  targetCompaniesOrRoles?: string | null;
};

export interface MonthPlan {
  month: number;
  title: string;
  focus: string;
  weeks?: {
    week: number;
    weekTitle: string;
    weekLabel: string;
    tasks: string[];
    weekResources: { name: string; url: string }[];
  }[];
};
