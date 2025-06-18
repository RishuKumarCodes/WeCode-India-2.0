"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import RecommendedLearningPath from "../../components/dsa/RecommendedLearningPath";
import TopicsSection from "../../components/dsa/topics/page";
import ProblemsSection from "../../components/dsa/problems/page";
import MyProgressSection from "../../components/dsa/progress/page";

export default function DSAPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Data Structures & Algorithms
          </h1>
          <p className="text-muted-foreground">
            Master the essential DSA concepts needed for problem-solving and
            technical interviews.
          </p>
        </div>

        <div className="grid gap-6 mt-8">
          <Tabs defaultValue="topics">
            <TabsList>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="mt-6">
              <TopicsSection />
              <RecommendedLearningPath />
            </TabsContent>

            <TabsContent value="problems" className="mt-6">
              <ProblemsSection />
            </TabsContent>

            <TabsContent value="progress" className="mt-6">
              <MyProgressSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
