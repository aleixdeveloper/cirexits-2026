import { count, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { pieces } from '../db/schema';

/* export async function getTotalHiddenPieces(): Promise<
  {
    count: number;
  }[]
> {
  return await db
    .select({ count: count() })
    .from(pieces)
    .where(eq(pieces.isFound, false));
}
 */
export async function getPiecesByState() {
  /*  const unset = await db
    .select({ count: count() })
    .from(pieces)
    .where(eq(pieces.isFound, false));
  const hidden = await db
    .select({ count: count() })
    .from(pieces)
    .where(eq(pieces.isFound, false));
  const found = await db
    .select({ count: count() })
    .from(pieces)
    .where(eq(pieces.isFound, true));
  return {
    unset: unset[0].count,
    hidden: hidden[0].count,
    found: found[0].count
  }; */
}
