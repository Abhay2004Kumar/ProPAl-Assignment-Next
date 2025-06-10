import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Use correct path for both development and production
    const filePath = path.join(process.cwd(), 'public/config', 'stt.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const { stt } = JSON.parse(fileContents);

    return NextResponse.json(
      { stt },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600'
        }
      }
    );
  } catch (error) {
    console.error('STT config error:', error);
    return NextResponse.json(
      { error: 'Failed to load STT config' },
      { status: 500 }
    );
  }
}