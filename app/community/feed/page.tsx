"use client";
import Image from "next/image";
import RightPannel from "@/components/community/RightPannel";
import NewPostPopup from "@/components/community/NewPostPopup";
import PostsFeed from "@/components/community/PostsFeed";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CommunityPage() {
  const { data: session } = useSession();
  const [showcreatePost, setShowCreatePost] = useState(false);

  if (!session) {
    return <p>Not signed in</p>;
  }

  return (
    <div className="bg-[#FCFCFC] pt-8 dark:bg-black">
      <div className="container mx-auto flex gap-6 max-w-[1000px]">
        <div className="space-y-6 flex-1">
          <div
            className="p-4.5 bg-white dark:bg-neutral-800 border rounded-xl flex items-center gap-4 cursor-pointer"
            onClick={() => setShowCreatePost(true)}
          >
            <Image
              src={session.user?.image ?? "/default-avatar.png"}
              alt="Profile"
              width={35}
              height={35}
              className="rounded-full"
            />
            <div className="h-10 border rounded-full flex items-center px-4 text-zinc-500 w-full">
              What do you want to ask or share?
            </div>
          </div>

          {showcreatePost && (
            <NewPostPopup setShowCreatePost={setShowCreatePost} />
          )}

          <hr />
          <PostsFeed />
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block w-[300px]">
          <RightPannel />
        </div>
      </div>
    </div>
  );
}
