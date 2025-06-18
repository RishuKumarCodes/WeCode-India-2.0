'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  BarChart,
  BookOpen,
  CheckCircle,
  ChevronRight,
  CircleEllipsis,
  Code,
  Search,
} from 'lucide-react';

const dsaTopics = [
  {
    title: 'Arrays & Strings',
    description: 'Foundation of data structures',
    progress: 75,
    icon: Code,
    slug: 'arrays-strings',
  },
  {
    title: 'Linked Lists',
    description: 'Linear data structures',
    progress: 60,
    icon: Code,
    slug: 'linked-lists',
  },
  {
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO structures',
    progress: 40,
    icon: Code,
    slug: 'stacks-queues',
  },
  {
    title: 'Trees & Graphs',
    description: 'Hierarchical structures',
    progress: 25,
    icon: Code,
    slug: 'trees-graphs',
  },
  {
    title: 'Searching & Sorting',
    description: 'Fundamental algorithms',
    progress: 50,
    icon: Code,
    slug: 'searching-sorting',
  },
  {
    title: 'Dynamic Programming',
    description: 'Optimization technique',
    progress: 10,
    icon: Code,
    slug: 'dynamic-programming',
  },
  {
    title: 'Recursion & Backtracking',
    description: 'Self-referential solutions',
    progress: 30,
    icon: Code,
    slug: 'recursion-backtracking',
  },
  {
    title: 'Greedy Algorithms',
    description: 'Locally optimal choices',
    progress: 20,
    icon: Code,
    slug: 'greedy',
  },
];

export default function DSAPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredTopics = dsaTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Data Structures & Algorithms</h1>
          <p className="text-muted-foreground">
            Master the essential DSA concepts needed for problem-solving and technical interviews.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search topics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="topics" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid gap-6 mt-8">
          <Tabs defaultValue="topics">
            <TabsContent value="topics" className="mt-0">
        
            </TabsContent>
            
            <TabsContent value="problems" className="mt-0">
              <div className="rounded-lg border shadow-sm">
                <div className="flex flex-col">
                  <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                    <div className="col-span-6">Problem</div>
                    <div className="col-span-2 text-center">Difficulty</div>
                    <div className="col-span-2 text-center">Category</div>
                    <div className="col-span-2 text-center">Status</div>
                  </div>
                  
                  <div className="grid grid-cols-12 border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-6">
                      <Link href="/dsa/problems/two-sum" className="font-medium hover:text-primary">
                        Two Sum
                      </Link>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        Easy
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-sm">Arrays</div>
                    <div className="col-span-2 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-6">
                      <Link href="/dsa/problems/valid-parentheses" className="font-medium hover:text-primary">
                        Valid Parentheses
                      </Link>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        Easy
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-sm">Stacks</div>
                    <div className="col-span-2 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-6">
                      <Link href="/dsa/problems/merge-intervals" className="font-medium hover:text-primary">
                        Merge Intervals
                      </Link>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                        Medium
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-sm">Arrays</div>
                    <div className="col-span-2 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-6">
                      <Link href="/dsa/problems/lru-cache" className="font-medium hover:text-primary">
                        LRU Cache
                      </Link>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-800/30 dark:text-red-500">
                        Hard
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-sm">Linked Lists</div>
                    <div className="col-span-2 text-center">
                      <CircleEllipsis className="mx-auto h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-6">
                      <Link href="/dsa/problems/binary-tree-level-order" className="font-medium hover:text-primary">
                        Binary Tree Level Order Traversal
                      </Link>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                        Medium
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-sm">Trees</div>
                    <div className="col-span-2 text-center">
                      <CircleEllipsis className="mx-auto h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4">
                  <Button variant="outline" asChild>
                    <Link href="/dsa/problems">
                      View All Problems
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="mt-0">
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
                    <div className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Recommended Learning Path</h2>
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
                    Begin with arrays, strings, and basic algorithms to build a strong foundation.
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
                    Move on to linked lists, stacks, and queues to understand sequential data structures.
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
                    Explore hierarchical and network-based data structures and algorithms.
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
                    Master dynamic programming, greedy algorithms, and other advanced problem-solving techniques.
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
      </div>
    </div>
  );
}