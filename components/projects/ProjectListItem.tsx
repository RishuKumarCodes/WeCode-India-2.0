"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  Star, 
  ExternalLink, 
  Github, 
  Play,
  Calendar,
  Tag
} from "lucide-react";

interface ProjectListItemProps {
  project: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    domain: string;
    techStack: string[];
    duration: string;
    collaborators?: number;
    rating?: number;
    githubUrl?: string;
    liveUrl?: string;
    createdAt?: string;
  };
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function ProjectListItem({ project }: ProjectListItemProps) {
  const difficultyColor = difficultyColors[project.difficulty.toLowerCase() as keyof typeof difficultyColors] || 
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary/60">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Main Content */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer">
                {project.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
              {project.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{project.rating}</span>
                </div>
              )}
              {project.collaborators && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.collaborators}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags and Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={`text-xs font-medium ${difficultyColor}`}>
              {project.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {project.domain}
            </Badge>
            {project.duration && (
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {project.duration}
              </Badge>
            )}
            {project.createdAt && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(project.createdAt).toLocaleDateString()}
              </Badge>
            )}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 6 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{project.techStack.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
          <Button size="sm" className="w-full sm:w-auto lg:w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Project
          </Button>
          
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Github className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Code</span>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Demo</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}