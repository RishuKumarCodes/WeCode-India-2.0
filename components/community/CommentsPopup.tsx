"use client";
import { useEffect, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

interface Comment {
  id: string;
  message: string;
  createdAt: string;
  author: {
    name: string;
    image?: string;
  };
}

interface CommentsPopupProps {
  postId: string;
  onClose: () => void;
}

export default function CommentsPopup({ postId, onClose }: CommentsPopupProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/community/posts/${postId}/comments`);
        if (!res.ok) throw new Error("Failed to load comments");
        setComments((await res.json()) as Comment[]);
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

  const handleSubmit = async () => {
    if (!session) return alert("Please log in to comment");
    if (!newText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/community/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText.trim() }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const created = (await res.json()) as Comment;
      setComments([created, ...comments]);
      setNewText("");
    } catch (err) {
      console.error(err);
      alert("Could not post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onBackdropClick}
    >
      <div className="bg-white w-full h-[80vh] max-w-lg mx-4 rounded-lg overflow-hidden shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Comments</h2>
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No comments yet.
            </p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage
                    src={c.author.image || "/default-avatar.png"}
                    alt={c.author.name}
                  />
                </Avatar>
                <div className="bg-gray-200/80 p-2 rounded-lg">
                  <div className="flex items-center gap-2 ">
                    <span className="font-semibold text-sm text-zinc-600">{c.author.name}</span>
                  </div>
                  <p className="-mt-1">{c.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <textarea
            className="w-full border rounded-md p-2 resize-none"
            rows={3}
            placeholder="Write a comment..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            disabled={loading}
          />
          <div className="mt-2 text-right">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={loading || !newText.trim()}
            >
              {loading ? "Posting…" : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
