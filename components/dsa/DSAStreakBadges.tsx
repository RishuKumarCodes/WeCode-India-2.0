
import { Badge } from "@/components/ui/badge";

const getStreakBadges = (
  solvedToday: number,
  dailyStreak: number,
  weeklyStreak: number
) => {
  const badges: { icon: string; text: string; color: string }[] = [];
  if (dailyStreak >= 3) {
    badges.push({ icon: "🔥", text: `${dailyStreak}-Day Streak!`, color: "bg-orange-100 text-orange-800" });
  }
  if (weeklyStreak >= 7) {
    badges.push({ icon: "🏅", text: "Consistency Champ", color: "bg-yellow-100 text-yellow-800" });
  }
  if (solvedToday > 0) {
    badges.push({ icon: "✅", text: `Solved today: ${solvedToday}`, color: "bg-green-100 text-green-800" });
  }
  if (badges.length === 0) {
    badges.push({ icon: "✨", text: "Let’s start your DSA streak!", color: "bg-muted text-muted-foreground" });
  }
  return badges;
};

export function DSAStreakBadges({
  solvedToday,
  dailyStreak,
  weeklyStreak,
}: {
  solvedToday: number;
  dailyStreak: number;
  weeklyStreak: number;
}) {
  const badges = getStreakBadges(solvedToday, dailyStreak, weeklyStreak);

  return (
    <div className="flex flex-wrap gap-2 mb-7 animate-fade-in">
      {badges.map((badge, i) => (
        <Badge
          key={i}
          className={`rounded-2xl px-4 py-2 font-semibold text-base shadow-sm ${badge.color}`}
        >
          <span className="mr-1">{badge.icon}</span>
          {badge.text}
        </Badge>
      ))}
    </div>
  );
}
