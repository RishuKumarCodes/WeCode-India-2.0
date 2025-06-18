"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RoadmapDashboard from "@/components/roadmap/RoadmapDashboard";
import RoadmapFlow from "@/components/pages/RoadmapFlow";
import { RoadmapInput } from "@/types/roadmapTypes";

export default function RoadmapPage() {
  const [roadmapInput, setRoadmapInput] = useState<RoadmapInput | null>(null);
  const { status } = useSession();

  // Check for saved roadmap on mount
  useEffect(() => {
    const savedRoadmap = localStorage.getItem('currentRoadmap');
    if (savedRoadmap) {
      try {
        const parsedRoadmap = JSON.parse(savedRoadmap);
        setRoadmapInput(parsedRoadmap);
      } catch (error) {
        console.error('Error parsing saved roadmap:', error);
      }
    }
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be signed in to access the roadmap feature.
          </p>
        </div>
      </div>
    );
  }

  // if (roadmapInput) {
  //   return <RoadmapFlow roadmapInput={roadmapInput} />;
  // }

  return <RoadmapDashboard />;
}
