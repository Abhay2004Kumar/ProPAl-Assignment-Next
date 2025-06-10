import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded: any = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
