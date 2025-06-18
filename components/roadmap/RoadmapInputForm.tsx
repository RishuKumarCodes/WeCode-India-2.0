"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import { generateRoadmapPdfHtml } from "@/utils/roadmapPdf";
// import html2pdf from "html2pdf.js";
import Loader from "@/components/Loader";
import {
  generateMonthWisePlan,
  generateWeeklyBreakdown,
} from "@/utils/generateRoadmap";
import { MonthPlan, RoadmapInput } from "@/types/roadmapTypes";
import RoadmapFlow from "@/components/pages/RoadmapFlow";

// interface RoadmapInputFormProps {
//   onRoadmapGenerated: (roadmap: RoadmapInput) => void;
// }

const initialState = {
  goal: "",
  skill_level: "",
  months: "",
  daily_hours: "",
  target_companies_or_roles: "",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function RoadmapInputForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [showPlan, setShowPlan] = useState(false);
  const [roadmapInput, setRoadmapInput] = useState<RoadmapInput | null>(null);
  const [showStep2, setShowStep2] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showTaskTracker, setShowTaskTracker] = useState(false);

  // Check for saved roadmap on mount
  // useEffect(() => {
  //   const savedRoadmap = localStorage.getItem('currentRoadmap');
  //   if (savedRoadmap) {
  //     try {
  //       const parsedRoadmap = JSON.parse(savedRoadmap);
  //       setRoadmapInput(parsedRoadmap);
  //       setShowPlan(true);
  //       setShowStep3(true);
  //     } catch (error) {
  //       console.error('Error parsing saved roadmap:', error);
  //     }
  //   }
  // }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSkillLevelChange = (newValue: string) => {
    setValues((prev) => ({
      ...prev,
      skill_level: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { goal, skill_level, months, daily_hours } = values;

    // Validate required fields
    if (!goal?.trim() || !skill_level || !months || !daily_hours) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate numeric fields
    const monthsNum = Number(months);
    const hoursNum = Number(daily_hours);
    
    if (isNaN(monthsNum) || monthsNum < 1 || monthsNum > 24) {
      toast({
        title: "Invalid duration",
        description: "Please enter a valid number of months (1-24)",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (isNaN(hoursNum) || hoursNum < 1 || hoursNum > 16) {
      toast({
        title: "Invalid hours",
        description: "Please enter a valid number of daily hours (1-16)",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const insertData = {
      goal: goal.trim(),
      skillLevel: skill_level,
      months: monthsNum,
      dailyHours: hoursNum,
      targetCompaniesOrRoles: values.target_companies_or_roles?.trim() || null,
    };

    try {
      console.log('Submitting data:', insertData);
      const res = await fetch("/api/submit-user-roadmap-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(insertData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit roadmap");
      }

      const data = await res.json();
      toast({ title: "Success!", description: "Your roadmap has been created." });
      setGenerating(true);
      setTimeout(() => {
        setRoadmapInput({
          goal,
          skillLevel: skill_level,
          months: Number(months),
          dailyHours: Number(daily_hours),
          targetCompaniesOrRoles: values.target_companies_or_roles || "",
        });
        setShowPlan(true);
        setGenerating(false);
        // Redirect to the view page with the roadmap ID
      router.push(`/roadmap/view?id=${data.id}`);
      }, 8000);
      
      
    } catch (error: any) {
      toast({
        title: "Failed to submit",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Add handler for roadmap PDF download ---
  // const handleDownloadPdf = (
  //   {
  //     goal,
  //     skill_level,
  //     months,
  //     daily_hours,
  //     target_companies_or_roles,
  //   }: RoadmapInput,
  //   plan: MonthPlan[],
  //   weeklyPlan: any,
  //   capstones: any,
  //   mockSection: any,
  //   revisionSection: any
  // ) => {
  //   const todayStr = new Date().toLocaleDateString();
  //   const html = generateRoadmapPdfHtml({
  //     userName: values.user_name,
  //     userGoal: goal,
  //     skillLevel: skill_level,
  //     months,
  //     dailyHours: daily_hours,
  //     date: todayStr,
  //     monthPlan: plan,
  //     weeklyPlan,
  //     capstones,
  //     mockSection,
  //     revisionSection,
  //     targetCompaniesOrRoles: target_companies_or_roles || "",
  //   });

  //   html2pdf()
  //     .from(html)
  //     .set({
  //       margin: [15, 15, 15, 15],
  //       filename: "My_AI_Personalized_Roadmap.pdf",
  //       html2canvas: { scale: 2, useCORS: true },
  //       jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  //     })
  //     .save();
  // };

  if (generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Create Your Learning Roadmap
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Tell us about your goals and we'll create a personalized learning
              path tailored just for you.
            </p>
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  if (showPlan && roadmapInput) {
    const {
      goal,
      skillLevel,
      months,
      dailyHours,
      targetCompaniesOrRoles,
    } = roadmapInput;
    const plan = generateMonthWisePlan(goal, skillLevel, months);
    const weeklyPlan = generateWeeklyBreakdown(roadmapInput, plan);

    // Capstone, Mock, Revision logic (same as before)
    const isBeginner = skillLevel.toLowerCase() === "beginner";
    const isIntermediate = skillLevel.toLowerCase() === "intermediate";
    const isAdvanced = skillLevel.toLowerCase() === "advanced";
    // Use a safe goal string for platforms
    const goalSlug = goal.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // 1. Final Capstone
    let capstones: { title: string; desc: string; actions: string[] }[] = [];
    if (/data\s*science|machine\s*learning|ai|ml/i.test(goal)) {
      capstones.push(
        isBeginner
          ? {
              title: "ML Project: End-to-End Regression or Classification",
              desc: "Build and evaluate a simple predictive model (e.g., house prices, titanic) using scikit-learn or TensorFlow. Deploy via HuggingFace Spaces or Streamlit Share.",
              actions: [
                "Upload code to GitHub with README instructions.",
                "Share results/visualizations in a blog or LinkedIn post.",
              ],
            }
          : {
              title: "Full-Stack ML Pipeline/Novel AI App",
              desc: "Collect or use open datasets, engineer features, train/finetune models, and deploy as a live API or web app (FastAPI, Streamlit, Gradio). Optionally, experiment with an LLM or generative AI model and document learnings.",
              actions: [
                "Host a demo, document model evaluation, and share with peers.",
                "Prepare a technical report and publish portfolio/project page.",
              ],
            }
      );
    } else if (
      /web\s*dev|frontend|backend|full|mern|react|next\.js|javascript|typescript/i.test(
        goal
      )
    ) {
      capstones.push(
        isBeginner
          ? {
              title: "Personal Portfolio or Blog Website (React/Next.js)",
              desc: "Build and deploy a styled personal site that includes about, projects, and contact form. Use modern CSS, responsive design, and host on Vercel/Netlify.",
              actions: [
                "Add at least 3 projects (real or practice) to showcase.",
                "Write a reflection/learners log on what you built.",
              ],
            }
          : {
              title: "Full-Stack SaaS Dashboard or Custom App",
              desc: "Design and implement a real product—user authentication, database (Supabase, PostgreSQL), clean API endpoints, responsive and accessible frontend (React + shadcn/ui/Tailwind). Optional: Add CI/CD and tests.",
              actions: [
                "Deploy app (Vercel/Render), share GitHub repo with README.",
                "Request code review from a mentor or peer for feedback.",
              ],
            }
      );
    } else if (
      /coding\s*interview|dsa|leetcode|programming|competitive/i.test(goal)
    ) {
      capstones.push(
        isBeginner
          ? {
              title: "DSA Problem Solving Marathon",
              desc: "Aim to solve 60–80 core questions from LeetCode ('Blind 75'), InterviewBit, or GFG DSA Sheet. Review each after solving and note key patterns.",
              actions: [
                "Maintain a tracker spreadsheet or GitHub gist of topics/solutions.",
                "Write summary notes for each DSA topic (arrays, trees, DP, etc).",
              ],
            }
          : {
              title: "Challenge: 150+ LeetCode + 2 Live Coding Contests",
              desc: "Aggressively target mixed-difficulty questions, complete live virtual contests (LeetCode or Codeforces), and analyze leaderboard performance.",
              actions: [
                "Publish a blog post sharing your top 5 takeaways.",
                "Attempt re-solving 10 hardest questions with 1-week gap.",
              ],
            }
      );
    } else {
      // Catch-all fallback
      capstones.push({
        title: "Capstone Project or Real-World Challenge",
        desc: "Select a practical deliverable that matches your goal: e.g., research a new framework/technology, build a mini SaaS, publish an essay, or contribute to open-source. Ensure the outcome is public and demonstrable.",
        actions: ["Share your work on GitHub and present to a peer/mentor."],
      });
    }

    // 2. Mock Interview/Assessment Platforms suggestion
    let mockSection: {
      desc: string;
      recs: { platform: string; url: string; details: string }[];
      schedule: string;
    };
    if (/coding\s*interview|dsa|leetcode|competitive/i.test(goal)) {
      // Interview/DSA prep
      mockSection = {
        desc: "Ace interviews with structured mock tests. Use these trusted platforms for timed assessments and feedback.",
        recs: [
          {
            platform: "LeetCode Mock Interviews",
            url: "https://leetcode.com/interview/",
            details:
              "Simulate real company interviews and timed tests (LeetCode Premium optional).",
          },
          {
            platform: "Pramp",
            url: "https://www.pramp.com/",
            details: "Free peer-to-peer interview practice with live feedback.",
          },
          {
            platform: "InterviewBit",
            url: "https://www.interviewbit.com/courses/interview-preparation/",
            details: "Curated question sets and company-wise mocks.",
          },
        ],
        schedule:
          "Attempt 2–3 timed mocks per week and review mistakes after each session.",
      };
    } else if (
      /gate|exam|test|upsc|gre|toefl|ielts/i.test(
        goal + (roadmapInput?.targetCompaniesOrRoles ?? "")
      )
    ) {
      mockSection = {
        desc: "Practice with up-to-date mock tests for your exam/goal, simulating real exam conditions every week.",
        recs: [
          {
            platform: "GFG Test Series",
            url: "https://practice.geeksforgeeks.org/mock-test-series",
            details:
              "Topic-wise and full-length GATE/CS tests. Review solutions in detail.",
          },
          {
            platform: "Eduncle",
            url: "https://www.eduncle.com/exams/gate/mock-test",
            details:
              "Free GATE/CS/Subject-wise mock tests, explanations included.",
          },
        ],
        schedule:
          "Schedule one full-length mock every weekend, and one topic-wise mock mid-week.",
      };
    } else if (/web|full|frontend|backend|mern|react/i.test(goal)) {
      mockSection = {
        desc: "Sharpen practical & interview skills: test with coding challenge platforms and practice system design rounds.",
        recs: [
          {
            platform: "Frontend Mentor",
            url: "https://www.frontendmentor.io/challenges",
            details: "UI challenge contests to build and review real designs.",
          },
          {
            platform: "Dev Challenges",
            url: "https://devchallenges.io/challenges",
            details: "Full-stack, backend, and React challenge platform.",
          },
          {
            platform: "Excalidraw Interview Kit",
            url: "https://excalidraw.com/#system-design",
            details: "Practice drawing system design diagrams on whiteboard.",
          },
        ],
        schedule:
          "Complete two coding/UI challenges and one system design round simulation per week.",
      };
    } else {
      // General or custom goal
      mockSection = {
        desc: "Practice real-world assessment relevant to your goal (presentation, demo, written paper, etc). Consider peer or mentor feedback.",
        recs: [
          {
            platform: "YouTube Peer Review",
            url: "https://www.youtube.com/results?search_query=mock+interview+2025",
            details: "Watch current mock interviews and note strategies.",
          },
          {
            platform: "LinkedIn Events",
            url: "https://www.linkedin.com/events/search/?keywords=mock%20interview",
            details: "Find/participate in group peer review events.",
          },
        ],
        schedule: "Present or submit your work once/week for critique.",
      };
    }

    // 3. Revision & Optimization Phase
    const revisionSection = {
      tips: [
        "List out all topics (from your month/weekly plans) and categorize as 'strong', 'weak', 'needs review'.",
        "Dedicate last 1–2 weeks to focused revision, prioritizing your weak topics.",
        "Use digital/physical flashcards (e.g., Anki, Quizlet) for formulas, patterns, or code snippets.",
        "Redraw mind maps or summary diagrams for each subject area.",
        "Keep a 'Mistakes & Insights' journal—write one learning every session.",
        "Schedule a 'final reflection' session to review your progress, update your resume/portfolio, and plan next steps.",
      ],
    };

    return (
      <RoadmapFlow roadmapInput={roadmapInput} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Create Your Learning Roadmap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Tell us about your goals and we'll create a personalized learning
            path tailored just for you.
          </p>
        </div>

        {/* Form Container */}
        <form
          className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="p-8 sm:p-10 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Learning Goals
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Tell us about your learning objectives
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="goal"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    What do you want to learn?
                    <span className="text-red-500 ml-1" aria-label="required">
                      *
                    </span>
                  </label>
                  <Textarea
                    id="goal"
                    name="goal"
                    value={values.goal}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    placeholder="e.g., Web Development, Data Science, Machine Learning"
                    className="min-h-[120px] px-4 py-3 text-base border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 dark:focus:ring-offset-gray-900
                    transition-all duration-200 ease-in-out placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="skill_level"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Skill Level
                    <span className="text-red-500 ml-1" aria-label="required">
                      *
                    </span>
                  </label>
                  <Select
                    value={values.skill_level}
                    onValueChange={handleSkillLevelChange}
                    required
                  >
                    <SelectTrigger
                      id="skill_level"
                      name="skill_level"
                      className="w-full h-12 px-4 text-base border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 dark:focus:ring-offset-gray-900
                      transition-all duration-200 ease-in-out"
                      aria-required="true"
                    >
                      <SelectValue placeholder="Choose your current level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 dark:border-gray-700">
                      <SelectItem value="Beginner" className="text-base py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Beginner - Just starting out
                        </div>
                      </SelectItem>
                      <SelectItem value="Intermediate" className="text-base py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Intermediate - Have some experience
                        </div>
                      </SelectItem>
                      <SelectItem value="Advanced" className="text-base py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Advanced - Experienced practitioner
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Time Commitment Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Time Commitment
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Help us plan your learning schedule
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="months"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration (Months)
                    <span className="text-red-500 ml-1" aria-label="required">
                      *
                    </span>
                  </label>
                  <Input
                    id="months"
                    name="months"
                    type="number"
                    min={1}
                    max={24}
                    value={values.months}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    placeholder="6"
                    className="h-12 px-4 text-base border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 dark:focus:ring-offset-gray-900
                    transition-all duration-200 ease-in-out placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="daily_hours"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Daily Hours
                    <span className="text-red-500 ml-1" aria-label="required">
                      *
                    </span>
                  </label>
                  <Input
                    id="daily_hours"
                    name="daily_hours"
                    type="number"
                    min={1}
                    max={16}
                    value={values.daily_hours}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    placeholder="2"
                    className="h-12 px-4 text-base border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 dark:focus:ring-offset-gray-900
                    transition-all duration-200 ease-in-out placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Target Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Target Destination
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Where do you want to end up? (Optional)
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="target_companies_or_roles"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Target Companies, Exams, or Roles
                  <span className="text-gray-400 ml-1 text-xs">(Optional)</span>
                </label>
                <Input
                  id="target_companies_or_roles"
                  name="target_companies_or_roles"
                  value={values.target_companies_or_roles}
                  onChange={handleChange}
                  placeholder="e.g. Google, Microsoft, UPSC, Data Scientist at Netflix..."
                  className="h-12 px-4 text-base border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 dark:focus:ring-offset-gray-900
                  transition-all duration-200 ease-in-out placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 px-8 sm:px-10 py-6 border-t border-gray-100 dark:border-gray-800">
            <Button
              type="submit"
              disabled={loading || generating}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
              transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              {loading || generating ? (
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Your Roadmap...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate My Learning Roadmap
                </div>
              )}
            </Button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              By submitting, you agree to receive personalized learning
              recommendations
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}