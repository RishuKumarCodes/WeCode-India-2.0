"use client";
import React from "react";
import { useRouter } from "next/navigation";
import projectsData from "@/data/projects.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressTracker } from "@/components/ProgressTracker";
import { useLocalProjectProgress } from "../../hooks/useLocalProjectProgress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ResourceCard } from "@/components/ResourceCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

interface PageProps {
  params: { slug: string };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { slug } = params;
  const router = useRouter();
  const project = projectsData.find((p) => p.slug === slug);

  // EARLY RETURN if project not found
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="text-2xl mb-2">Project not found</div>
          <Button variant="link" onClick={() => router.push("/projects")}>
            Back to Projects
          </Button>
        </Card>
      </div>
    );
  }

  // Hooks must come after that guard
  const { completedSteps, toggleStep } = useLocalProjectProgress(project.id);
  const totalSteps = project.phases.reduce(
    (sum, ph) => sum + ph.steps.length,
    0
  );

  // Fallback goals if missing
  const goals = project.goals ?? [
    "Learn modern web dev best practices, build a market-worthy portfolio, and deploy a pro site.",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="mx-auto max-w-3xl pt-10 pb-5 px-2 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/projects")}
          size="sm"
          className="px-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span className="sr-only sm:not-sr-only">All Projects</span>
        </Button>
        <ThemeToggle />
      </div>

      <main className="max-w-3xl mx-auto px-2">
        {/* Project Overview */}
        <section className="mb-8">
          <Card className="shadow-xl px-8 py-8 rounded-2xl">
            {/* Title & Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <h1 className="text-3xl font-extrabold">{project.title}</h1>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{project.domain}</Badge>
                <Badge variant="secondary">{project.difficulty}</Badge>
                <Badge variant="default" className="bg-gray-800 text-white">
                  {project.timeEstimate}
                </Badge>
                <Badge className="bg-muted">
                  {project.techStack.join(", ")}
                </Badge>
              </div>
            </div>

            {/* Goals + Repo Button */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <div className="flex-1 space-y-4">
                <h2 className="text-lg font-semibold mb-1">Goals</h2>
                <ul className="list-disc list-inside text-muted-foreground pl-3 text-[15px]">
                  {goals.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>

                <div className="flex gap-5 flex-wrap text-xs">
                  <div className="p-2 rounded-lg bg-muted flex flex-col text-center w-28">
                    <span className="font-semibold">Time to Complete</span>
                    <span className="text-base mt-1">{project.timeEstimate}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted flex flex-col text-center w-28">
                    <span className="font-semibold">Difficulty</span>
                    <span className="text-base mt-1">{project.difficulty}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted flex flex-col text-center w-32">
                    <span className="font-semibold">Tools</span>
                    <span className="text-xs mt-1">
                      {project.techStack.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 mt-4 md:mt-0 self-end">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-6 shadow hover:bg-primary/5 hover:border-primary"
                >
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View GitHub Repo
                  </a>
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground text-base mt-5">
              {project.description}
            </p>
          </Card>
        </section>

        {/* Progress */}
        <ProgressTracker
          completeCount={completedSteps.length}
          totalCount={totalSteps}
        />

        {/* Phase Roadmap */}
        <section className="mb-10 mt-8">
          <h2 className="font-semibold mb-4 text-lg text-primary">
            Phase Roadmap
          </h2>
          <Accordion type="multiple" className="w-full bg-background rounded-xl border">
            {project.phases.map((phase) => (
              <AccordionItem value={phase.title} key={phase.title}>
                <AccordionTrigger className="font-semibold text-base px-2">
                  {phase.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">{phase.description}</p>
                  <ul className="space-y-3 py-2">
                    {phase.steps.map((step) => (
                      <li
                        key={step.id}
                        className="flex flex-col gap-1 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Checkbox
                            id={step.id}
                            checked={completedSteps.includes(step.id)}
                            onCheckedChange={() => toggleStep(step.id)}
                            className="mr-2"
                          />
                          <label
                            htmlFor={step.id}
                            className="font-medium text-base cursor-pointer flex-1"
                          >
                            {step.label}
                          </label>
                        </div>
                        {step.code && (
                          <div className="w-full sm:w-auto sm:min-w-[300px] mt-2 sm:mt-0">
                            <CodeBlock code={step.code} />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Resources */}
        <section className="mb-8">
          <h2 className="font-semibold mb-3 text-lg text-primary">Resources</h2>
          <div className="flex flex-col gap-4">
            {project.resources.map((r) => (
              <ResourceCard key={r.title + r.url} resource={r} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
