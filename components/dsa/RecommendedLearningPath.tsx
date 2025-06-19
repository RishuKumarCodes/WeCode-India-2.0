import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Link } from "lucide-react";

function RecommendedLearningPath() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight mb-6">
        Recommended Learning Path
      </h2>
      <div className="relative">
        <div className="absolute left-8 top-0 h-full w-px bg-border"></div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-bold">01</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Start with the Basics</h3>
              <p className="text-muted-foreground">
                Begin with arrays, strings, and basic algorithms to build a
                strong foundation.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dsa/arrays-strings">
                    Start Here
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
              <span className="font-bold">02</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Linked Data Structures</h3>
              <p className="text-muted-foreground">
                Move on to linked lists, stacks, and queues to understand
                sequential data structures.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dsa/linked-lists">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/80 text-primary-foreground">
              <span className="font-bold">03</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Trees and Graphs</h3>
              <p className="text-muted-foreground">
                Explore hierarchical and network-based data structures and
                algorithms.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dsa/trees-graphs">
                    Explore Topics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/70 text-primary-foreground">
              <span className="font-bold">04</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Advanced Techniques</h3>
              <p className="text-muted-foreground">
                Master dynamic programming, greedy algorithms, and other
                advanced problem-solving techniques.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dsa/dynamic-programming">
                    Advanced Topics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendedLearningPath;
