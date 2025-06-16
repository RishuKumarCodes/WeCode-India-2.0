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
  let plan: MonthPlan[] = [];

  const skill = skillLevel.toLowerCase();
  const skillKey = skill === "beginner" ? "beginner" : skill === "advanced" ? "advanced" : "intermediate";

  for (let i = 1; i <= months; i++) {
    let title = "";
    let focus = "";
    let weeks = [];

    // Custom titles for phases; adapt for longer plans, short plans, etc.
    if (months <= 2) {
      if (i === 1) {
        title = "Crash Course & Foundations";
        focus =
          "Jump straight into the most important concepts for your goal. With consistent daily effort, you'll rapidly build a solid understanding. Stay focused, pace yourself, and remember: every bit counts when learning fast!";
      } else {
        title = "Mock Assessments & Intensive Revision";
        focus =
          "Simulate real scenarios relevant to your goal. Focus on practice tests, project sprints, or interview simulations. Review weak spots and reflect — you're almost ready to take on your challenge!";
      }
    } else {
      if (i === 1) {
        title =
          skill === "beginner"
            ? "Starting Strong: Building Core Foundations"
            : "Month 1: Foundations Refreshed";
        focus =
          skill === "beginner"
            ? "Begin with the fundamental topics. Develop core concepts and build confidence with easy wins. Focus on establishing consistent learning habits—and celebrate your momentum!"
            : "Refresh and solidify your core skills to ensure you start on strong footing. Tackle fundamentals with sharper focus and brush up any rusty areas. This puts you in prime position for advanced topics ahead.";
      } else if (i === months) {
        title = "Final Preparation & Confidence Boost";
        focus =
          "This month, focus on targeted revision and simulate real challenges (mock tests, interviews, presentations, etc.). Reflect on your journey, address last-minute doubts, and trust your preparation as you step up for your goal!";
      } else if (i === months - 1 && months > 3) {
        title = "Mock Assessments & Real-World Practice";
        focus =
          "Take mock interviews, practice timed assessments, or build a capstone project relevant to your goal/target company. Use feedback to fine-tune your preparation. Apply your skills in realistic settings!";
      } else if (i <= Math.ceil(months * 0.4)) {
        title = "Core Concepts Deep Dive";
        focus =
          "Dedicate this phase to mastering essential topics. Progressively tackle harder problems or projects, and measure your growth. Stay curious, and don't hesitate to revisit the basics for greater clarity.";
      } else if (i <= Math.ceil(months * 0.7)) {
        title =
          skill === "beginner"
            ? "Building Experience & Confidence"
            : "Advanced Applications & Competitive Prep";
        focus =
          skill === "beginner"
            ? "Explore intermediate concepts. Work on small projects or start regular practices that reinforce your understanding. Your grasp is improving—keep going!"
            : "Push into advanced problems, case studies, or leadership-level scenarios. Connect concepts, try competitive challenges, and keep your vision set on your targets.";
      } else {
        title =
          months >= 4
            ? "Revision & Targeted Practice"
            : "Focused Revision and Simulations";
        focus =
          "Review all you've covered so far. Identify and address weaknesses. Simulate tests or interviews. This phase is about confidence, clarity, and trusting your hard work!";
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
    skill_level,
    months,
    daily_hours,
    target_companies_or_roles,
  }: RoadmapInput,
  monthPlans: MonthPlan[]
) {
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

  // Format skill for lookup
  const skillKey =
    skill_level.toLowerCase() === "beginner"
      ? "beginner"
      : skill_level.toLowerCase() === "advanced"
      ? "advanced"
      : "intermediate";

  return monthPlans.map((month, mIdx) => {
    const weekly = [];

    for (let w = 0; w < weeksPerMonth; w++) {
      // Use more up-to-date, actionable titles
      let weekLabel = "";
      let weekTitle = "";
      let weekDesc = "";
      let tasks: string[] = [];
      let weekResources: { name: string; url: string }[] = [];

      // Week titles logic that is goal-focused and progressive
      weekLabel = `Week ${w + 1}: ${planBySkill[skillKey][w % 4]}`;
      weekTitle = weekLabel; // Set weekTitle to the same value as weekLabel

      // Goal-tailored, measurable description
      if (w === 0) {
        weekDesc = `Kick off with an overview of ${goal}. Research the latest trends for 2025 using trusted sources. Write down your current understanding and define your weekly outcome—this lays your groundwork.`;
        tasks = [
          `Read/watch: "Introduction to ${goal}" (look for 2024–2025 content).`,
          `Write a 2-paragraph note: "Why ${goal} matters in 2025 & my career."`,
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
          target_companies_or_roles && target_companies_or_roles.length > 0
            ? `Assess your current level with mock tests or past ${target_companies_or_roles} interview questions. Stretch goal: Identify one new competency to tackle next month.`
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
            url: resources[0].link + encodeURIComponent(`${goal} roadmap 2025`),
          },
          {
            name: "Coursera - trending module",
            url: resources[3].link + encodeURIComponent(goal),
          },
        ];
      } else if (w === 1) {
        weekResources = [
          {
            name: "LeetCode (targeted problems)",
            url:
              resources[1].link +
              encodeURIComponent(goal.toLowerCase().replace(/\s/g, "-")),
          },
          {
            name: "GeeksforGeeks",
            url:
              resources[2].link +
              "tag/" +
              encodeURIComponent(goal.toLowerCase().replace(/\s/g, "-")),
          },
        ];
      } else if (w === 2) {
        weekResources = [
          {
            name: "freeCodeCamp Project Tutorials",
            url: resources[6].link,
          },
          {
            name: "CS50 (project ideas)",
            url: resources[4].link,
          },
        ];
      } else {
        weekResources = [
          {
            name: "Khan Academy (revision/extra practice)",
            url: resources[5].link + encodeURIComponent(goal),
          },
          {
            name: "Educative.io Interview Prep",
            url: resources[7].link + encodeURIComponent(goal),
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