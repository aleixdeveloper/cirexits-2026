import { db } from '../db/db';
import { and, eq, isNull } from 'drizzle-orm';
import { pieces } from '../db/schema';

export async function getPieceById(
  id: string
): Promise<(typeof pieces.$inferSelect & { isFound: boolean }) | void> {
  const piece = await db.query.pieces.findFirst({
    where: eq(pieces.id, id)
  });

  if (!piece) {
    return;
  }

  return {
    ...piece,
    isFound: piece.foundByUserId !== null
  };
}

export async function markPieceAsFound(pieceId: string, userId: string) {
  const [updated] = await db
    .update(pieces)
    .set({
      foundByUserId: userId,
      foundAt: new Date()
    })
    .where(and(eq(pieces.id, pieceId), isNull(pieces.foundByUserId)))
    .returning();

  return updated ?? null;
}

export async function getPiecesFoundByUser(userId: string) {
  return db
    .select({
      pieceId: pieces.id,
      hue: pieces.hue,
      foundAt: pieces.foundAt
    })
    .from(pieces)
    .where(eq(pieces.foundByUserId, userId));
}
