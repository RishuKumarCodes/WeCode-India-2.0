
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

type Resource = {
  type: "video" | "doc" | "github";
  title: string;
  url: string;
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const typeLabel =
    resource.type === "video"
      ? "Video"
      : resource.type === "doc"
      ? "Docs"
      : "Repo";

  const icon =
    resource.type === "video" ? "🎥" : resource.type === "doc" ? "📄" : "🐱";

  return (
    <Card className="flex items-center gap-3 px-4 py-3 border bg-card shadow-sm">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline flex items-center"
        >
          {resource.title}
          <ExternalLink className="ml-1 w-4 h-4 text-muted-foreground" />
        </a>
      </div>
      <Badge className="bg-muted text-xs font-semibold px-2">{typeLabel}</Badge>
    </Card>
  );
}
