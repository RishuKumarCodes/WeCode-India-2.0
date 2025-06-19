"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DoubtResponseForm } from "@/components/doubt-forum/DoubtResponseForm";
import { DoubtResponseList } from "@/components/doubt-forum/DoubtResponseList";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Doubt {
  id: string;
  username: string;
  title: string;
  question: string;
  tags: string[];
  image_url?: string | null;
  resolved: boolean;
  createdAt: string;
}

export default function DoubtDetailPage() {
  const params = useParams();
  const doubtId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const [doubt, setDoubt] = useState<Doubt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (!doubtId) return;
    setLoading(true);
    fetch(`/api/submit-doubt?id=${doubtId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.doubt) {
          setDoubt(data.doubt);
          setError(null);
        } else {
          setError("Doubt not found.");
        }
      })
      .catch(() => setError("Failed to load doubt."))
      .finally(() => setLoading(false));
  }, [doubtId]);

  // Mark as resolved handler
  const handleMarkResolved = async () => {
    if (!doubt) return;
    try {
      const resp = await fetch("/api/submit-doubt", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: doubt.id }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        toast({ title: "Failed to mark as resolved", description: err.error || "", variant: "destructive" });
        return;
      }
      toast({ title: "Doubt marked as resolved!", description: "This doubt is now closed." });
      setRefreshKey((k) => k + 1);
      // Refetch doubt
      setLoading(true);
      fetch(`/api/submit-doubt?id=${doubt.id}`)
        .then((res) => res.json())
        .then((data) => setDoubt(data.doubt))
        .finally(() => setLoading(false));
    } catch (err) {
      toast({ title: "Error", description: "Could not mark as resolved.", variant: "destructive" });
    }
  };

  if (loading) return <div className="p-8 text-muted-foreground">Loading doubt...</div>;
  if (error) return <div className="p-8 text-destructive">{error}</div>;
  if (!doubt) return null;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="border rounded-xl p-6 bg-card mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold">{doubt.username}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(doubt.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="text-2xl font-bold mb-2">{doubt.title}</div>
        <div className="text-xl font-semibold mb-2">{doubt.question}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {doubt.tags.map((tag) => (
            <span key={tag} className="bg-muted text-xs rounded-full px-2 py-1 border">
              {tag}
            </span>
          ))}
        </div>
        {doubt.image_url && (
          <img src={doubt.image_url} alt="Doubt attachment" className="max-h-48 rounded border my-2" />
        )}
        {doubt.resolved && (
          <div className="mt-2 text-green-700 font-semibold flex items-center gap-2">
            <span role="img" aria-label="Solved">✅</span> This doubt has been marked as solved.
          </div>
        )}
        {/* Mark as Resolved button for creator */}
        {!doubt.resolved && session?.user && (
          (session.user.name === doubt.username || session.user.email === doubt.username) && (
            <Button onClick={handleMarkResolved} className="mt-4 bg-green-600 hover:bg-green-700 text-white" variant="default">
              Mark as Resolved
            </Button>
          )
        )}
      </div>
      {/* Response form and list */}
      <DoubtResponseForm doubtId={doubt.id} resolved={doubt.resolved} onResponseSubmitted={() => setRefreshKey((k) => k + 1)} />
      <DoubtResponseList doubtId={doubt.id} resolved={doubt.resolved} refreshKey={refreshKey} />
    </div>
  );
} 