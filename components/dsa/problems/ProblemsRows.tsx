import React from "react";
import { CheckCircle, CircleEllipsis, ExternalLink } from "lucide-react";

interface ProblemsRowsProps {
  filteredQuestions: {
    id: number;
    title: string;
    description?: string;
    difficulty: string;
    domain: string;
    leetcodeUrl?: string;
  }[];
  getDifficultyBadge: (d: string) => string;
  solvedProblems: Set<number>;
  setSolvedProblems: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export default function ProblemsRows({
  filteredQuestions,
  getDifficultyBadge,
  solvedProblems,
  setSolvedProblems,
}: ProblemsRowsProps) {
  const toggleSolved = (id: number) => {
    const updated = new Set(solvedProblems);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSolvedProblems(updated);
    localStorage.setItem(
      "dsa-solved",
      JSON.stringify(Array.from(updated))
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 border-b px-6 py-4 font-medium text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5">Problem</div>
        <div className="col-span-2 text-center">Difficulty</div>
        <div className="col-span-2 text-center">Domain</div>
        <div className="col-span-2 text-center">Status</div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-zinc-700">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <div className="col-span-1 text-center text-sm text-gray-500 dark:text-gray-400">
              {q.id}
            </div>
            <div className="col-span-5">
              <div className="flex items-center gap-2">
                <button className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 text-left">
                  {q.title}
                </button>
                {q.leetcodeUrl && (
                  <a
                    href={q.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={(e) => e.stopPropagation()}
                    title="Open in LeetCode"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              {q.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {q.description}
                </p>
              )}
            </div>
            <div className="col-span-2 text-center">
              <span className={getDifficultyBadge(q.difficulty)}>
                {q.difficulty}
              </span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {q.domain}
              </span>
            </div>
            <div className="col-span-2 text-center">
              <button
                onClick={() => toggleSolved(q.id)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                {solvedProblems.has(q.id) ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <CircleEllipsis className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No problems found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
