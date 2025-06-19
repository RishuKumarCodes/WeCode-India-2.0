"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ImageUploadField } from "./ImageUploadField";
import { TagInputField } from "./TagInputField";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

const defaultTags = [
  "math",
  "science",
  "coding",
  "history",
  "phase-1",
  "phase-2",
  "domain-general",
  "domain-specific",
];

type FormValues = {
  title: string;
  question: string;
  tags: string[];
  image: File | null;
};

type FormErrors = {
  title?: string;
  question?: string;
  tags?: string;
};

const initialState: FormValues = {
  title: "",
  question: "",
  tags: [],
  image: null,
};

/**
 * Step 4: Submit a doubt - stores form, uplods image to Supabase Storage, stores URL in table.
 * Error handling and UI modularized for clarity.
 */
export function DoubtSubmissionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [doubtId, setDoubtId] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image preview
  useEffect(() => {
    if (!values.image) {
      setImagePreview(null);
      return;
    }
    if (values.image instanceof File) {
      const objectUrl = URL.createObjectURL(values.image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [values.image]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tags change
  const handleTagsChange = (tags: string[]) => {
    setValues((prev) => ({ ...prev, tags }));
  };

  // Handle image change
  const handleImageChange = useCallback((file: File | null) => {
    setValues((prev) => ({ ...prev, image: file }));
  }, []);

  // Validate form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.title.trim()) newErrors.title = "Please enter a title";
    if (!values.question.trim()) newErrors.question = "Please enter your question";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    let image_url: string | null = null;
    try {
      // Upload image to Cloudinary if present
      if (values.image) {
        try {
          const uploadResult = await uploadToCloudinary(values.image);
          image_url = uploadResult.url;
        } catch (uploadErr) {
          toast({
            title: "Image upload failed",
            description: "Could not upload image. Please try again or use a different image.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }
      const resp = await fetch("/api/submit-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          question: values.question,
          tags: values.tags || [],
          image_url,
        }),
      });
      if (!resp.ok) {
        throw new Error("Failed to submit doubt");
      }
      const result = await resp.json();
      setDoubtId(result.doubt?.id || null);
      setResolved(result.doubt?.resolved ?? false);
      toast({
        title: "Doubt submitted!",
        description: "Your doubt has been posted and will soon be answered.",
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description:
          err?.message ||
          "Something went wrong submitting your doubt. Please try again.",
        variant: "destructive",
      });
      console.error("Error in doubt submission:", err);
      return;
    } finally {
      setLoading(false);
    }
    setValues(initialState);
    setImagePreview(null);
  };

  // Helper for resolving feedback
  const handleFeedback = async (wasResolved: boolean) => {
    if (!doubtId) return;
    if (wasResolved) {
      toast({ title: "Doubt resolved!", description: "Glad we could help!" });
      setResolved(true);
    } else {
      toast({ title: "Let us know what you still need!" });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="flex flex-col gap-8">
        {/* Doubt/question details */}
        <section className="flex flex-col gap-4">
          {/* Submission form */}
          {(!resolved) && (
            <form className="flex flex-col gap-6" onSubmit={onSubmit} autoComplete="off">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Enter a short, descriptive title..."
                  className="bg-background border rounded px-3 py-2"
                  disabled={loading}
                  maxLength={100}
                />
                {errors.title && (
                  <span className="text-sm text-destructive">{errors.title}</span>
                )}
              </div>
              {/* Question */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="question">
                  Question / Doubt <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="question"
                  name="question"
                  value={values.question}
                  onChange={handleChange}
                  placeholder="Type your doubt or question here..."
                  rows={4}
                  className="bg-background"
                  disabled={loading}
                />
                {errors.question && (
                  <span className="text-sm text-destructive">{errors.question}</span>
                )}
              </div>
              {/* Tags */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags">
                  Tags <span className="text-destructive">*</span>
                </Label>
                <TagInputField
                  value={values.tags}
                  setValue={handleTagsChange}
                  defaultTags={defaultTags}
                  loading={loading}
                />
                {errors.tags && (
                  <span className="text-sm text-destructive">
                    {errors.tags}
                  </span>
                )}
              </div>
              {/* Image Upload */}
              <ImageUploadField
                value={values.image}
                preview={imagePreview}
                onChange={handleImageChange}
                loading={loading}
              />
              {/* Submit */}
              <Button
                type="submit"
                className="mt-4 w-full text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Doubt"}
              </Button>
            </form>
          )}
        </section>
        {/* --- AI Answer Section --- */}
        {/* CommentSection is not implemented or imported. Uncomment and implement if needed. */}
        {/**
        <CommentSection
          doubtId={doubtId || ""}
          resolved={resolved}
          onResolved={() => setResolved(true)}
        />
        */}
      </CardContent>
    </Card>
  );
}
