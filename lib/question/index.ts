import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { questionAttempts } from '../db/schema';

export async function addSolvedQuestion(userId: string, question: string) {
  /*  await db.insert(questionAttempts).values({
    userId,
    questionId: question,
    shownAfterScanCount: 0,
    selectedOption: 0,
    isCorrect: false,
    answeredAt: new Date()
  }); */
}

export async function getSolvedQuestions(userId: string) {
  const question = await db
    .select()
    .from(questionAttempts)
    .where(eq(questionAttempts.userId, userId));

  return question;
}
