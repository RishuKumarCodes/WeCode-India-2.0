import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismaClient } from '@/lib/prisma';
import { generateMonthWisePlan, generateWeeklyBreakdown } from '@/utils/generateRoadmap';
import { convertToTasks } from '@/utils/taskConverter';
import { calculateDashboardAnalytics } from '@/utils/dashboardAnalytics';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roadmapId = searchParams.get('id');
    if (!roadmapId) {
      return NextResponse.json({ error: 'Missing roadmap ID' }, { status: 400 });
    }

    // Fetch roadmap from DB
    const roadmap = await prismaClient.aiRoadmapInput.findFirst({
      where: { id: roadmapId, userEmail: session.user.email }
    });
    if (!roadmap) {
      return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 });
    }

    // Generate plan and tasks
    const monthPlans = generateMonthWisePlan(roadmap.goal, roadmap.skillLevel, Number(roadmap.months));
    const weeklyPlan = generateWeeklyBreakdown(roadmap, monthPlans);
    const weekTasks = convertToTasks(weeklyPlan);

    // Calculate analytics
    const analytics = calculateDashboardAnalytics(weekTasks);

    console.log('All weeks in tasks:', weekTasks);

    return NextResponse.json({ analytics, userName: roadmap.userName || session.user.name });
  } catch (error) {
    console.error('Error generating analytics:', error);
    return NextResponse.json({ error: 'Error generating analytics' }, { status: 500 });
  }
} 