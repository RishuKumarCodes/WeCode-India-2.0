// app/api/community/posts/[id]/like/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prismaClient } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

//
// GET /api/community/posts/:id/like
//    – returns [{ id, name, image }, …]
//
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // load the post’s likes with user info
  const post = await prismaClient.communityPost.findUnique({
    where: { id },
    select: {
      likes: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(post.likes, { status: 200 });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const existing = await prismaClient.communityPost.findUnique({
    where: { id },
    select: { likes: { select: { id: true } } },
  });
  if (!existing) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const already = existing.likes.some((u) => u.id === user.id);

  // toggle
  const updated = await prismaClient.communityPost.update({
    where: { id },
    data: {
      likes: already
        ? { disconnect: { id: user.id } }
        : { connect: { id: user.id } },
    },
    select: {
      id: true,
      _count: { select: { likes: true, comments: true } },
    },
  });

  return NextResponse.json(
    {
      id: updated.id,
      likeCount: updated._count.likes,
      commentCount: updated._count.comments,
      likedByMe: !already,
    },
    { status: 200 }
  );
}
