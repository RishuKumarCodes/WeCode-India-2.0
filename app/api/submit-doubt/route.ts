import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST: Submit a doubt or a response
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prismaClient.user.findUnique({
      where: { email: session.user.email },
      select: { name: true, email: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const body = await req.json();
    // If body contains 'doubt_id', treat as a response submission (allow image-only)
    if (body.doubt_id) {
      const { doubt_id, response, image_url } = body;
      const doubtResponse = await prismaClient.doubtResponse.create({
        data: {
          type: 'user_response',
          doubt_id,
          username: user.name || user.email || 'Anonymous',
          response: response || null,
          image_url: image_url || null,
        },
      });
      return NextResponse.json({ doubtResponse });
    }
    // Otherwise, treat as doubt submission
    const { question, title, tags, image_url, resolved } = body;
    if (!title || !question) {
      return NextResponse.json({ error: 'Title and question are required' }, { status: 400 });
    }
    const doubt = await prismaClient.doubt.create({
      data: {
        username: user.name || user.email || 'Anonymous',
        title,
        question,
        tags: tags || [],
        image_url,
        resolved: resolved ?? false,
      },
    });
    return NextResponse.json({ doubt });
  } catch (error) {
    console.error('Error in submit-doubt POST:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

// GET: Get all doubts, a single doubt, or responses for a doubt
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const doubt_id = searchParams.get('doubt_id');
    const id = searchParams.get('id');
    if (doubt_id) {
      // Return all responses for a doubt
      const responses = await prismaClient.doubtResponse.findMany({
        where: { doubt_id },
        orderBy: { created_at: 'asc' },
      });
      return NextResponse.json({ responses });
    }
    if (id) {
      // Return a single doubt by id
      const doubt = await prismaClient.doubt.findUnique({
        where: { id },
      });
      return NextResponse.json({ doubt });
    }
    // Return all doubts
    const doubts = await prismaClient.doubt.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ doubts });
  } catch (error) {
    console.error('Error fetching doubts:', error);
    return NextResponse.json({ error: 'Failed to fetch doubts' }, { status: 500 });
  }
}

// PATCH: Mark a doubt as resolved (only by creator)
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing doubt id' }, { status: 400 });
    }
    // Fetch the doubt
    const doubt = await prismaClient.doubt.findUnique({ where: { id } });
    if (!doubt) {
      return NextResponse.json({ error: 'Doubt not found' }, { status: 404 });
    }
    // Only the creator can resolve
    const user = await prismaClient.user.findUnique({ where: { email: session.user.email }, select: { name: true, email: true } });
    const username = user?.name || user?.email || 'Anonymous';
    if (doubt.username !== username) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    // Mark as resolved
    const updated = await prismaClient.doubt.update({ where: { id }, data: { resolved: true } });
    return NextResponse.json({ doubt: updated });
  } catch (error) {
    console.error('Error marking doubt as resolved:', error);
    return NextResponse.json({ error: 'Failed to mark as resolved' }, { status: 500 });
  }
} 