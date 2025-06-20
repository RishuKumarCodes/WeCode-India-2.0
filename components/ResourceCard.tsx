import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, FileText, Github } from "lucide-react";

type Resource = {
  type: "video" | "doc" | "github";
  title: string;
  url: string;
};

export function ResourceCard({ resource }: { resource: Resource }) {
  // Generate consistent but varied pastel colors based on resource title
  const getResourceConfig = (type: string, title: string) => {
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Pastel color palette
    const pastelColors = [
      {
        cardBg: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
        iconBg: "bg-pink-100 dark:bg-pink-900/30",
        iconColor: "text-pink-600 dark:text-pink-400",
        badgeColor: "bg-pink-200/70 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300"
      },
      {
        cardBg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
        iconBg: "bg-violet-100 dark:bg-violet-900/30",
        iconColor: "text-violet-600 dark:text-violet-400",
        badgeColor: "bg-violet-200/70 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
      },
      {
        cardBg: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20",
        iconBg: "bg-sky-100 dark:bg-sky-900/30",
        iconColor: "text-sky-600 dark:text-sky-400",
        badgeColor: "bg-sky-200/70 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"
      },
      {
        cardBg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        badgeColor: "bg-emerald-200/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
      },
      {
        cardBg: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
        iconBg: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        badgeColor: "bg-amber-200/70 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
      },
      {
        cardBg: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
        iconBg: "bg-orange-100 dark:bg-orange-900/30",
        iconColor: "text-orange-600 dark:text-orange-400",
        badgeColor: "bg-orange-200/70 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
      },
      {
        cardBg: "bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/20 dark:to-slate-950/20",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        badgeColor: "bg-indigo-200/70 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300"
      },
      {
        cardBg: "bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20",
        iconBg: "bg-lime-100 dark:bg-lime-900/30",
        iconColor: "text-lime-600 dark:text-lime-400",
        badgeColor: "bg-lime-200/70 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300"
      }
    ];

    const colorIndex = Math.abs(hash) % pastelColors.length;
    const colors = pastelColors[colorIndex];

    const getIcon = (type: string) => {
      switch (type) {
        case "video": return Play;
        case "doc": return FileText;
        case "github": return Github;
        default: return ExternalLink;
      }
    };

    const getLabel = (type: string) => {
      switch (type) {
        case "video": return "Video";
        case "doc": return "Docs";
        case "github": return "Repo";
        default: return "Link";
      }
    };

    return {
      label: getLabel(type),
      icon: getIcon(type),
      ...colors
    };
  };

  const config = getResourceConfig(resource.type, resource.title);
  const IconComponent = config.icon;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-0 ${config.cardBg} hover:scale-[1.02]`}>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 text-left w-full"
      >
        <div className={`w-11 h-11 rounded-xl ${config.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm group-hover:text-foreground transition-colors truncate">
              {resource.title}
            </h4>
            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
          </div>
          <Badge variant="outline" className={`text-xs font-medium ${config.badgeColor} border-0`}>
            {config.label}
          </Badge>
        </div>
      </a>
    </Card>
  );
}