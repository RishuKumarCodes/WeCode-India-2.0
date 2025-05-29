import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Code, Rocket, FileText, BookCheck } from 'lucide-react';
import Link from 'next/link';

export function LandingPhases() {
  const phases = [
    {
      icon: BookOpen,
      title: "Phase 1: Fundamentals",
      description: "Build a strong foundation in programming basics and core concepts",
      items: ["Programming Logic", "Data Types & Variables", "Control Structures", "Functions & OOP"]
    },
    {
      icon: Code,
      title: "Phase 2: DSA",
      description: "Master data structures and algorithms for problem-solving",
      items: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming"]
    },
    {
      icon: Rocket,
      title: "Phase 3: Development",
      description: "Learn modern web development and build real projects",
      items: ["Frontend Development", "Backend Development", "Databases", "API Design"]
    },
    {
      icon: FileText,
      title: "Phase 4: Profile Building",
      description: "Create an impressive portfolio and online presence",
      items: ["Resume Creation", "GitHub Portfolio", "LinkedIn Optimization", "Personal Website"]
    },
    {
      icon: BookCheck,
      title: "Phase 5: Interview Prep",
      description: "Prepare for technical interviews and land your dream job",
      items: ["DSA Practice", "System Design", "Mock Interviews", "HR Interview Prep"]
    }
  ];

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Follow our structured roadmap designed to take you from a beginner to a job-ready software developer.
            </p>
          </div>
          <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <phase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{phase.description}</p>
                  <ul className="space-y-2 mb-6">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/phases">
              Explore Full Roadmap
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}