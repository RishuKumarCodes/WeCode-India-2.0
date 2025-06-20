"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  atomLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Target,
  CheckCircle,
  ExternalLink,
  TrendingUp,
  Zap,
  Code,
  Database,
  Award,
  Timer,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { dsaTopics } from "../../../../data/dsa-topics";
import { dsaQuestions } from "../../../../data/dsa-questions";

export default function TopicDocumentationPage() {
  const { id: topicId } = useParams();
  const router = useRouter();
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set());
  // State to track dark mode via prefers-color-scheme
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load solved problems (stubbed here; in real app use localStorage or API)
    const solved: number[] = []; // JSON.parse(localStorage.getItem("dsa-solved") || "[]");
    setSolvedProblems(new Set(solved));
  }, []);

  useEffect(() => {
    // Detect dark mode via prefers-color-scheme
    if (typeof window !== "undefined" && window.matchMedia) {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
      };
      setIsDark(mql.matches);
      mql.addEventListener?.("change", handleChange);
      return () => {
        mql.removeEventListener?.("change", handleChange);
      };
    }
  }, []);

  // Create a custom dark style by overriding atomDark's background to pure black
  const customDarkStyle = {
    ...atomDark,
    "code[class*=\"language-\"]": {
      ...((atomDark as any)["code[class*=\"language-\"]"] || {}),
      background: "#0a0a0a", // Pure black with slight variation
    },
    "pre[class*=\"language-\"]": {
      ...((atomDark as any)["pre[class*=\"language-\"]"] || {}),
      background: "#0a0a0a", // Pure black with slight variation
    },
  };

  const topic = dsaTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
              <BookOpen size={32} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Topic Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The requested topic could not be found.
            </p>
            <Button onClick={() => router.back()} variant="outline" className="dark:border-gray-800 dark:hover:bg-gray-900">
              <ArrowLeft size={16} className="mr-2" />
              Back to Topics
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const practiceProblems = dsaQuestions.filter((q) =>
    topic.practiceProblems.includes(q.id)
  );
  const solvedCount = practiceProblems.filter((p) =>
    solvedProblems.has(p.id)
  ).length;
  const progress =
    practiceProblems.length > 0
      ? Math.round((solvedCount / practiceProblems.length) * 100)
      : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fundamental":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900";
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900";
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900";
      case "Expert":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-900";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const getProblemDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900";
      case "Hard":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px]">
        {/* Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-900 transition-all duration-200"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Topics
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6 lg:space-y-8">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge
                      variant="outline"
                      className={`px-4 py-2 text-sm font-semibold rounded-full ${getDifficultyColor(
                        topic.difficulty
                      )}`}
                    >
                      {topic.difficulty}
                    </Badge>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span className="text-sm font-medium">
                        {topic.timeEstimate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Target size={16} />
                      <span className="text-sm font-medium">
                        {topic.domains.join(", ")}
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {topic.name}
                  </h1>
                </div>

                {/* Progress Bar */}
                {practiceProblems.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Practice Progress
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {solvedCount}/{practiceProblems.length} problems solved (
                        {progress}%)
                      </span>
                    </div>
                    <Progress value={progress} className="h-3 bg-gray-100 dark:bg-gray-900" />
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-gray dark:prose-invert max-w-none prose-lg [&>*]:mb-4 [&>ul]:ml-6 [&>ol]:ml-6 [&>li]:mt-1 [&>li]:mb-1 [&>h3]:pl-2 [&>h4]:pl-4 [&>p]:text-justify [&>p]:leading-relaxed">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={isDark ? customDarkStyle : atomLight}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-xl overflow-hidden shadow-sm"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      table({ children }) {
                        return (
                          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                              {children}
                            </table>
                          </div>
                        );
                      },
                      th({ children }) {
                        return (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900">
                            {children}
                          </th>
                        );
                      },
                      td({ children }) {
                        return (
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
                            {children}
                          </td>
                        );
                      },
                    }}
                  >
                    {topic.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Key Concepts */}
            <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-900">
                    <BookOpen
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  Key Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topic.concepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {concept}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Points */}
            <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-900">
                    <CheckCircle
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  Important Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topic.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Patterns */}
            <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-900">
                    <Layers
                      size={20}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  Common Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topic.commonPatterns.map((pattern, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-900 hover:bg-purple-100 dark:hover:bg-purple-900 hover:shadow-md transition-all duration-200 cursor-default"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {pattern}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practice Problems */}
            {practiceProblems.length > 0 && (
              <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-900">
                      <Code
                        size={20}
                        className="text-orange-600 dark:text-orange-400"
                      />
                    </div>
                    Practice Problems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {practiceProblems.map((problem) => (
                      <div
                        key={problem.id}
                        className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-900"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <button
                                onClick={() =>
                                  router.push(`/dsa/problems/${problem.id}`)
                                }
                                className="font-semibold text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left group-hover:text-blue-600 dark:group-hover:text-blue-400"
                              >
                                {problem.title}
                              </button>
                              <Badge
                                className={`${getProblemDifficultyColor(
                                  problem.difficulty
                                )} border rounded-full text-xs`}
                              >
                                {problem.difficulty}
                              </Badge>
                              {solvedProblems.has(problem.id) && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle
                                    size={16}
                                    className="text-green-500"
                                  />
                                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                    Solved
                                  </span>
                                </div>
                              )}
                            </div>
                            {problem.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {problem.description}
                              </p>
                            )}
                          </div>
                          {problem.leetcodeUrl && (
                            <a
                              href={problem.leetcodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                              title="Open in LeetCode"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Complexity Analysis */}
            {(topic.timeComplexity || topic.spaceComplexity) && (
              <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                    Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topic.timeComplexity && (
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer
                          size={16}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          Time
                        </h4>
                      </div>
                      <code className="text-sm font-mono text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
                        {topic.timeComplexity}
                      </code>
                    </div>
                  )}
                  {topic.spaceComplexity && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900">
                      <div className="flex items-center gap-2 mb-2">
                        <Database
                          size={16}
                          className="text-green-600 dark:text-green-400"
                        />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          Space
                        </h4>
                      </div>
                      <code className="text-sm font-mono text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-lg">
                        {topic.spaceComplexity}
                      </code>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award
                    size={18}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Concepts
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {topic.concepts.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Key Points
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {topic.keyPoints.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Patterns
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {topic.commonPatterns.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Problems
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {practiceProblems.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg text-orange-800 dark:text-orange-300">
                  <Zap size={18} />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-orange-700 dark:text-orange-300">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Practice problems in increasing difficulty order</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Understand the underlying patterns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Time yourself when solving problems</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Review and optimize your solutions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}