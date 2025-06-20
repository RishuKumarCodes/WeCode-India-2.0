import { Clock, GitBranch } from 'lucide-react'
import React from 'react'

function StructuredLearningPath() {
  return (
          <div className="mt-12 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <GitBranch size={24} />
          Structured Learning Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { phase: "Foundation", topics: ["Arrays", "Strings", "Hash Tables"], duration: "4-6 weeks", status: "completed", progress: 100 },
            { phase: "Linear Structures", topics: ["Linked Lists", "Stacks", "Queues"], duration: "2-3 weeks", status: "current", progress: 70 },
            { phase: "Non-linear Structures", topics: ["Trees", "Graphs", "Heaps"], duration: "6-8 weeks", status: "next", progress: 0 },
            { phase: "Advanced Algorithms", topics: ["Dynamic Programming", "Greedy", "Backtracking"], duration: "8-10 weeks", status: "locked", progress: 0 },
          ].map((phase, i) => (
            <div
              key={i}
              className={`border rounded-lg p-6 ${
                phase.status === "completed"
                  ? "border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900"
                  : phase.status === "current"
                  ? "border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900"
                  : phase.status === "next"
                  ? "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  : "border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    phase.status === "completed"
                      ? "bg-green-500 text-white dark:text-black"
                      : phase.status === "current"
                      ? "bg-blue-500 text-white dark:text-black"
                      : "bg-gray-300 dark:bg-zinc-600 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {phase.status === "completed" ? "✓" : i + 1}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {phase.topics.map((t, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 dark:bg-zinc-500 rounded-full" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {phase.duration}
                </div>
                {phase.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium">{phase.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-1.5">
                      <div
                        className="h-1.5 bg-gray-700 dark:bg-zinc-200 rounded-full"
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default StructuredLearningPath