import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await context.params;

  try {
    const post = await prismaClient.communityPost.findUnique({
      where: {
        id: postId,
      },
      include: {
        media: true,
        comments: true,
        likes: true,
        sender: { select: { id: true, name: true, image: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const out = {
      ...post,
      commentCount: post.comments.length,
      likeCount: post.likes.length,
      comments: post.comments,
      likes: post.likes,
    };

    return NextResponse.json(out, { status: 200 });
  } catch (error) {
    console.error("[GET_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
