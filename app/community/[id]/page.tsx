"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

interface Like {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  author: {
    name: string;
    image?: string;
  };
}

interface Post {
  id: string;
  sender: { name: string; image?: string };
  message: string;
  media: { url: string }[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  likes: Like[];
  comments: Comment[];
}

export default function PostWithComments({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [tab, setTab] = useState<"likes" | "comments">("likes");
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/community/posts/${id}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error loading post:", err);
      }
    })();
  }, [id]);

  if (!post) return null;

  const handleLike = async (postId: string) => {
    if (!session) {
      return alert("Please log in to like posts.");
    }
    try {
      const res = await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const upd = await res.json();
      setPost((prev) =>
        prev && prev.id === upd.id
          ? {
              ...prev,
              likeCount: upd.likeCount,
              commentCount: upd.commentCount,
              likedByMe: upd.likedByMe,
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex max-w-[1000px] m-auto border my-2 rounded-xl overflow-hidden">
        {/* Left: Post Content */}
        <div className="w-7/12 max-w-2xl bg-white overflow-auto">
          <Card className="border-0 border-transparent rounded-none">
            <CardHeader className="flex items-center gap-3">
              <Image
                src={post.sender.image || "/default-avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium text-lg">{post.sender.name}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-md whitespace-pre-wrap">{post.message}</p>
              {post.media.length > 0 &&
                post.media.map((m, i) => (
                  <div key={i} className="mt-4">
                    <Image
                      src={m.url}
                      alt={`media-${i}`}
                      width={600}
                      height={400} // or style={{ height: 'auto' }}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                ))}
            </CardContent>

            <CardFooter className="pt-3 border-t">
              <div className="flex justify-between w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {post.likeCount > 0 ? post.likeCount : "Like"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {post.commentCount > 0 ? post.commentCount : "Comment"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.sender.name,
                        text: post.message,
                        url: window.location.href,
                      });
                    } else {
                      alert("Web Share API not supported in this browser.");
                    }
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right: Tabs for Likes & Comments */}
        <div className="w-5/12 bg-white overflow-auto p-2 border">
          <Tabs
            defaultValue="likes"
            value={tab}
            onValueChange={(value) => setTab(value as "likes" | "comments")}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>

            <TabsContent value="likes">
              {post.likes.length === 0 ? (
                <p>No likes yet.</p>
              ) : (
                <div className="space-y-4">
                  {post.likes.map((like) => (
                    <div key={like.id} className="flex items-center gap-3">
                      <Image
                        src={like.image || "/default-avatar.png"}
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="text-sm font-medium">{like.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="comments">
              {post.comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <Image
                        src={comment.author.image || "/default-avatar.png"}
                        alt="Comment Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleString()}
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
