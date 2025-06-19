import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, Send, X } from "lucide-react";

interface DoubtResponseFormProps {
  doubtId: string;
  resolved: boolean;
  onResponseSubmitted?: () => void; // callback to refresh list
}

export function DoubtResponseForm({ doubtId, resolved, onResponseSubmitted }: DoubtResponseFormProps) {
  const [response, setResponse] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image preview
  React.useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // Hide success message after 3 seconds
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageClick = () => {
    if (!loading && !resolved && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!response.trim() && !image) {
      setError("Please enter a response or attach an image.");
      return;
    }
    setLoading(true);
    let image_url: string | null = null;
    try {
      // Upload image to Cloudinary if present
      if (image) {
        try {
          const uploadResult = await uploadToCloudinary(image);
          image_url = uploadResult.url;
        } catch (uploadErr) {
          setError("Image upload failed. Please try again or use a different image.");
          setLoading(false);
          return;
        }
      }
      const resp = await fetch("/api/submit-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doubt_id: doubtId, response, image_url }),
      });
      if (!resp.ok) {
        throw new Error("Failed to submit response");
      }
      setResponse("");
      setImage(null);
      setImagePreview(null);
      setSuccess(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (onResponseSubmitted) onResponseSubmitted();
    } catch (err: any) {
      setError(err?.message || "Failed to submit response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardContent className="p-4 flex flex-col gap-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-2 py-2 border focus-within:ring-2 focus-within:ring-primary/40 transition">
            {/* Image icon/button */}
            <button
              type="button"
              onClick={handleImageClick}
              disabled={loading || resolved}
              className="p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/40 transition relative"
              tabIndex={-1}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-8 h-8 object-cover rounded-md border shadow inline-block"
                  />
                  <span
                    onClick={handleRemoveImage}
                    className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer opacity-90 hover:opacity-100"
                    title="Remove image"
                  >
                    <X size={12} />
                  </span>
                </>
              ) : (
                <Paperclip size={22} className="text-muted-foreground" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                disabled={loading || resolved}
              />
            </button>
            {/* Textarea */}
            <textarea
              className="flex-1 bg-transparent px-2 py-2 rounded-md min-h-[40px] max-h-[120px] resize-none focus:outline-none text-base"
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Type your answer here..."
              disabled={loading || resolved}
              rows={1}
              style={{ minHeight: 40, maxHeight: 120 }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!loading && !resolved) handleSubmit();
                }
              }}
            />
            {/* Send button */}
            <Button
              type="submit"
              disabled={loading || resolved}
              className="ml-2 px-3 py-2 h-auto rounded-md"
              size="icon"
              tabIndex={-1}
            >
              <Send size={20} />
            </Button>
          </div>
          {error && <div className="text-destructive text-sm text-center mt-1">{error}</div>}
          {success && <div className="text-green-700 text-sm text-center mt-1">Response submitted!</div>}
          {resolved && (
            <div className="text-green-700 font-semibold flex items-center gap-2 justify-center mt-1">
              <span role="img" aria-label="Solved">✅</span> This doubt has been marked as solved. Replies are disabled.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 