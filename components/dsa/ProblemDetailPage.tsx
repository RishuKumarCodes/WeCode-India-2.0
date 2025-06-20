"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, CircleEllipsis, Clock, Target, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dsaQuestions, DsaQuestion } from "../../data/dsa-questions";

interface ProblemDetailPageProps {
  problemId: number;
  onBack: () => void;
}

export default function ProblemDetailPage({ problemId, onBack }: ProblemDetailPageProps) {
  const [isSolved, setIsSolved] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set());

  const problem = dsaQuestions.find(q => q.id === problemId);

  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem("dsa-solved") || "[]");
    const solvedSet = new Set<number>(solved);
    setSolvedProblems(solvedSet);
    setIsSolved(solvedSet.has(problemId));
  }, [problemId]);

  const toggleSolved = () => {
    const newSolved = new Set(solvedProblems);
    if (newSolved.has(problemId)) {
      newSolved.delete(problemId);
      setIsSolved(false);
    } else {
      newSolved.add(problemId);
      setIsSolved(true);
    }
    setSolvedProblems(newSolved);
    localStorage.setItem("dsa-solved", JSON.stringify(Array.from(newSolved)));
  };

  if (!problem) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Problem not found.</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-50 border-green-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Hard": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Problems
        </Button>
        <div className="flex items-center gap-3">
          {problem.leetcodeUrl && (
            <Button variant="outline" asChild>
              <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Open in LeetCode
              </a>
            </Button>
          )}
          <Button
            onClick={toggleSolved}
            variant={isSolved ? "default" : "outline"}
            className={isSolved ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isSolved ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                Solved
              </>
            ) : (
              <>
                <CircleEllipsis size={16} className="mr-2" />
                Mark as Solved
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Problem Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {problem.id}. {problem.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Target size={14} />
                {problem.domain}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Description</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {problem.description}
        </p>

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">Examples</h3>
            {problem.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Input: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{example.input}</code>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Output: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{example.output}</code>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="font-medium text-gray-700">Explanation: </span>
                      <span className="text-gray-600">{example.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">Constraints</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-sm">{constraint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Solution Area */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Solution</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-32">
          <p className="text-gray-500 text-center py-8">
            This is where you would implement your solution or view editorial solutions.
          </p>
        </div>
      </div>
    </div>
  );
}