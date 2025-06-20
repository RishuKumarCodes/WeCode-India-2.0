
// export type DsaQuestion = {
//   id: string;
//   title: string;
//   domain: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   skills: string[];
//   link: string;
//   tutorial?: string;
//   solved: boolean;
// };

// export const dsaQuestions: DsaQuestion[] = [
//   // Arrays
//   {
//     id: "q1",
//     title: "Two Sum",
//     domain: "Arrays",
//     difficulty: "Easy",
//     skills: ["HashMap", "Two Pointers"],
//     link: "https://leetcode.com/problems/two-sum/",
//     tutorial: "https://youtube.com/watch?v=KLlXCFG5TnA",
//     solved: false,
//   },
//   {
//     id: "q2",
//     title: "Best Time to Buy and Sell Stock",
//     domain: "Arrays",
//     difficulty: "Easy",
//     skills: ["Greedy"],
//     link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
//     tutorial: "https://youtube.com/watch?v=1pkOgXD63yU",
//     solved: false,
//   },
//   {
//     id: "q3",
//     title: "Maximum Subarray",
//     domain: "Arrays",
//     difficulty: "Medium",
//     skills: ["Dynamic Programming"],
//     link: "https://leetcode.com/problems/maximum-subarray/",
//     tutorial: "https://youtube.com/watch?v=5WZl3MMT0Eg",
//     solved: false,
//   },
//   {
//     id: "q4",
//     title: "Product of Array Except Self",
//     domain: "Arrays",
//     difficulty: "Medium",
//     skills: ["Prefix Sum"],
//     link: "https://leetcode.com/problems/product-of-array-except-self/",
//     tutorial: "",
//     solved: false,
//   },
//   {
//     id: "q5",
//     title: "Trapping Rain Water",
//     domain: "Arrays",
//     difficulty: "Hard",
//     skills: ["Two Pointers", "Dynamic Programming"],
//     link: "https://leetcode.com/problems/trapping-rain-water/",
//     solved: false,
//   },
//   // Strings
//   {
//     id: "q6",
//     title: "Valid Anagram",
//     domain: "Strings",
//     difficulty: "Easy",
//     skills: ["Sorting", "HashMap"],
//     link: "https://leetcode.com/problems/valid-anagram/",
//     tutorial: "",
//     solved: false,
//   },
//   {
//     id: "q7",
//     title: "Group Anagrams",
//     domain: "Strings",
//     difficulty: "Medium",
//     skills: ["HashMap", "Sorting"],
//     link: "https://leetcode.com/problems/group-anagrams/",
//     solved: false,
//   },
//   {
//     id: "q8",
//     title: "Longest Substring Without Repeating Characters",
//     domain: "Strings",
//     difficulty: "Medium",
//     skills: ["Hash Set", "Sliding Window"],
//     link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
//     solved: false,
//   },
//   {
//     id: "q9",
//     title: "Palindrome Partitioning",
//     domain: "Strings",
//     difficulty: "Hard",
//     skills: ["Backtracking", "Dynamic Programming"],
//     link: "https://leetcode.com/problems/palindrome-partitioning/",
//     solved: false,
//   },
//   // Trees
//   {
//     id: "q10",
//     title: "Maximum Depth of Binary Tree",
//     domain: "Trees",
//     difficulty: "Easy",
//     skills: ["DFS", "Recursion"],
//     link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
//     solved: false,
//   },
//   {
//     id: "q11",
//     title: "Binary Tree Level Order Traversal",
//     domain: "Trees",
//     difficulty: "Medium",
//     skills: ["BFS", "Queue"],
//     link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
//     solved: false,
//   },
//   {
//     id: "q12",
//     title: "Serialize and Deserialize Binary Tree",
//     domain: "Trees",
//     difficulty: "Hard",
//     skills: ["DFS", "Design"],
//     link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
//     solved: false,
//   },
//   // Dynamic Programming
//   {
//     id: "q13",
//     title: "Climbing Stairs",
//     domain: "Dynamic Programming",
//     difficulty: "Easy",
//     skills: ["Recursion", "DP"],
//     link: "https://leetcode.com/problems/climbing-stairs/",
//     solved: false,
//   },
//   {
//     id: "q14",
//     title: "Coin Change",
//     domain: "Dynamic Programming",
//     difficulty: "Medium",
//     skills: ["Recursion", "DP"],
//     link: "https://leetcode.com/problems/coin-change/",
//     solved: false,
//   },
//   {
//     id: "q15",
//     title: "Edit Distance",
//     domain: "Dynamic Programming",
//     difficulty: "Hard",
//     skills: ["Recursion", "DP"],
//     link: "https://leetcode.com/problems/edit-distance/",
//     solved: false,
//   },
// ];



export interface DsaQuestion {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  domain: string;
  solved: boolean;
  description?: string;
  examples?: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints?: string[];
  solution?: string;
  leetcodeUrl?: string;
}

export const dsaQuestions: DsaQuestion[] = [
  // Array Problems
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    domain: "Array",
    solved: false,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹"
    ]
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    domain: "Array",
    solved: false,
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    id: 53,
    title: "Maximum Subarray",
    difficulty: "Medium",
    domain: "Array",
    solved: false,
    description: "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    id: 15,
    title: "3Sum",
    difficulty: "Medium",
    domain: "Array",
    solved: false,
    description: "Given an integer array nums, return all the triplets that sum to 0.",
    leetcodeUrl: "https://leetcode.com/problems/3sum/"
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    domain: "Array",
    solved: false,
    description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/"
  },

  // String Problems
  {
    id: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    domain: "String",
    solved: false,
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    domain: "String",
    solved: false,
    description: "Given a string s, return the longest palindromic substring in s.",
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/"
  },
  {
    id: 76,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    domain: "String",
    solved: false,
    description: "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/"
  },

  // Linked List Problems
  {
    id: 206,
    title: "Reverse Linked List",
    difficulty: "Easy",
    domain: "Linked List",
    solved: false,
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    domain: "Linked List",
    solved: false,
    description: "You are given the heads of two sorted linked lists list1 and list2.",
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    id: 23,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    domain: "Linked List",
    solved: false,
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
    leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/"
  },

  // Tree Problems
  {
    id: 94,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    domain: "Tree",
    solved: false,
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  },
  {
    id: 102,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    domain: "Tree",
    solved: false,
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    id: 124,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    domain: "Tree",
    solved: false,
    description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.",
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
  },

  // Dynamic Programming Problems
  {
    id: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    domain: "Dynamic Programming",
    solved: false,
    description: "You are climbing a staircase. It takes n steps to reach the top.",
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    id: 198,
    title: "House Robber",
    difficulty: "Medium",
    domain: "Dynamic Programming",
    solved: false,
    description: "You are a professional robber planning to rob houses along a street.",
    leetcodeUrl: "https://leetcode.com/problems/house-robber/"
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    domain: "Dynamic Programming",
    solved: false,
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/"
  },

  // Graph Problems
  {
    id: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    domain: "Graph",
    solved: false,
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    id: 207,
    title: "Course Schedule",
    difficulty: "Medium",
    domain: "Graph",
    solved: false,
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.",
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/"
  },
  {
    id: 329,
    title: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    domain: "Graph",
    solved: false,
    description: "Given an m x n integers matrix, return the length of the longest increasing path in matrix.",
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"
  },

  // Stack Problems
  {
    id: 155,
    title: "Min Stack",
    difficulty: "Medium",
    domain: "Stack",
    solved: false,
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    leetcodeUrl: "https://leetcode.com/problems/min-stack/"
  },

  // Binary Search Problems
  {
    id: 704,
    title: "Binary Search",
    difficulty: "Easy",
    domain: "Binary Search",
    solved: false,
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
    leetcodeUrl: "https://leetcode.com/problems/binary-search/"
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    domain: "Binary Search",
    solved: false,
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  }
];
