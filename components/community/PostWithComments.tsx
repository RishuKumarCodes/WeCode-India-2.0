// components/PostWithComments.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostWithComments({ postId }: { postId: string }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/community/posts/${postId}`);
      const json = await res.json();
      setPost(json);
    })();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-[600px]">
      {/* Left: Post Content */}
      <div className="w-1/2 bg-black flex justify-center items-center">
        {post.media[0] && (
          <Image
            src={post.media[0].url}
            alt="Post media"
            width={500}
            height={500}
            className="object-contain max-h-full"
          />
        )}
      </div>

      {/* Right: Comments */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold">{post.sender.name}</h2>
        <p className="text-sm text-muted-foreground mb-4">{post.message}</p>

        <div className="space-y-2">
          {post.comments?.map((c) => (
            <div key={c.id} className="border-b pb-2">
              <p className="text-sm font-medium">{c.user.name}</p>
              <p className="text-sm">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
