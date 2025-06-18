// app/projects/components/ProjectGrid.tsx
"use client";

import * as React from "react";
import { ProjectCard } from "./ProjectCard";
import { FileText } from "lucide-react";

interface ProjectGridProps {
  projects: any[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {projects.length > 0 ? (
        projects.map((p) => <ProjectCard key={p.id} project={p} />)
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">No projects found</h3>
          <p className="text-muted-foreground text-center mt-2">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
