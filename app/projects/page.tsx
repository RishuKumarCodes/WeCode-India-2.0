// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import {
//   ArrowRight,
//   FileText,
//   Globe,
//   Layout,
//   Search,
//   Server,
//   Smartphone,
// } from "lucide-react";

// // Adjust this import to point at your root JSON file:
// import projectsList from "../../data/projects.json";

// export default function ProjectsPage() {
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [difficulty, setDifficulty] = React.useState("all");
//   const [category, setCategory] = React.useState("all");

//   const filteredProjects = projectsList.filter((project: any) => {
//     const matchesSearch =
//       project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       project.techStack.some((tech: string) =>
//         tech.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesDifficulty =
//       difficulty === "all" ||
//       project.difficulty.toLowerCase() === difficulty.toLowerCase();
//     const matchesCategory =
//       category === "all" ||
//       project.domain.toLowerCase().includes(category.toLowerCase());

//     return matchesSearch && matchesDifficulty && matchesCategory;
//   });

//   // Map icon names in your JSON to the lucide components you want:
//   const iconMap: Record<string, React.FC<any>> = {
//     Layout,
//     Globe,
//     FileText,
//     Server,
//     Smartphone,
//   };

//   return (
//     <div className="container py-12">
//       <div className="flex flex-col space-y-4">
//         <div className="flex flex-col space-y-2">
//           <h1 className="text-4xl font-bold tracking-tight">
//             Project-Based Learning
//           </h1>
//           <p className="text-muted-foreground">
//             Build real-world projects to apply your skills and enhance your
//             portfolio.
//           </p>
//         </div>

//         <div className="flex flex-col gap-4 mt-6">
//           <div className="grid gap-4 md:grid-cols-4">
//             <div className="relative md:col-span-2">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search projects by name, description, or technology..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div>
//               <select
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
//                 value={difficulty}
//                 onChange={(e) => setDifficulty(e.target.value)}
//               >
//                 <option value="all">All Difficulties</option>
//                 <option value="beginner">Beginner</option>
//                 <option value="intermediate">Intermediate</option>
//                 <option value="advanced">Advanced</option>
//               </select>
//             </div>
//             <div>
//               <select
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="all">All Categories</option>
//                 <option value="web">Web Development</option>
//                 <option value="full stack">Full Stack</option>
//                 <option value="mobile">Mobile Development</option>
//               </select>
//             </div>
//           </div>

//           <Tabs defaultValue="all" className="w-full">
//             <TabsList className="grid w-full md:w-auto grid-cols-4">
//               <TabsTrigger value="all">All Projects</TabsTrigger>
//               <TabsTrigger value="inprogress">In Progress</TabsTrigger>
//               <TabsTrigger value="completed">Completed</TabsTrigger>
//               <TabsTrigger value="recommended">Recommended</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map((project: any) => {
//               const Icon =
//                 iconMap[project.icon] ||
//                 Layout /* fallback if icon key missing */;
//               return (
//                 <Card key={project.id} className="overflow-hidden">
//                   <CardHeader className="pb-3">
//                     <div className="flex items-center justify-between">
//                       <Icon className="h-5 w-5 text-primary" />
//                       <Badge
//                         variant={
//                           project.difficulty === "Beginner"
//                             ? "default"
//                             : project.difficulty === "Intermediate"
//                             ? "secondary"
//                             : "destructive"
//                         }
//                       >
//                         {project.difficulty}
//                       </Badge>
//                     </div>
//                     <CardTitle className="text-lg">
//                       {project.title}
//                     </CardTitle>
//                     <CardDescription>
//                       {project.summary}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="pb-3">
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {project.techStack.map((tech: string, i: number) => (
//                         <Badge key={i} variant="outline">
//                           {tech}
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div className="text-sm font-medium">Progress</div>
//                         <div className="flex items-center text-sm text-muted-foreground">
//                           <span>{project.progress ?? 0}%</span>
//                         </div>
//                       </div>
//                       <Progress
//                         value={project.progress ?? 0}
//                         className="h-2"
//                       />
//                     </div>
//                   </CardContent>
//                   <CardFooter className="pt-3">
//                     <Button className="w-full" asChild>
//                       <Link href={`/projects/${project.slug}`}>
//                         {project.status === "Completed"
//                           ? "View Project"
//                           : project.status === "In Progress"
//                           ? "Continue Project"
//                           : "Start Project"}
//                         <ArrowRight className="ml-2 h-4 w-4" />
//                       </Link>
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               );
//             })
//           ) : (
//             <div className="col-span-full flex flex-col items-center justify-center py-12">
//               <FileText className="h-12 w-12 text-muted-foreground mb-4" />
//               <h3 className="text-xl font-medium">No projects found</h3>
//               <p className="text-muted-foreground text-center mt-2">
//                 Try adjusting your search or filters to find what you're looking
//                 for.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* ...the rest of your “Domains to Explore” and “How Project-Based Learning Works” sections */}
//       </div>
//     </div>
//   );
// }

// app/projects/page.tsx
"use client";

import * as React from "react";
import projectsList from "../../data/projects.json";
import { FilterBar } from "../../components/projects/FilterBar";
import { ProjectTabs } from "../../components/projects/ProjectTabs";
import { ProjectGrid } from "../../components/projects/ProjectGrid";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("all");
  const [category, setCategory] = React.useState("all");

  const filtered = projectsList.filter((project: any) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.techStack.some((tech: string) => tech.toLowerCase().includes(q));

    const matchesDifficulty =
      difficulty === "all" || project.difficulty.toLowerCase() === difficulty;
    const matchesCategory =
      category === "all" || project.domain.toLowerCase().includes(category);

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="container py-12">
      {/* header & description */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Project-Based Learning
          </h1>
          <p className="text-muted-foreground">
            Build real-world projects to apply your skills and enhance your
            portfolio.
          </p>
        </div>

        {/* filters, tabs, grid */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          category={category}
          onCategoryChange={setCategory}
        />

        <ProjectTabs />

        <ProjectGrid projects={filtered} />

        {/* you can paste your “Domains to Explore” and “How Project-Based Learning Works” here unchanged */}
      </div>
    </div>
  );
}
