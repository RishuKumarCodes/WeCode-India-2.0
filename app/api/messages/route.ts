import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prismaClient } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const messages = await prismaClient.message.findMany({
    orderBy: { createdAt: "asc" },
    include: { user: true },
  });
  console.log("chat messages=", messages);
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await request.json();
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const userIdentifier = { email: session.user.email };

  if (!userIdentifier.email) {
    return NextResponse.json(
      { error: "Unable to identify user" },
      { status: 400 }
    );
  }

  try {
    const message = await prismaClient.message.create({
      data: {
        content,
        user: {
          connect: userIdentifier,
        },
      },
      include: { user: true },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
