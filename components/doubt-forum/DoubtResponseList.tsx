import React, { useEffect, useState } from "react";

interface DoubtResponse {
  id: string;
  username: string;
  response: string;
  image_url?: string | null;
  created_at: string;
}

interface DoubtResponseListProps {
  doubtId: string;
  resolved: boolean;
  refreshKey?: any;
}

export function DoubtResponseList({ doubtId, resolved, refreshKey }: DoubtResponseListProps) {
  const [responses, setResponses] = useState<DoubtResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doubtId) return;
    setLoading(true);
    fetch(`/api/submit-doubt?doubt_id=${doubtId}`)
      .then((res) => res.json())
      .then((data) => {
        setResponses(data.responses || []);
        setError(null);
      })
      .catch(() => setError("Failed to load responses."))
      .finally(() => setLoading(false));
  }, [doubtId, refreshKey]);

  if (loading) return <div className="text-muted-foreground">Loading responses...</div>;
  if (error) return <div className="text-destructive">{error}</div>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Answers from the Community</h3>
      {responses.length === 0 ? (
        <div className="text-muted-foreground">No responses yet. Be the first to help!</div>
      ) : (
        <ul className="flex flex-col gap-4">
          {responses.map((resp) => (
            <li key={resp.id} className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{resp.username}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(resp.created_at).toLocaleString()}
                </span>
              </div>
              <div className="whitespace-pre-line text-base mb-2">{resp.response}</div>
              {resp.image_url && (
                <img src={resp.image_url} alt="Response attachment" className="max-h-40 rounded border" />
              )}
            </li>
          ))}
        </ul>
      )}
      {resolved && (
        <div className="mt-4 text-green-700 font-semibold flex items-center gap-2">
          <span role="img" aria-label="Solved">✅</span> This doubt has been marked as solved.
        </div>
      )}
    </div>
  );
} 