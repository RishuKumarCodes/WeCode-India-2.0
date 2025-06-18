import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await context.params;

  try {
    const comments = await prismaClient.communityComment.findMany({
      where: {
        postId: postId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("[GET_COMMENTS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await context.params;

  // 1. Authenticate the user
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2. Find user from DB
  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 3. Parse request body
  const body = await req.json();
  const text: string = body.text?.trim();

  if (!text || text.length === 0) {
    return NextResponse.json(
      { error: "Comment text is required" },
      { status: 400 }
    );
  }

  // 4. Create the comment
  try {
    const newComment = await prismaClient.communityComment.create({
      data: {
        message: text,
        postId: postId,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("[CREATE_COMMENT_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
