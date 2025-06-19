"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DoubtSubmissionForm } from "@/components/doubt-forum/DoubtSubmissionForm";
import { useToast } from "@/hooks/use-toast";

interface Doubt {
  id: string;
  username: string;
  title: string;
  question: string;
  tags: string[];
  resolved: boolean;
  createdAt: string;
}

export default function DoubtDashboardPage() {
  const { toast } = useToast();
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "solved" | "unsolved">("all");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  const fetchDoubts = () => {
    setLoading(true);
    fetch("/api/submit-doubt")
      .then((res) => res.json())
      .then((data) => {
        setDoubts(data.doubts || []);
        setError(null);
      })
      .catch(() => setError("Failed to load doubts."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  // Filtered and sorted doubts
  const filteredDoubts = doubts
    .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
    .filter((d) =>
      status === "all" ? true : status === "solved" ? d.resolved : !d.resolved
    )
    .sort((a, b) =>
      sort === "latest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Doubt Forum</h1>
        <Button variant="default" onClick={() => setShowModal(true)}>
          + Create a Doubt
        </Button>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          {/* Search by title */}
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-120 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {/* Solved/Unsolved filter */}
          <select
            value={status}
            onChange={e => setStatus(e.target.value as any)}
            className="border rounded px-5 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
          {/* Sort by latest/oldest */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as any)}
            className="border rounded px-5 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-muted-foreground">Loading doubts...</div>
      ) : error ? (
        <div className="text-destructive">{error}</div>
      ) : filteredDoubts.length === 0 ? (
        <div className="text-muted-foreground">No doubts yet. Be the first to ask!</div>
      ) : (
        <ul className="flex flex-col gap-6">
          {filteredDoubts.map((doubt) => (
            <li key={doubt.id} className="border rounded-xl p-5 bg-card hover:shadow transition">
              <Link href={`/doubt/${doubt.id}`} className="block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{doubt.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(doubt.createdAt).toLocaleString()}
                  </span>
                  {doubt.resolved && (
                    <span className="ml-2 text-green-700 font-semibold flex items-center gap-1">
                      <span role="img" aria-label="Solved">✅</span> Solved
                    </span>
                  )}
                </div>
                <div className="text-lg font-semibold mb-1 line-clamp-2">{doubt.title}</div>
                <div className="text-muted-foreground text-sm mb-1 line-clamp-2">{doubt.question}</div>
                <div className="flex flex-wrap gap-2">
                  {doubt.tags.map((tag) => (
                    <span key={tag} className="bg-muted text-xs rounded-full px-2 py-1 border">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="relative w-full max-w-lg overflow-y-auto max-h-screen border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 p-8 animate-[scaleIn_0.18s_ease]"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 6px 0 rgba(0,0,0,0.08)",
            }}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white tracking-tight">
              Create a Doubt
            </h2>
            <DoubtSubmissionForm onSuccess={() => {
              setShowModal(false);
              fetchDoubts();
              toast({
                title: "Doubt submitted!",
                description: "Your doubt has been posted and will soon be answered.",
              });
            }} />
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}