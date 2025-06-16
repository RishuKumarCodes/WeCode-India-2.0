export interface RoadmapInput {
  goal: string;
  skill_level: string;
  months: number;
  daily_hours?: number;
  target_companies_or_roles?: string | null;
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
