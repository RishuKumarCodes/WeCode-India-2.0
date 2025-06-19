import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismaClient } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch the user by email to get the user id
    const user = await prismaClient.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const roadmapId = searchParams.get('id');

    if (roadmapId) {
      // Fetch single roadmap
      const roadmap = await prismaClient.aiRoadmapInput.findFirst({
        where: {
          id: roadmapId,
          userId: user.id
        }
      });

      if (!roadmap) {
        return NextResponse.json(
          { error: 'Roadmap not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(roadmap);
    }

    // Fetch all roadmaps for the user
    const roadmaps = await prismaClient.aiRoadmapInput.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(roadmaps);
  } catch (error) {
    console.error('Error fetching user roadmaps:', error);
    return NextResponse.json(
      { error: 'Error fetching roadmaps' },
      { status: 500 }
    );
  }
} 