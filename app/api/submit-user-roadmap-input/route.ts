import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismaClient } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user data from the User table
    const user = await prismaClient.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const {
      goal,
      skill_level,
      months,
      daily_hours,
      target_companies_or_roles,
    } = await req.json();

    // Validate required fields
    if (!goal || !skill_level || !months || !daily_hours) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new roadmap input with user data
    const roadmapInput = await prismaClient.aiRoadmapInput.create({
      data: {
        goal,
        skillLevel: skill_level,
        months: parseInt(months),
        dailyHours: parseInt(daily_hours),
        targetCompaniesOrRoles: target_companies_or_roles || '',
        userId: session.user.id,
        userName: user.name || '',
        userEmail: user.email || '',
      },
    });

    return NextResponse.json(roadmapInput);
  } catch (error) {
    console.error('Error creating roadmap input:', error);
    return NextResponse.json(
      { error: 'Error creating roadmap input' },
      { status: 500 }
    );
  }
} 