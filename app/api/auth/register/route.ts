import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name } = await req.json();

  const existing = await db.select().from(users).where(eq(users.name, name));

  if (existing.length > 0) {
    return NextResponse.json(
      { error: 'Aquest nom ja está agafat' },
      { status: 400 }
    );
  }

  const result = await db
    .insert(users)
    .values({
      name
    })
    .returning({ insertedId: users.id, name: users.name });

  return NextResponse.json({
    message: 'Benvingut/da!',
    result: {
      id: result[0].insertedId,
      name: result[0].name
    }
  });
}
