import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/User';
import connectDB from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';
import { IUser } from '../../../models/User'; // Import the IUser interface

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  try {
    // Remove 'any' and use proper TokenPayload type
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password').lean() as IUser | null;
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}