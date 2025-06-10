import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  await connectDB();
  const { username, email, password, phone } = await req.json();
  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: 'User exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword, phone });

  return NextResponse.json({ message: 'User created', user: newUser });
}
