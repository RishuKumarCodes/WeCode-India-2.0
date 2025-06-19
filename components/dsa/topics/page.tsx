import React from "react";
import dsaTopics from "../../../data/dsa-topics.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle, Link, Search } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TopicsSection() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTopics = dsaTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-6 ">
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
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTopics.map((topic) => (
          <Card key={topic.slug} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <topic.icon className="h-5 w-5 text-primary" />
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  <span>{topic.progress}%</span>
                </div>
              </div>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <Progress value={topic.progress} className="h-2" />
            </CardContent>
            <CardFooter className="pt-3">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/dsa/${topic.slug}`}>
                  Explore Topic
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default TopicsSection;
