"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Code2, FileText, GitBranch, Clock } from "lucide-react";
import { dsaTopics } from "../../../data/dsa-topics";
import { dsaQuestions } from "../../../data/dsa-questions";
import StructuredLearningPath from "@/components/dsa/topics/StructuredLearningPath";
export default function TopicsPage() {
  const router = useRouter();
  const [solvedProblems, setSolvedProblems] = React.useState<Set<number>>(
    new Set()
  );

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("dsa-solved");
      const parsed = JSON.parse(raw || "[]");
      const numericIds = Array.isArray(parsed)
        ? parsed.map((x: unknown) =>
            typeof x === "string" ? Number(x) : (x as number)
          )
        : [];
      setSolvedProblems(new Set<number>(numericIds));
    } catch {
      localStorage.setItem("dsa-solved", "[]");
      setSolvedProblems(new Set());
    }
  }, []);

  const getTopicProgress = (topicName: string) => {
    const topicData = dsaTopics.find((t) => t.name === topicName);
    if (!topicData) return { progress: 0, solved: 0, total: 0 };
    const topicQuestions = dsaQuestions.filter((q) =>
      topicData.domains.some((domain) => q.domain.includes(domain))
    );
    const solvedCount = topicQuestions.filter((q) =>
      solvedProblems.has(q.id)
    ).length;
    return {
      progress: topicQuestions.length
        ? Math.round((solvedCount / topicQuestions.length) * 100)
        : 0,
      solved: solvedCount,
      total: topicQuestions.length,
    };
  };

  const handleTopicClick = (name: string) =>
    router.push(`/dsa/topics/${encodeURIComponent(name)}`);
  const handleTopicDocClick = (id: string) =>
    router.push(`/dsa/topics/${encodeURIComponent(id)}`);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {dsaTopics.map((topic) => {
          const { progress, solved, total } = getTopicProgress(topic.name);
          return (
            <div
              key={topic.id}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {total} problems • {topic.timeEstimate}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    topic.difficulty === "Fundamental"
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                      : topic.difficulty === "Intermediate"
                      ? "bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700"
                      : topic.difficulty === "Advanced"
                      ? "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                      : "bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                  }`}
                >
                  {topic.difficulty}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Progress ({solved}/{total})
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                  <div
                    className="h-2 bg-gray-800 dark:bg-zinc-100 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleTopicDocClick(topic.id)}
                  className="flex-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-zinc-700 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <FileText size={14} />
                  Study
                </button>
                <button
                  onClick={() => handleTopicClick(topic.name)}
                  className="flex-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-zinc-700 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Code2 size={14} />
                  Practice
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <StructuredLearningPath />
    </div>
  );
}
