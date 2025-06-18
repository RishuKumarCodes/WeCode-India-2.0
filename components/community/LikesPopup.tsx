"use client";
import { useEffect, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Like {
  id: string;
  name: string;
  image?: string;
}

interface LikesPopupProps {
  postId: string;
  onClose: () => void;
}

export default function LikesPopup({ postId, onClose }: LikesPopupProps) {
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/community/posts/${postId}/like`);
        if (!res.ok) throw new Error("Failed to load likes");
        setLikes((await res.json()) as Like[]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onBackdropClick}
    >
      <div className="bg-white w-full max-w-md mx-4 rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Likes</h2>
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 space-y-4">
          {likes.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No likes yet.</p>
          ) : (
            likes.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={u.image || "/default-avatar.png"}
                    alt={u.name}
                  />
                </Avatar>
                <span className="font-medium">{u.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
