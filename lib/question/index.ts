import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { questionAttempts, questions } from '../db/schema';

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

export async function getAnsweredQuestions(userId: string): Promise<
  {
    id: number;
    questionId: string;
    question: string;
    selectedOption: 'A' | 'B' | 'C' | null;
    optionA: string;
    optionB: string;
    optionC: string;
    isCorrect: boolean | null;
    answeredAt: Date | null;
  }[]
> {
  return await db
    .select({
      id: questionAttempts.id,
      questionId: questionAttempts.questionId,

      question: questions.question,
      optionA: questions.optionA,
      optionB: questions.optionB,
      optionC: questions.optionC,

      selectedOption: questionAttempts.selectedOption,
      isCorrect: questionAttempts.isCorrect,
      answeredAt: questionAttempts.answeredAt
    })
    .from(questionAttempts)
    .innerJoin(questions, eq(questionAttempts.questionId, questions.id))
    .where(eq(questionAttempts.userId, userId));
}
