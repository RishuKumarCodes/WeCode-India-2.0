
import { DsaQuestion } from "@/data/dsa-questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Bookmark, Check, ArrowUp, ArrowDown } from "lucide-react";
import { DSASolutionModal } from "./DSASolutionModal";
import * as React from "react";

type CardProps = {
  question: DsaQuestion;
  solved: boolean;
  bookmarked: boolean;
  onSolvedToggle: () => void;
  onBookmarkToggle: () => void;
};

export function DSAQuestionCard({
  question,
  solved,
  bookmarked,
  onSolvedToggle,
  onBookmarkToggle,
}: CardProps) {
  const [solutionOpen, setSolutionOpen] = React.useState(false);

  return (
    <div className="rounded-2xl bg-card shadow group hover:shadow-lg transition-all border border-border relative flex flex-col justify-between">
      <div className="p-5 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-primary">
            {question.title}
          </h3>
          <button
            className={`ml-2 rounded-full p-2 transition hover-scale
              ${bookmarked ? "bg-yellow-200 text-yellow-700" : "hover:bg-accent/60"}
            `}
            onClick={onBookmarkToggle}
            aria-label={bookmarked ? "Unbookmark" : "Bookmark"}
          >
            <Bookmark size={20} fill={bookmarked ? "#fde047" : "none"} />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge className={`
            px-2 rounded-xl text-xs ${question.difficulty === "Easy" ? "bg-green-100 text-green-700"
              : question.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-700"}
          `}>
            {question.difficulty}
          </Badge>
          <Badge className="bg-muted text-muted-foreground px-2 rounded-xl text-xs">{question.topic}</Badge>
          {question.skills.map(skill => (
            <Badge key={skill} className="bg-accent text-xs px-2 rounded-xl">{skill}</Badge>
          ))}
        </div>
      </div>
      <div className="px-5 pb-3 flex items-center gap-3 flex-wrap text-sm">
        <a
          className="story-link text-primary hover:underline hover-scale"
          href={question.leetCodeLink}
          target="_blank" rel="noopener noreferrer"
        >
          LeetCode
        </a>
        {!!question.tutorialLink && (
          <a
            className="story-link text-blue-600 hover:underline hover-scale"
            href={question.tutorialLink}
            target="_blank" rel="noopener noreferrer"
          >
            Tutorial
          </a>
        )}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto rounded-xl px-3"
          onClick={() => setSolutionOpen(true)}
        >
          Solution
        </Button>
        <Button
          onClick={onSolvedToggle}
          size="icon"
          variant={solved ? "default" : "outline"}
          className={`rounded-full transition ${solved ? "bg-green-500 text-white" : "hover:bg-accent"}`}
          aria-label={solved ? "Mark as unsolved" : "Mark as solved"}
        >
          <Check size={20} />
        </Button>
      </div>
      <DSASolutionModal
        open={solutionOpen}
        onOpenChange={setSolutionOpen}
        title={question.title}
        solutionCode={question.solutionCode}
      />
      <div className="absolute top-4 right-4">
        <div className="flex items-center">
          <span
            className={`rounded-xl px-2 py-0.5 text-xs font-semibold
              ${solved ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}
            `}
          >
            {solved ? "Solved" : "Unsolved"}
          </span>
        </div>
      </div>
    </div>
  );
}
