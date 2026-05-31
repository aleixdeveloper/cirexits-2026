import { db } from '@/lib/db/db';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  /* const result = await db.execute(sql`
    SELECT 
      users.id, 
      users.name, 
      COUNT(found_pieces.id) AS score
    FROM users
    LEFT JOIN found_pieces ON users.id = found_pieces.user_id
    GROUP BY users.id
    ORDER BY score DESC;
  `);

  return NextResponse.json(result.rows); */
}
