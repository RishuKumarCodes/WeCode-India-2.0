import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { BarChart, BookOpen, Code } from "lucide-react";
import React from "react";

function MyProgressSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Your journey through DSA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div className="font-medium">Topics Covered</div>
                </div>
                <div className="text-sm text-muted-foreground">38%</div>
              </div>
              <Progress value={38} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary" />
                  <div className="font-medium">Problems Solved</div>
                </div>
                <div className="text-sm text-muted-foreground">42%</div>
              </div>
              <Progress value={42} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  <div className="font-medium">Skill Level</div>
                </div>
                <div className="text-sm text-muted-foreground">45%</div>
              </div>
              <Progress value={45} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Topic Breakdown</CardTitle>
          <CardDescription>Progress by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 ">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Arrays & Strings</div>
                <div className="text-sm text-muted-foreground">75%</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Linked Lists</div>
                <div className="text-sm text-muted-foreground">60%</div>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Stacks & Queues</div>
                <div className="text-sm text-muted-foreground">40%</div>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Trees & Graphs</div>
                <div className="text-sm text-muted-foreground">25%</div>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Dynamic Programming</div>
                <div className="text-sm text-muted-foreground">10%</div>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProgressSection;
