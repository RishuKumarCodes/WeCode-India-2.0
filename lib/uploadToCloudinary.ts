export async function uploadToCloudinary(
  file: File
): Promise<{ url: string; type: "image" | "video" }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  formData.append("folder", "WeCode_India");
  console.log("Uploading to:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/${file.type.startsWith("video/") ? "video" : "image"}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    console.error("Cloudinary upload failed", await res.text());
    throw new Error("Upload to Cloudinary failed");
  }

  const data = await res.json();

  return {
    url: data.secure_url,
    type: file.type.startsWith("video/") ? "video" : "image",
  };
}
