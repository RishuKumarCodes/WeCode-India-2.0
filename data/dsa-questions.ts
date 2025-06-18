
export type DsaQuestion = {
  id: string;
  title: string;
  domain: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
  link: string;
  tutorial?: string;
  solved: boolean;
};

export const dsaQuestions: DsaQuestion[] = [
  // Arrays
  {
    id: "q1",
    title: "Two Sum",
    domain: "Arrays",
    difficulty: "Easy",
    skills: ["HashMap", "Two Pointers"],
    link: "https://leetcode.com/problems/two-sum/",
    tutorial: "https://youtube.com/watch?v=KLlXCFG5TnA",
    solved: false,
  },
  {
    id: "q2",
    title: "Best Time to Buy and Sell Stock",
    domain: "Arrays",
    difficulty: "Easy",
    skills: ["Greedy"],
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    tutorial: "https://youtube.com/watch?v=1pkOgXD63yU",
    solved: false,
  },
  {
    id: "q3",
    title: "Maximum Subarray",
    domain: "Arrays",
    difficulty: "Medium",
    skills: ["Dynamic Programming"],
    link: "https://leetcode.com/problems/maximum-subarray/",
    tutorial: "https://youtube.com/watch?v=5WZl3MMT0Eg",
    solved: false,
  },
  {
    id: "q4",
    title: "Product of Array Except Self",
    domain: "Arrays",
    difficulty: "Medium",
    skills: ["Prefix Sum"],
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    tutorial: "",
    solved: false,
  },
  {
    id: "q5",
    title: "Trapping Rain Water",
    domain: "Arrays",
    difficulty: "Hard",
    skills: ["Two Pointers", "Dynamic Programming"],
    link: "https://leetcode.com/problems/trapping-rain-water/",
    solved: false,
  },
  // Strings
  {
    id: "q6",
    title: "Valid Anagram",
    domain: "Strings",
    difficulty: "Easy",
    skills: ["Sorting", "HashMap"],
    link: "https://leetcode.com/problems/valid-anagram/",
    tutorial: "",
    solved: false,
  },
  {
    id: "q7",
    title: "Group Anagrams",
    domain: "Strings",
    difficulty: "Medium",
    skills: ["HashMap", "Sorting"],
    link: "https://leetcode.com/problems/group-anagrams/",
    solved: false,
  },
  {
    id: "q8",
    title: "Longest Substring Without Repeating Characters",
    domain: "Strings",
    difficulty: "Medium",
    skills: ["Hash Set", "Sliding Window"],
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    solved: false,
  },
  {
    id: "q9",
    title: "Palindrome Partitioning",
    domain: "Strings",
    difficulty: "Hard",
    skills: ["Backtracking", "Dynamic Programming"],
    link: "https://leetcode.com/problems/palindrome-partitioning/",
    solved: false,
  },
  // Trees
  {
    id: "q10",
    title: "Maximum Depth of Binary Tree",
    domain: "Trees",
    difficulty: "Easy",
    skills: ["DFS", "Recursion"],
    link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    solved: false,
  },
  {
    id: "q11",
    title: "Binary Tree Level Order Traversal",
    domain: "Trees",
    difficulty: "Medium",
    skills: ["BFS", "Queue"],
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    solved: false,
  },
  {
    id: "q12",
    title: "Serialize and Deserialize Binary Tree",
    domain: "Trees",
    difficulty: "Hard",
    skills: ["DFS", "Design"],
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    solved: false,
  },
  // Dynamic Programming
  {
    id: "q13",
    title: "Climbing Stairs",
    domain: "Dynamic Programming",
    difficulty: "Easy",
    skills: ["Recursion", "DP"],
    link: "https://leetcode.com/problems/climbing-stairs/",
    solved: false,
  },
  {
    id: "q14",
    title: "Coin Change",
    domain: "Dynamic Programming",
    difficulty: "Medium",
    skills: ["Recursion", "DP"],
    link: "https://leetcode.com/problems/coin-change/",
    solved: false,
  },
  {
    id: "q15",
    title: "Edit Distance",
    domain: "Dynamic Programming",
    difficulty: "Hard",
    skills: ["Recursion", "DP"],
    link: "https://leetcode.com/problems/edit-distance/",
    solved: false,
  },
];
