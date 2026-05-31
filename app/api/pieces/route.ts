import { db } from '@/lib/db/db';
import { pieces } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  /*   const { name, description, location,  } = await req.json();

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await db.insert(pieces).values({
    location
  });

  return NextResponse.json({ message: 'Piece created', result }); */
}
