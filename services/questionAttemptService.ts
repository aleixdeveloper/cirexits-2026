import { eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { questionAttempts, users } from '@/lib/db/schema';

type QuestionAttemptWithUser = typeof questionAttempts.$inferSelect & {
  user: typeof users.$inferSelect | null;
};

export async function getAllQuestionAttempts(): Promise<
  QuestionAttemptWithUser[]
> {
  const result: QuestionAttemptWithUser[] = await db
    .select({
      id: questionAttempts.id,
      userId: questionAttempts.userId,
      questionId: questionAttempts.questionId,
      shownAfterScanCount: questionAttempts.shownAfterScanCount,
      isCorrect: questionAttempts.isCorrect,
      selectedOption: questionAttempts.selectedOption,
      answeredAt: questionAttempts.answeredAt,
      createdAt: questionAttempts.createdAt,
      user: {
        id: users.id,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      }
    })
    .from(questionAttempts)
    .orderBy(questionAttempts.createdAt)
    .leftJoin(users, eq(questionAttempts.userId, users.id));
  return result;
}

export async function getAllQuestionsWithAttempts() {
  const result = await db
    .select({
      id: questionAttempts.id,
      userId: questionAttempts.userId,
      questionId: questionAttempts.questionId,
      shownAfterScanCount: questionAttempts.shownAfterScanCount,
      isCorrect: questionAttempts.isCorrect,
      selectedOption: questionAttempts.selectedOption,
      answeredAt: questionAttempts.answeredAt,
      createdAt: questionAttempts.createdAt,
      user: {
        id: users.id,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      }
    })
    .from(questionAttempts)
    .orderBy(questionAttempts.createdAt)
    .leftJoin(users, eq(questionAttempts.userId, users.id));
  return result;
}
