"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Smartphone,
  Brain,
  Database,
  Shield,
  Cloud,
  ArrowRight,
} from "lucide-react";

const domains = [
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Web Development",
    description: "Frontend and backend technologies, frameworks, and deployment.",
    projects: 42,
    resources: 87,
    color: "from-blue-500 to-cyan-500",
    path: "/domains/web",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile Development",
    description: "Native and cross-platform app development for iOS and Android.",
    projects: 36,
    resources: 65,
    color: "from-green-500 to-emerald-500",
    path: "/domains/mobile",
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI & Machine Learning",
    description: "Machine learning, deep learning, and AI application development.",
    projects: 28,
    resources: 73,
    color: "from-purple-500 to-violet-500",
    path: "/domains/ai",
  },
  {
    icon: <Database className="h-10 w-10" />,
    title: "Backend & DevOps",
    description: "Server architecture, databases, and cloud infrastructure.",
    projects: 31,
    resources: 59,
    color: "from-amber-500 to-orange-500",
    path: "/domains/backend",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Cybersecurity",
    description: "Network security, penetration testing, and secure coding.",
    projects: 24,
    resources: 52,
    color: "from-red-500 to-rose-500",
    path: "/domains/security",
  },
  {
    icon: <Cloud className="h-10 w-10" />,
    title: "Cloud Computing",
    description: "AWS, Azure, Google Cloud, and serverless architectures.",
    projects: 26,
    resources: 48,
    color: "from-sky-500 to-indigo-500",
    path: "/domains/cloud",
  },
];

export default function Domains() {
  const router = useRouter();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Explore Technology Domains
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose your specialization path with curated resources and projects
            for each technology domain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <div className={`h-2 bg-gradient-to-r ${domain.color}`} />
                <CardContent className="p-6">
                  <div className="mb-5 flex justify-center">
                    <div
                      className={`rounded-full p-3 bg-gradient-to-r ${domain.color} text-white`}
                    >
                      {domain.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    {domain.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {domain.description}
                  </p>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{domain.projects} Projects</span>
                    <span>{domain.resources} Resources</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push(domain.path)}
                  >
                    Explore Domain
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
