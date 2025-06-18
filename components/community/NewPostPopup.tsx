"use client";
import * as React from "react";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function NewPostPopup({ setShowCreatePost }) {
  const [postContent, setPostContent] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAddMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handlePostSubmit = async () => {
    let media = null;

    if (selectedFile) {
      try {
        media = await uploadToCloudinary(selectedFile);
      } catch (error) {
        console.error("Media upload failed:", error);
        alert("failed to upload the media");
        return;
      }
    }
    const res = await fetch("/api/community/posts", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        message: postContent,
        media,
      }),
    });
    if (res.ok) {
      setPostContent("");
      setSelectedFile(null);
      setShowCreatePost(false);
    } else {
      alert("failed to share post");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isImageOrVideo =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      if (!isImageOrVideo) {
        alert("Only image and video files are supported.");
        return;
      }
      setSelectedFile(file);
      console.log("Selected media file:", file);
    }
  };

  if (!session) {
    return <p>Not signed in</p>;
  }

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-black/30 backdrop-blur-sm z-50 flex justify-center"
      onClick={() => setShowCreatePost(false)}
    >
      <Card
        className="h-fit mt-20 w-[900px] max-w-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-3 flex gap-3.5 items-center">
          <Image
            src={session.user?.image ?? "/default-avatar.png"}
            alt="Profile"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="pt-1.5">
            <CardTitle>Create Post</CardTitle>
            <CardDescription>
              Share your thoughts, questions, or achievements
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind?"
            className="resize-none"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleAddMediaClick}>
              <ImagePlus className="mr-2 h-4 w-4" />
              Add Media
            </Button>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={!postContent.trim()} onClick={handlePostSubmit}>
            Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NewPostPopup;
