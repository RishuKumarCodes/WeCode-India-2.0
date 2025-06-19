
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  value: string[];
  setValue: (val: string[]) => void;
  defaultTags?: string[];
  loading?: boolean;
};

/**
 * Handles tag input, adding/removing, and quick-adds.
 */
export function TagInputField({ value, setValue, defaultTags = [], loading }: Props) {
  const [tagInput, setTagInput] = React.useState("");

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    setValue([...value, trimmed]);
    setTagInput("");
  };

  const handleRemoveTag = (removeTag: string) => {
    setValue(value.filter(tag => tag !== removeTag));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {value.map(tag => (
          <span
            key={tag}
            className="flex items-center bg-muted px-3 py-1 rounded-full text-sm font-medium gap-2"
          >
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-1 py-0 h-5 w-5 text-destructive"
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove tag ${tag}`}
              disabled={loading}
            >
              &times;
            </Button>
          </span>
        ))}
        <Input
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          placeholder="Add tag"
          className="w-32 min-w-0 px-2 py-1 text-sm"
          disabled={loading}
          aria-label="Add tag"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleAddTag}
          tabIndex={-1}
          disabled={!tagInput.trim() || value.includes(tagInput.trim()) || loading}
        >
          +
        </Button>
      </div>
      <div className="flex flex-wrap gap-1 mt-1">
        {(defaultTags || []).map(tag => (
          <Button
            key={tag}
            type="button"
            variant={value.includes(tag) ? "default" : "outline"}
            size="sm"
            className="text-xs px-2 py-0 rounded-full"
            onClick={() => {
              if (!value.includes(tag)) setValue([...value, tag]);
            }}
            tabIndex={-1}
            disabled={value.includes(tag) || loading}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
