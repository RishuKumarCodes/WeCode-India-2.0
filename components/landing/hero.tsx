"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Code, Sparkles, BookOpen, Users } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: <Code className="h-5 w-5" />, text: "Learn to code from scratch" },
    { icon: <BookOpen className="h-5 w-5" />, text: "Structured roadmaps" },
    { icon: <Users className="h-5 w-5" />, text: "Community support" },
    { icon: <Sparkles className="h-5 w-5" />, text: "AI-powered guidance" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120rem] h-[60rem] opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-3xl" />
        </div>
      </div>

      <div className="relative container mx-auto max-w-5xl text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Your Complete Path to Becoming a</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Software Developer
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A structured roadmap guiding college students from fundamentals to job-ready skills with project-based learning, community support, and AI assistance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            size="lg"
            className="text-md px-8 py-6"
            onClick={() => router.push("/phases")}
          >
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-md px-8 py-6"
            onClick={() => router.push("/community")}
          >
            Join Community
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border"
              >
                <div className="rounded-full bg-primary/10 p-2 mb-3">
                  {feature.icon}
                </div>
                <p className="text-sm font-medium">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}