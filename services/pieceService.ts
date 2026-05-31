import { db } from '@/lib/db/db';
import { pieces, SelectPieceFoundBy } from '@/lib/db/schema';
import { and, eq, isNull } from 'drizzle-orm';

export async function scanPiece(userId: string, pieceId: string) {
  const piece = await db.query.pieces.findFirst({
    where: eq(pieces.id, pieceId)
  });

  if (!piece) {
    throw new Error('Piece not found.');
  }

  const [claimedPiece] = await db
    .update(pieces)
    .set({
      foundByUserId: userId,
      foundAt: new Date()
    })
    .where(and(eq(pieces.id, pieceId), isNull(pieces.foundByUserId)))
    .returning();

  return claimedPiece ?? null;
}

export async function getPieceWithFinder(
  pieceId: string
): Promise<SelectPieceFoundBy | null> {
  const piece = await db.query.pieces.findFirst({
    where: eq(pieces.id, pieceId),

    with: {
      foundBy: {
        columns: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!piece) {
    return null;
  }

  return {
    id: piece.id,
    hue: piece.hue,
    foundBy: piece.foundBy,
    foundAt: piece.foundAt
  };
}
