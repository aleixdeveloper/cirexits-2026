import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/auth/token') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Only run proxy on these paths
export const config = {};
