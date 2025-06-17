import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma"; // adjust if needed

export async function GET(req: NextRequest) {
  const posts = await prismaClient.communityPost.findMany({
    include: {
      media: true,
      comments: { select: { id: true } },
      likes: { select: { id: true } },
      sender: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const out = posts.map((p) => ({
    ...p,
    commentCount: p.comments.length,
    likeCount: p.likes.length,
    comments: undefined,
    likes: undefined,
  }));

  return NextResponse.json(out);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "user not authenticated" },
      { status: 401 }
    );
  }

  const { message, media } = await req.json();

  const post = await prismaClient.communityPost.create({
    data: {
      message,
      sender: { connect: { email: session.user.email } },
      media: media
        ? { create: { url: media.url, type: media.type } }
        : undefined,
    },
    include: { media: true },
  });

  return NextResponse.json(post, { status: 201 });
}
