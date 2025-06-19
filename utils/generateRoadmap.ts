import { MonthPlan, RoadmapInput } from "@/types/roadmapTypes";

const planBySkill = {
  beginner: [
    "Foundational Concepts",
    "Practice and Apply Basics",
    "Mini Project / Real Example",
    "Progress Review & Stretch Goal",
  ],
  intermediate: [
    "Strengthen Core & New Concepts",
    "Collaborative Challenges / Pair Coding",
    "Real-World Project Sprint",
    "Assessment and Knowledge Gaps",
  ],
  advanced: [
    "Leadership in Projects / Mentoring",
    "Competitive / Advanced Problems",
    "Capstone Project Sprint",
    "Mock Interviews & Deep Dives",
  ],
} as const;

export function generateMonthWisePlan(
  goal: string,
  skillLevel: string,
  months: number
): MonthPlan[] {
  if (!goal || !skillLevel || !months) {
    throw new Error('Missing required parameters: goal, skillLevel, and months are required');
  }

  let plan: MonthPlan[] = [];

  // Ensure skillLevel is a string and convert to lowercase
  const skill = String(skillLevel).toLowerCase();
  const skillKey = skill === "beginner" ? "beginner" : skill === "advanced" ? "advanced" : "intermediate";

  for (let i = 1; i <= months; i++) {
    const weeks = [];
    let title = "";
    let focus = "";

    // Generate title and focus based on skill level and month
    if (skillKey === "beginner") {
      if (i === 1) {
        title = "Getting Started";
        focus = `Introduction to ${goal} fundamentals and basic concepts.`;
      } else if (i === 2) {
        title = "Building Foundations";
        focus = `Deep dive into core ${goal} concepts and practical applications.`;
      } else if (i === 3) {
        title = "Practical Application";
        focus = `Hands-on projects and real-world examples in ${goal}.`;
      } else {
        title = "Progress and Growth";
        focus = `Review, assessment, and preparation for intermediate level.`;
      }
    } else if (skillKey === "intermediate") {
      if (i === 1) {
        title = "Advanced Concepts";
        focus = `Exploring advanced ${goal} concepts and techniques.`;
      } else if (i === 2) {
        title = "Collaborative Learning";
        focus = `Team projects and pair programming in ${goal}.`;
      } else if (i === 3) {
        title = "Real-World Projects";
        focus = `Building complex applications and solving real problems.`;
      } else {
        title = "Skill Assessment";
        focus = `Evaluating progress and identifying areas for improvement.`;
      }
    } else {
      if (i === 1) {
        title = "Expert Leadership";
        focus = `Mentoring and leading ${goal} projects.`;
      } else if (i === 2) {
        title = "Advanced Challenges";
        focus = `Solving complex problems and competitive challenges.`;
      } else if (i === 3) {
        title = "Capstone Project";
        focus = `Building a comprehensive ${goal} project.`;
      } else {
        title = "Professional Preparation";
        focus = `Interview preparation and deep technical dives.`;
      }
    }

    // Generate weekly data
    for (let w = 0; w < 4; w++) {
      weeks.push({
        week: w + 1,
        weekTitle: `Week ${w + 1}`,
        weekLabel: `Week ${w + 1}: ${planBySkill[skillKey][w % 4]}`,
        tasks: [
          `Task 1 for Week ${w + 1}`,
          `Task 2 for Week ${w + 1}`,
          `Task 3 for Week ${w + 1}`
        ],
        weekResources: [
          {
            name: "Resource 1",
            url: "#"
          },
          {
            name: "Resource 2",
            url: "#"
          }
        ]
      });
    }

    plan.push({
      month: i,
      title,
      focus,
      weeks
    });
  }

  return plan;
}

// --- Improved helper to generate weekly breakdown with up-to-date, specific tasks/resources ---
export function generateWeeklyBreakdown(
  {
    goal,
    skillLevel,
    months,
    dailyHours,
    targetCompaniesOrRoles,
  }: RoadmapInput,
  monthPlans: MonthPlan[]
) {
  if (!goal || !skillLevel || !months || !dailyHours) {
    throw new Error('Missing required parameters in RoadmapInput');
  }

  // Fully up-to-date resource platforms
  const resources = [
    {
      name: "YouTube (2025)",
      link: "https://www.youtube.com/results?search_query=",
    },
    {
      name: "LeetCode (2025)",
      link: "https://leetcode.com/problemset/all/?filters=",
    },
    {
      name: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/",
    },
    {
      name: "Coursera",
      link: "https://www.coursera.org/search?query=",
    },
    {
      name: "CS50 (Harvard Online)",
      link: "https://cs50.harvard.edu/online/",
    },
    {
      name: "Khan Academy",
      link: "https://www.khanacademy.org/search?page_search_query=",
    },
    {
      name: "freeCodeCamp",
      link: "https://www.freecodecamp.org/learn/",
    },
    {
      name: "Educative.io",
      link: "https://www.educative.io/search?searchTerm=",
    },
    {
      name: "InterviewBit",
      link: "https://www.interviewbit.com/courses/?q=",
    },
  ];

  // 4 weeks per month to mirror practical learning cycles
  const weeksPerMonth = 4;

  return monthPlans.map((month) => {
    const weekly = [];

    for (let w = 0; w < weeksPerMonth; w++) {
      // Use more up-to-date, actionable titles
      let weekLabel = "";
      let weekTitle = "";
      let weekDesc = "";
      let tasks: string[] = [];
      let weekResources: { name: string; url: string }[] = [];

      // Week titles logic that is goal-focused and progressive
      weekLabel = `Week ${w + 1}: ${planBySkill[skillLevel.toLowerCase() as keyof typeof planBySkill][w % 4]}`;
      weekTitle = weekLabel; // Set weekTitle to the same value as weekLabel

      // Goal-tailored, measurable description
      if (w === 0) {
        weekDesc = `Start with fundamental concepts and basic theory. Complete introductory tutorials and set up your development environment.`;
        tasks = [
          `Watch 2-3 introductory videos on ${goal}.`,
          `Complete the setup guide and run your first example.`,
        ];
      } else if (w === 1) {
        weekDesc = `Deep dive into main topics and start hands-on practice. Attempt curated problems or code samples. Collaborate via Discord, Slack, or online forums for peer support.`;
        tasks = [
          `Solve 5+ new problems on ${goal} using LeetCode (2025) or InterviewBit.`,
          `Share a solution or tip in an online community or study group.`,
        ];
      } else if (w === 2) {
        weekDesc = `Apply what you learned to a small-scale project or real-world challenge. Document your process in a digital journal or GitHub repo.`;
        tasks = [
          `Build or extend a mini-project in ${goal}.`,
          `Document and version your code on GitHub—share progress.`,
        ];
      } else {
        weekDesc =
          targetCompaniesOrRoles && targetCompaniesOrRoles.length > 0
            ? `Assess your current level with mock tests or past ${targetCompaniesOrRoles} interview questions. Stretch goal: Identify one new competency to tackle next month.`
            : `Assess your progress with a timed challenge or peer review. Set 1–2 stretch goals for the coming month and reflect on what's working.`;
        tasks = [
          `Attempt a mock test, quiz, or company-specific problem set.`,
          `Update your roadmap for next month: keep what works, revise what's not helping.`,
        ];
      }

      // Use industry-leading (as of 2025) resource links—avoid old tutorials!
      if (w === 0) {
        weekResources = [
          {
            name: "YouTube (latest lectures)",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${goal} roadmap 2025`)}`,
          },
          {
            name: "Coursera - trending module",
            url: `https://www.coursera.org/search?query=${encodeURIComponent(goal)}`,
          },
        ];
      } else if (w === 1) {
        weekResources = [
          {
            name: "LeetCode (targeted problems)",
            url: `https://leetcode.com/tag/${encodeURIComponent(goal.toLowerCase().replace(/\s/g, "-"))}`,
          },
          {
            name: "GeeksforGeeks",
            url: `https://www.geeksforgeeks.org/tag/${encodeURIComponent(goal.toLowerCase().replace(/\s/g, "-"))}`,
          },
        ];
      } else if (w === 2) {
        weekResources = [
          {
            name: "freeCodeCamp Project Tutorials",
            url: "https://www.freecodecamp.org/learn/",
          },
          {
            name: "CS50 (project ideas)",
            url: "https://cs50.harvard.edu/x/2025/",
          },
        ];
      } else {
        weekResources = [
          {
            name: "Khan Academy (revision/extra practice)",
            url: `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(goal)}`,
          },
          {
            name: "Educative.io Interview Prep",
            url: `https://www.educative.io/search?q=${encodeURIComponent(goal)}`,
          },
        ];
      }

      weekly.push({
        week: w + 1,
        weekTitle: weekLabel,
        weekDesc,
        tasks,
        weekResources,
      });
    }
    return {
      month: month.month,
      monthTitle: month.title,
      weekly,
    };
  });
}