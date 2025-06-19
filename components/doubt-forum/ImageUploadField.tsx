
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";

type ImageUploadFieldProps = {
  value: File | null;
  preview: string | null;
  onChange: (file: File | null) => void;
  loading?: boolean;
};

/**
 * Image upload input + preview, controlled from parent.
 */
export function ImageUploadField({
  value,
  preview,
  onChange,
  loading
}: ImageUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Image size={18} className="text-primary" />
        Upload image (optional)
      </label>
      <div className="flex items-center gap-3">
        <input
          id="image"
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0] ?? null;
            onChange(file);
          }}
          disabled={loading}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1 px-2"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          aria-label="Choose Image"
        >
          <Upload size={16} /> Choose Image
        </Button>
        <span className="text-xs text-muted-foreground italic">
          {value && (value as File).name ? (value as File).name : "No file selected."}
        </span>
      </div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 rounded-lg border object-cover max-h-56 w-auto"
        />
      )}
    </div>
  );
}
