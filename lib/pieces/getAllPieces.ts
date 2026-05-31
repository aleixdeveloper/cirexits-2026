import { count, desc, eq, isNull } from 'drizzle-orm';
import { db } from '../db/db';
import { pieces, SelectPieceFoundBy, users } from '../db/schema';
import { PIECES_PER_PAGE } from 'app/(dashboard)/admin/cirexits/constants';
import { FoundPiece } from './types';

const piecesPerPage = PIECES_PER_PAGE;

export async function getPieces(
  search: string,
  offset: number
): Promise<{
  pieces: SelectPieceFoundBy[];
  newOffset: number | null;
  totalPieces: number;
}> {
  if (search) {
    const result = await db
      .select({
        id: pieces.id,
        hue: pieces.hue,
        foundAt: pieces.foundAt,

        userId: users.id,
        userName: users.name
      })
      .from(pieces)
      .leftJoin(users, eq(pieces.foundByUserId, users.id))
      .limit(1000);

    return {
      pieces: result.map((row) => ({
        id: row.id,
        hue: row.hue,
        foundAt: row.foundAt,
        foundBy: row.userId
          ? {
              id: row.userId,
              name: row.userName!
            }
          : null
      })),
      newOffset: null,
      totalPieces: result.length
    };
  }

  if (offset === null) {
    return {
      pieces: [],
      newOffset: null,
      totalPieces: 0
    };
  }

  const totalPiecesResult = await db.select({ count: count() }).from(pieces);

  const result = await db
    .select({
      id: pieces.id,
      hue: pieces.hue,
      foundAt: pieces.foundAt,

      userId: users.id,
      userName: users.name
    })
    .from(pieces)
    .leftJoin(users, eq(pieces.foundByUserId, users.id))
    .limit(piecesPerPage)
    .offset(offset);

  const newOffset =
    result.length >= piecesPerPage ? offset + piecesPerPage : null;

  return {
    pieces: result.map((row) => ({
      id: row.id,
      hue: row.hue,
      foundAt: row.foundAt,
      foundBy: row.userId
        ? {
            id: row.userId,
            name: row.userName!
          }
        : null
    })),
    newOffset,
    totalPieces: totalPiecesResult[0].count
  };
}
export async function getFoundPieces(): Promise<FoundPiece[]> {
  const result = await db
    .select({
      id: pieces.id,
      hue: pieces.hue,

      foundAt: pieces.foundAt,

      userId: users.id,
      userName: users.name
    })
    .from(pieces)
    .innerJoin(users, eq(pieces.foundByUserId, users.id))
    .orderBy(desc(pieces.foundAt));

  return result.map((row) => ({
    id: row.id,
    hue: row.hue,
    foundAt: row.foundAt,
    foundBy: {
      id: row.userId,
      name: row.userName
    }
  }));
}

export async function getHiddenPieces() {
  return db.select().from(pieces).where(isNull(pieces.foundByUserId));
}
