
import { Progress } from "@/components/ui/progress";

export function ProgressTracker({
  completeCount,
  totalCount,
}: {
  completeCount: number;
  totalCount: number;
}) {
  const percent = totalCount === 0 ? 0 : Math.round((completeCount / totalCount) * 100);
  let message = percent === 100
    ? "🎉 Project Complete! Awesome work."
    : percent >= 60
    ? "🚀 You're 60% done! Keep building!"
    : percent >= 30
    ? "✨ Great start! Keep going."
    : "Let's get started!";

  return (
    <div className="my-6 flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-primary font-medium">Progress</span>
        <span className="text-xs text-muted-foreground">{percent}%</span>
      </div>
      <Progress value={percent} className="w-full h-3 bg-muted" />
      <div className="font-semibold text-sm text-muted-foreground">{message}</div>
    </div>
  );
}
