// app/projects/components/ProjectTabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectTabsProps {
  defaultValue?: string;
}

export function ProjectTabs({ defaultValue = "all" }: ProjectTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full md:w-auto grid-cols-4">
        <TabsTrigger value="all">All Projects</TabsTrigger>
        <TabsTrigger value="inprogress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="recommended">Recommended</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
