import { db } from '@/lib/db/db';
import { pieces, questionAttempts, users } from '@/lib/db/schema';
import { desc, eq, isNotNull } from 'drizzle-orm';

export type GameLogEvent =
  | {
      type: 'piece_found';
      userId: string;
      userName: string;
      pieceId: string;
      createdAt: Date;
      isCorrect: null;
    }
  | {
      type: 'question_answered';
      userId: string;
      userName: string;
      questionId: string;
      isCorrect: boolean | null;
      createdAt: Date;
    };

async function getPieceFoundLogs(limit: number) {
  const result = await db
    .select({
      userId: users.id,
      userName: users.name,
      pieceId: pieces.id,
      createdAt: pieces.foundAt
    })
    .from(pieces)
    .innerJoin(users, eq(users.id, pieces.foundByUserId))
    .where(isNotNull(pieces.foundByUserId))
    .orderBy(desc(pieces.foundAt))
    .limit(limit);

  return result
    .filter((r) => r.createdAt !== null)
    .map((r) => ({
      type: 'piece_found' as const,
      ...r,
      createdAt: r.createdAt!, // 👈 safe after filter
      isCorrect: null
    }));
}

async function getQuestionAnswerLogs(limit: number) {
  const result = await db
    .select({
      userId: users.id,
      userName: users.name,

      questionId: questionAttempts.questionId,
      isCorrect: questionAttempts.isCorrect,

      createdAt: questionAttempts.answeredAt
    })
    .from(questionAttempts)
    .innerJoin(users, eq(users.id, questionAttempts.userId))
    .where(isNotNull(questionAttempts.answeredAt))
    .orderBy(desc(questionAttempts.answeredAt))
    .limit(limit);

  return result
    .filter((r) => r.createdAt !== null)
    .map((r) => ({
      type: 'question_answered' as const,
      ...r,
      createdAt: r.createdAt! // 👈 safe
    }));
}

export async function getGameLog(limit = 100): Promise<GameLogEvent[]> {
  const [pieceLogs, questionLogs] = await Promise.all([
    getPieceFoundLogs(limit),
    getQuestionAnswerLogs(limit)
  ]);

  return [...pieceLogs, ...questionLogs]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}
