
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string; // default: "bash"
  className?: string;
};

export function CodeBlock({ code, language = "bash", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      className={cn(
        "relative group rounded-md bg-muted px-4 py-3 font-mono text-[13px] leading-relaxed mb-2 overflow-x-auto border transition-shadow hover:shadow-md",
        "dark:bg-zinc-900 dark:border-zinc-800",
        className
      )}
    >
      <code className="block whitespace-pre min-w-[60px] text-xs select-text">{code}</code>
      <button
        aria-label="Copy code"
        onClick={handleCopy}
        type="button"
        className={cn(
          "absolute top-2 right-2 p-1 rounded bg-background/80 backdrop-blur text-muted-foreground hover:text-primary transition",
          "border border-border"
        )}
        tabIndex={0}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
