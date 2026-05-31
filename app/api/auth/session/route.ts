import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
/* import { auth } from '../[...nextauth]/route'; */

export async function GET() {
  const session = await auth();
  return NextResponse.json(session);
}
