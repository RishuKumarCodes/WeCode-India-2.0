"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import CommentsPopup from "./CommentsPopup";
import LikesPopup from "./LikesPopup";

function PostsFeed() {
  const [data, setData] = useState([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [likesBoxOpen, setLikesBoxOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/community/posts");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    })();
  }, []);

  const handleLike = async (postId: string) => {
    if (!session) {
      return alert("Please log in to like posts.");
    }
    try {
      const res = await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const upd = (await res.json()) as {
        id: string;
        likeCount: number;
        commentCount: number;
        likedByMe: boolean;
      };

      setData((posts) =>
        posts.map((p) =>
          p.id === upd.id
            ? {
                ...p,
                likeCount: upd.likeCount,
                commentCount: upd.commentCount,
                likedByMe: upd.likedByMe,
              }
            : p
        )
      );
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {data.map((post) => (
        <Card key={post.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={post.sender.image || "/default-avatar.png"}
                  />
                </Avatar>
                <div>
                  <div className="font-medium">{post.sender.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="whitespace-pre-line">{post.message}</p>

            {post.media.length > 0 && (
              <div className="mt-3 space-y-2">
                {post.media.map((item, idx) => (
                  <div key={idx} className="w-full">
                    <Image
                      src={item.url}
                      alt={`media-${idx}`}
                      width={800}
                      height={0}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          <div>
            <div className=" flex items-center gap-2 px-4 py-1 text-blue-800 dark:text-blue-400">
              {post.likeCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLikesBoxOpen(true);
                    setCurrentPostId(post.id);
                  }}
                >
                  {`${post.likeCount} Likes`}
                </Button>
              )}

              {post.commentCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCommentBoxOpen(true);
                    setCurrentPostId(post.id);
                  }}
                >
                  {post.commentCount} Comments
                </Button>
              )}
            </div>

            <CardFooter className="pt-3 border-t">
              <div className="flex justify-between w-full">
                <Button
                  variant={post.likedByMe ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp
                    className={`mr-2 h-4 w-4 ${
                      post.likedByMe ? "text-blue-100" : ""
                    }`}
                  />
                  {post.likedByMe ? post.likeCount : "Like"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCommentBoxOpen(true);
                    setCurrentPostId(post.id);
                  }}
                >
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
                        url: `/community/${post.id}`,
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
            {commentBoxOpen && currentPostId === post.id && (
              <CommentsPopup
                postId={post.id}
                onClose={() => setCommentBoxOpen(false)}
              />
            )}
            {likesBoxOpen && currentPostId === post.id && (
              <LikesPopup
                postId={post.id}
                onClose={() => setLikesBoxOpen(false)}
              />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default PostsFeed;
