// src/services/questionService.ts
import { db } from '@/lib/db/db';
import { questions, questionAttempts, pieces } from '@/lib/db/schema';
import { eq, and, isNull, sql } from 'drizzle-orm';

export type QuestionType = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  imageUrl: string | null;
};

export async function prepareQuestionForUser(
  userId: string
): Promise<QuestionType | null> {
  // 1. Check for an active, unanswered question pending (Safe without transaction)
  const [pendingAttempt] = await db
    .select()
    .from(questionAttempts)
    .where(
      and(
        eq(questionAttempts.userId, userId),
        isNull(questionAttempts.answeredAt)
      )
    )
    .limit(1);

  if (pendingAttempt) {
    const [question] = await db
      .select()
      .from(questions)
      .where(eq(questions.id, pendingAttempt.questionId));
    return question;
  }

  // 2. Count current scans
  const [pieceCountRes] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(pieces)
    .where(eq(pieces.foundByUserId, userId));

  const totalScans = pieceCountRes?.count || 0;

  // 3. Find an unattempted question
  const [unattemptedQuestion] = await db
    .select({
      id: questions.id,
      question: questions.question,
      optionA: questions.optionA,
      optionB: questions.optionB,
      optionC: questions.optionC,
      imageUrl: questions.imageUrl
    })
    .from(questions)
    .where(
      sql`${questions.id} NOT IN (
        SELECT question_id FROM ${questionAttempts} WHERE user_id = ${userId}
      )`
    )
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (!unattemptedQuestion) return null;

  // 4. Safely insert using onConflictDoNothing in case of simultaneous requests
  await db
    .insert(questionAttempts)
    .values({
      userId,
      questionId: unattemptedQuestion.id,
      shownAfterScanCount: totalScans,
      selectedOption: null,
      isCorrect: null
    })
    .onConflictDoNothing({
      target: [questionAttempts.userId, questionAttempts.questionId]
    });

  return unattemptedQuestion;
}

export async function submitAnswer(
  userId: string,
  questionId: string,
  selectedOption: 'A' | 'B' | 'C'
) {
  const targetQuestion = await db.query.questions.findFirst({
    where: eq(questions.id, questionId)
  });

  if (!targetQuestion) throw new Error('Question data invalid.');

  const isCorrect = targetQuestion.correctOption === selectedOption;

  const [updatedAttempt] = await db
    .update(questionAttempts)
    .set({
      selectedOption,
      isCorrect,
      answeredAt: new Date()
    })
    .where(
      and(
        eq(questionAttempts.userId, userId),
        eq(questionAttempts.questionId, questionId),
        isNull(questionAttempts.answeredAt)
      )
    )
    .returning();

  if (!updatedAttempt)
    throw new Error('No open attempt found for this question.');

  return { isCorrect, correctAnswer: targetQuestion.correctOption };
}

/* export async function getAllQuestions() {
  return await db.select().from(questions);
}

export async function getPopulatedQuestionWithAttempts() {} */
