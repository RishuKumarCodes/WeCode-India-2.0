"use client";
import React from "react";
import { useRouter } from "next/navigation";
import projectsData from "@/data/projects.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressTracker } from "@/components/ProgressTracker";
import { useLocalProjectProgress } from "@/hooks/useLocalProjectProgress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ResourceCard } from "@/components/ResourceCard";
import {
  ArrowLeft,
  Clock,
  BarChart3,
  Code,
  Github,
  Target,
  CheckCircle2,
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

interface PageProps {
  params: { slug: string };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { slug } = params;
  const router = useRouter();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-xl font-semibold mb-3">Project not found</h1>
          <p className="text-sm text-muted-foreground mb-4">
            The project you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push("/projects")} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Card>
      </div>
    );
  }

  const { completedSteps, toggleStep } = useLocalProjectProgress(project.id);
  const totalSteps = project.phases.reduce((sum, ph) => sum + ph.steps.length, 0);
  const completionPercentage = Math.round((completedSteps.length / totalSteps) * 100);

  const goals =
    project.goals ?? [
      "Learn modern web dev best practices, build a market-worthy portfolio, and deploy a pro site.",
    ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/projects")}
              size="sm"
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Projects
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {completedSteps.length} of {totalSteps} steps completed
              </div>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                  <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Repository
                  </a>
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{project.domain}</Badge>
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
                <Badge variant="secondary">{project.timeEstimate}</Badge>
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Goals */}
            <Card className="mb-8 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Learning Goals</h2>
              </div>
              <ul className="space-y-2">
                {goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{goal}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Phase Roadmap */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Project Phases
              </h2>

              <Accordion type="multiple" className="space-y-4">
                {project.phases.map((phase, phaseIndex) => (
                  <AccordionItem value={phase.title} key={phase.title} className="border rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center shrink-0">
                          {phaseIndex + 1}
                        </div>
                        <div>
                          <div className="font-medium">{phase.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {phase.steps.length} steps
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4 ml-9">
                        {phase.description}
                      </p>

                      <div className="space-y-3 ml-9">
                        {phase.steps.map((step) => (
                          <div key={step.id} className="group">
                            <div className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors">
                              <Checkbox
                                id={step.id}
                                checked={completedSteps.includes(step.id)}
                                onCheckedChange={() => toggleStep(step.id)}
                                className="mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <label
                                  htmlFor={step.id}
                                  className="text-sm font-medium cursor-pointer block mb-2"
                                >
                                  {step.label}
                                </label>
                                {step.code && (
                                  <div className="max-w-full">
                                    <CodeBlock code={step.code} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Progress Overview</h3>
                <ProgressTracker completeCount={completedSteps.length} totalCount={totalSteps} />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">{completedSteps.length} steps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium">{totalSteps - completedSteps.length} steps</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-muted-foreground">Total Progress</span>
                    <span className="font-semibold text-primary">{completionPercentage}%</span>
                  </div>
                </div>
              </Card>

              {/* Project Stats */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium">{project.timeEstimate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Difficulty</div>
                      <div className="font-medium">{project.difficulty}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Tech Stack</div>
                      <div className="font-medium">{project.techStack.join(", ")}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Resources */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Learning Resources</h3>
                <div className="space-y-3">
                  {project.resources.map((resource) => (
                    <ResourceCard key={resource.title + resource.url} resource={resource} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
