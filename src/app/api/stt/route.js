import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'config', 'stt.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data); // will return { stt: [...] }
  } catch (error) {

    return NextResponse.json({ error: 'Failed to load STT config' }, { status: 500 },error);
  }
}
