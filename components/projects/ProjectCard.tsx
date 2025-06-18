"use client";
import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, FileText, Globe, Layout, Server, Smartphone } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectCardProps {
  project: any;
}

const iconMap: Record<string, React.FC<any>> = {
  Layout,
  Globe,
  FileText,
  Server,
  Smartphone,
};

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = iconMap[project.icon] || Layout;
  const pct = project.progress ?? 0;
  const label =
    project.status === "Completed"
      ? "View Project"
      : project.status === "In Progress"
      ? "Continue Project"
      : "Start Project";

  return (
    <Card key={project.id} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-primary" />
          <Badge
            variant={
              project.difficulty === "Beginner"
                ? "default"
                : project.difficulty === "Intermediate"
                ? "secondary"
                : "destructive"
            }
          >
            {project.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech: string, i: number) => (
            <Badge key={i} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Progress</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{pct}%</span>
            </div>
          </div>
          <Progress value={pct} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button className="w-full" asChild>
          <Link href={`/projects/${project.slug}`}>
            {label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
