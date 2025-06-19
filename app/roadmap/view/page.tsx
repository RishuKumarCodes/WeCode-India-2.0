"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RoadmapFlow from "@/components/ai-roadmap/RoadmapFlow";
import { RoadmapInput } from "@/types/roadmapTypes";
import { useToast } from "@/components/ui/use-toast";

export default function ViewRoadmapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [roadmapInput, setRoadmapInput] = useState<RoadmapInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roadmapId = searchParams.get('id');
    if (!roadmapId) {
      router.push('/roadmap');
      return;
    }

    fetchRoadmap(roadmapId);
  }, [searchParams, router]);

  const fetchRoadmap = async (roadmapId: string) => {
    try {
      const response = await fetch(`/api/get-user-roadmaps?id=${roadmapId}`);
      if (!response.ok) throw new Error('Failed to fetch roadmap');
      const data = await response.json();
      setRoadmapInput(data);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to load the roadmap",
        variant: "destructive",
      });
      router.push('/roadmap');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!roadmapInput) {
    return null;
  }

  return <RoadmapFlow roadmapInput={roadmapInput} />;
} 