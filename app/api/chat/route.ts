import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function GET() {
  const messages = await prismaClient.message.findMany({
    include: {
      user: true, // include user details
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(messages);
}
