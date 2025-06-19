"use client";

import React from "react";
import { useSession } from "next-auth/react";
import RoadmapDashboard from "@/components/ai-roadmap/RoadmapDashboard";

export default function RoadmapPage() {
  const { status } = useSession();

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

  return <RoadmapDashboard />;
}
