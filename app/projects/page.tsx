"use client";

import * as React from "react";
import projectsList from "../../data/projects.json";
import { FilterBar } from "../../components/projects/FilterBar";
import { ProjectGrid } from "../../components/projects/ProjectGrid";
import HeroSection from "@/components/projects/HeroSection";
import { Grid3X3, List } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("all");
  const [category, setCategory] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const filtered = projectsList.filter((project: any) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.techStack.some((tech: string) => tech.toLowerCase().includes(q));

    const matchesDifficulty =
      difficulty === "all" || project.difficulty.toLowerCase() === difficulty;
    const matchesCategory =
      category === "all" || project.domain.toLowerCase().includes(category);

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Filter Section */}
        <div className="max-w-10xl mx-auto">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            category={category}
            onCategoryChange={setCategory}
          />
        </div>

        {/* Results Section */}
        <div className="max-w-10xl mx-auto space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Available Projects
              </h2>
              <p className="text-muted-foreground">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""}{" "}
                found
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">View:</span>
              <div className="flex items-center bg-muted/50 rounded-lg p-1 border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className="relative">
            {filtered.length > 0 ? (
              <ProjectGrid projects={filtered} viewMode={viewMode} />
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Try adjusting your search criteria or filters to find more
                    projects.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDifficulty("all");
                    setCategory("all");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}