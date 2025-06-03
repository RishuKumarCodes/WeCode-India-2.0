"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/seperator";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Heart,
  MessageSquare,
  Search,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react";
import { posts } from "@/constants/posts";
import { events } from "../../constants/events";
import { groups } from "../../constants/groups";

export default function CommunityPage() {
  const [postContent, setPostContent] = React.useState("");

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Connect with other students, share your progress, and learn
            together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mt-8">
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Create Post</CardTitle>
                <CardDescription>
                  Share your thoughts, questions, or achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind?"
                  className="resize-none"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Resource
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Tag People
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button disabled={!postContent.trim()}>Post</Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="feed">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                <div className="relative w-40 lg:w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="pl-8"
                  />
                </div>
              </div>

              <TabsContent value="feed" className="mt-4 space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {post.author.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              @{post.author.username} · {post.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="whitespace-pre-line">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t">
                      <div className="flex justify-between w-full">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Like ({post.likes})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Comment ({post.comments})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Heart className="h-12 w-12 text-muted-foreground" />
                      <h3 className="text-xl font-medium">Trending Content</h3>
                      <p className="text-muted-foreground text-center">
                        Stay tuned for trending posts from the community.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Users className="h-12 w-12 text-muted-foreground" />
                      <h3 className="text-xl font-medium">Following Feed</h3>
                      <p className="text-muted-foreground text-center">
                        Follow other students to see their posts here.
                      </p>
                      <Button>Discover People</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Join live sessions and workshops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="space-y-2">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.description}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{event.date}</span>
                      <span>{event.attendees} attending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/community/events">View All Events</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Groups</CardTitle>
                <CardDescription>Learn together with others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {groups.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {group.description}
                    </div>
                    <div className="text-sm">{group.members} members</div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
