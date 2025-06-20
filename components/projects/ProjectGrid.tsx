"use client";

import * as React from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectListItem } from "./ProjectListItem";
import { FileText } from "lucide-react";

interface ProjectGridProps {
  projects: any[];
  viewMode: "grid" | "list";
}

export function ProjectGrid({ projects, viewMode }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium">No projects found</h3>
        <p className="text-muted-foreground text-center mt-2">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4 mt-6">
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}