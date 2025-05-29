"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BookOpen, Code2, Layers, FileCode2, 
  GraduationCap, ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

const phases = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Fundamentals",
    description: "Build a strong foundation with programming basics, Git, and development setup.",
    color: "bg-blue-500",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Data Structures & Algorithms",
    description: "Master core DSA concepts and problem-solving techniques.",
    color: "bg-green-500",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Development",
    description: "Learn web, mobile, or other development paths with hands-on projects.",
    color: "bg-purple-500",
  },
  {
    icon: <FileCode2 className="h-6 w-6" />,
    title: "Profile Building",
    description: "Create impressive portfolios, optimize GitHub and LinkedIn profiles.",
    color: "bg-amber-500",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Interview Preparation",
    description: "Practice technical interviews, system design, and HR questions.",
    color: "bg-rose-500",
  },
];

export default function Roadmap() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-24"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Your Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow our structured roadmap designed to take you from a beginner to a job-ready developer through distinct learning phases.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline connector */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-border z-0 hidden md:block" />

          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={cn(
                "mb-12 md:mb-0 relative z-10 flex",
                index % 2 === 0 ? "md:justify-end" : "md:justify-start"
              )}
            >
              <Card className={cn(
                "w-full md:w-[calc(50%-40px)] transition-all hover:shadow-md",
                index % 2 === 0 ? "md:mr-10" : "md:ml-10"
              )}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "rounded-full p-2 text-white",
                      phase.color
                    )}>
                      {phase.icon}
                    </div>
                    <CardTitle>{phase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {phase.description}
                  </CardDescription>
                  <Button variant="outline" size="sm">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Timeline dots - visible on md screens */}
              <div 
                className={cn(
                  "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-background hidden md:block",
                  phase.color
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}