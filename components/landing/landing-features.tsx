"use client";

import React from 'react';
import { 
  BookOpen, Code, Brain, FileCode, 
  Users, Calendar, LineChart, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const features = [
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "Structured Learning Paths",
    description: "Follow a carefully designed curriculum from fundamentals to advanced topics, organized by phases and domains."
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Project-Based Learning",
    description: "Apply concepts through hands-on projects of increasing complexity, building a strong portfolio as you learn."
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "DSA & Problem Solving",
    description: "Master algorithms and data structures with curated problems, organized by difficulty and topic."
  },
  {
    icon: <FileCode className="h-10 w-10" />,
    title: "Resume & Profile Builder",
    description: "Create professional profiles, optimize your GitHub, and prepare for technical interviews."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Community Support",
    description: "Connect with peers, ask questions, share resources, and learn collaboratively in real-time."
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Progress Tracking",
    description: "Track your daily activities, maintain learning streaks, and visualize your growth journey."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Progress Analytics",
    description: "Visualize your learning journey with detailed analytics on completed modules, streaks, and achievements."
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "AI-Powered Guidance",
    description: "Get personalized recommendations, project ideas, and learning paths from our Gemini AI assistant."
  }
];

const icon = features[0].icon; // ✅ access icon from the first item

export function LandingFeatures() {
    const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
   <section 
      ref={ref}
      className="py-24 bg-muted/30"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Become a Developer
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform provides a comprehensive ecosystem designed specifically for college students learning software development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg border hover:shadow-md transition-all"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                {React.cloneElement(icon, { className: "h-8 w-8 text-primary" })}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}