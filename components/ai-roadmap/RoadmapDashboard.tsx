"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RoadmapInput } from "@/types/roadmapTypes";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// interface RoadmapDashboardProps {
//   onNewRoadmap: (e?: React.MouseEvent) => void;
// }

interface RoadmapData extends RoadmapInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export default function RoadmapDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [roadmaps, setRoadmaps] = useState<RoadmapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await fetch('/api/get-user-roadmaps');
      if (!response.ok) throw new Error('Failed to fetch roadmaps');
      const data = await response.json();
      setRoadmaps(data);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      toast({
        title: "Error",
        description: "Failed to load your roadmaps",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewRoadmap = (roadmapId: string) => {
    router.push(`/roadmap/view?id=${roadmapId}`);
  };

  const handleNewRoadmap = () => {
    router.push('/roadmap/create');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Your Learning Roadmaps
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            View and manage your personalized learning paths
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {roadmaps.length > 0 ? (
            <div className="space-y-6">
              {/* Roadmap Cards */}
              {roadmaps.map((roadmap) => (
                <div
                  key={roadmap.id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {roadmap.goal}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <span>{roadmap.skillLevel} Level</span>
                        <span>•</span>
                        <span>{roadmap.months} months</span>
                        <span>•</span>
                        <span>{roadmap.dailyHours} hours/day</span>
                      </div>
                      {roadmap.targetCompaniesOrRoles && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          Target: {roadmap.targetCompaniesOrRoles}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Created: {new Date(roadmap.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleViewRoadmap(roadmap.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Roadmap
                    </Button>
                    <Button
                      onClick={() => router.push(`/roadmap/analytics?id=${roadmap.id}`)}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      View Analytics
                    </Button>
                  </div>
                </div>
              ))}

              {/* Create New Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={handleNewRoadmap}
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                  text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
                  transition-all duration-200 ease-in-out"
                >
                  Create New Roadmap
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Roadmaps Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create your first learning roadmap to get started
              </p>
              <Button
                onClick={handleNewRoadmap}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create New Roadmap
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 