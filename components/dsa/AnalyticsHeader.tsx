// components/dsa/AnalyticsHeader.tsx
"use client";

import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ActivityCard } from "../../components/ActivityCard";
import { ContributionCalendar } from "../../components/ContributionCalendar";

export function AnalyticsHeader() {
  return (
    <TooltipProvider>
      <section
        className="w-full flex flex-col lg:flex-row gap-6 mb-8 justify-between"
        aria-label="Analytics Dashboard"
      >
        <div className="lg:w-2/5 w-full">
          <ActivityCard />
        </div>
        <div className="lg:w-3/5 w-full">
          <ContributionCalendar />
        </div>
      </section>
    </TooltipProvider>
  );
}
