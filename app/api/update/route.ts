import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export function isValidToken(token: string): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  return Boolean(adminToken && token === adminToken);
}

export async function POST(request: NextRequest) {
  const { token, date } = await request.json();

  if (!isValidToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Validate date format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
  }

  await kv.set('last_taco_date', date);

  return NextResponse.json({ success: true });
}
