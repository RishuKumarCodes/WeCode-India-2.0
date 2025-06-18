import * as React from "react";
import { dsaQuestions, DsaQuestion } from "../../data/dsa-questions";
import { DSAQuestionCard } from "../../components/DSAQuestionCard";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Filter, Search, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const difficultyLevels = ["Easy", "Medium", "Hard"] as const;

function getStoredState() {
  if (typeof window === "undefined") return { solved: {}, bookmarks: {}, history: [] };
  const solved = JSON.parse(localStorage.getItem("dsa-solved") || "{}");
  const bookmarks = JSON.parse(localStorage.getItem("dsa-bookmarks") || "{}");
  const history = JSON.parse(localStorage.getItem("dsa-history") || "[]");
  return { solved, bookmarks, history };
}

function storeState({ solved, bookmarks, history }: { solved: any; bookmarks: any; history: any }) {
  localStorage.setItem("dsa-solved", JSON.stringify(solved));
  localStorage.setItem("dsa-bookmarks", JSON.stringify(bookmarks));
  localStorage.setItem("dsa-history", JSON.stringify(history));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useStreak(history: { date: string, count: number }[] = []) {
  const today = todayStr();
  let solvedToday = 0, dailyStreak = 0, weeklyStreak = 0;
  // Reversed order (most recent first)
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  let cont = true, day = new Date(today);
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].date === today) solvedToday = sorted[i].count;
    // daily streak: count days up until a break (even if solvedToday==0)
    if (cont && sorted[i].count > 0) {
      const dayStr = day.toISOString().slice(0, 10);
      if (sorted[i].date === dayStr) {
        dailyStreak += 1;
        day.setDate(day.getDate() - 1);
      } else {
        cont = false;
      }
    }
  }
  // weekly streak: total nonzero days in last 7 days
  const now = new Date(today);
  for (let i = 0; i < 7; i++) {
    const dayStr = new Date(now.getTime() - i * 86400000).toISOString().slice(0, 10);
    const entry = history.find(h => h.date === dayStr);
    weeklyStreak += entry?.count ? 1 : 0;
  }
  return { solvedToday, dailyStreak, weeklyStreak };
}

export function DSAQuestionList() {
  const [filters, setFilters] = React.useState<{
    topic: string,
    difficulty: typeof difficultyLevels[number] | "",
    search: string,
    sortBy: "title" | "difficulty",
    sortDir: "asc" | "desc"
  }>({ topic: "", difficulty: "", search: "", sortBy: "title", sortDir: "asc" });

  const [userData, setUserData] = React.useState(() => getStoredState());
  // history: [{date: "2024-06-14", count: 3}]
  React.useEffect(() => {
    const handle = () => {
      setUserData(getStoredState());
    };
    window.addEventListener("storage", handle);
    return () => window.removeEventListener("storage", handle);
  }, []);

  // Helper: historical solved/day update
  function updateSolved(questionId: string) {
    setUserData(prev => {
      const solved = { ...prev.solved };
      solved[questionId] = !solved[questionId];
      // update solve count for today
      const history = Array.isArray(prev.history) ? [...prev.history] : [];
      const today = todayStr();
      let entry = history.find((h: any) => h.date === today);
      let cnt = Object.values(solved).filter(Boolean).length;
      if (entry) entry.count = cnt;
      else history.push({ date: today, count: cnt });
      storeState({ ...prev, solved, history });
      return { ...prev, solved, history };
    });
  }

  function updateBookmark(questionId: string) {
    setUserData(prev => {
      const bookmarks = { ...prev.bookmarks };
      bookmarks[questionId] = !bookmarks[questionId];
      storeState({ ...prev, bookmarks });
      return { ...prev, bookmarks };
    });
  }

  // filtering logic
  const allTopics = Array.from(new Set(dsaQuestions.map(q => q.topic)));
  let filtered = dsaQuestions.filter(q =>
    (!filters.topic || q.topic === filters.topic) &&
    (!filters.difficulty || q.difficulty === filters.difficulty) &&
    (
      !filters.search ||
      q.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      q.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
    )
  );

  // sorting
  if (filters.sortBy === "title") {
    filtered.sort((a, b) =>
      filters.sortDir === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title));
  } else {
    filtered.sort((a, b) => {
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return filters.sortDir === "asc"
        ? diffOrder[a.difficulty] - diffOrder[b.difficulty]
        : diffOrder[b.difficulty] - diffOrder[a.difficulty];
    });
  }

  // streak
  const { solvedToday, dailyStreak, weeklyStreak } = useStreak(userData.history);

  return (
    <div>
      {/* Filters Row */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl flex items-center gap-2 text-sm">
                <Filter size={16} />
                {filters.topic || "Topic"}
                <ArrowDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setFilters(f => ({ ...f, topic: "" }))}
                className={!filters.topic ? "font-semibold" : ""}
              >
                All Topics
              </DropdownMenuItem>
              {allTopics.map(topic => (
                <DropdownMenuItem
                  key={topic}
                  onClick={() => setFilters(f => ({ ...f, topic }))}
                  className={topic === filters.topic ? "font-semibold" : ""}
                >
                  {topic}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl flex items-center gap-2 text-sm">
                <Filter size={16} />
                {filters.difficulty || "Difficulty"}
                <ArrowDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setFilters(f => ({ ...f, difficulty: "" }))}
                className={!filters.difficulty ? "font-semibold" : ""}
              >
                All Difficulties
              </DropdownMenuItem>
              {difficultyLevels.map(level => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => setFilters(f => ({ ...f, difficulty: level }))}
                  className={level === filters.difficulty ? "font-semibold" : ""}
                >
                  {level}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Input
          placeholder="🔍 Search by name or skill"
          className="ml-2 max-w-xs rounded-xl shadow-sm text-sm"
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-xl flex items-center gap-2 text-sm">
              Sort by&nbsp;{filters.sortBy === "title" ? "Name" : "Difficulty"}
              {(filters.sortDir === "asc"
                ? <ArrowDown size={15} />
                : <ArrowUp size={15} />)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, sortBy: "title" }))}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, sortBy: "difficulty" }))}>
              Difficulty
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilters(f => ({ ...f, sortDir: f.sortDir === "asc" ? "desc" : "asc" }))}
            >
              Toggle Asc/Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="ml-auto text-muted-foreground text-xs">
          {filtered.length} questions
        </span>
      </div>
      {/* Question Grid */}
      {filtered.length === 0 ? (
        <div className="text-muted-foreground px-6 py-12 text-lg text-center select-none">
          No questions match your filters.
        </div>
      ) : (
        <div
          className="grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
        >
          {filtered.map(question =>
            <DSAQuestionCard
              key={question.id}
              question={question}
              solved={!!userData.solved[question.id]}
              bookmarked={!!userData.bookmarks[question.id]}
              onSolvedToggle={() => updateSolved(question.id)}
              onBookmarkToggle={() => updateBookmark(question.id)}
            />
          )}
        </div>
      )}
    </div>
  );
}
