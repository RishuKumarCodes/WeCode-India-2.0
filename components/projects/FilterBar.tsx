// app/projects/components/FilterBar.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  difficulty: string;
  onDifficultyChange: (d: string) => void;
  category: string;
  onCategoryChange: (c: string) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  category,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="web development">Web Development</option>
            <option value="ai/ml">AI/ML</option>
            <option value="app development">App Development</option>
            <option value="mobile development">Mobile Development</option>
            <option value="blockchain">Blockchain</option>
            <option value="data science">Data Science</option>
            <option value="game development">Game Development</option>
            <option value="devops">DevOps</option>
            <option value="iot">IoT</option>
            <option value="fintech">FinTech</option>
          </select>
        </div>
        <div className="relative md:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects by name, description, or technology..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
