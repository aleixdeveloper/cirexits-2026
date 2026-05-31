import { db } from '@/lib/db/db';
import { questions, questionAttempts } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

export type QuestionStats = {
  id: string;
  question: string;

  optionA: string;
  optionB: string;
  optionC: string;

  correctOption: 'A' | 'B' | 'C';

  totalAttempts: number;
  correctCount: number;
  wrongCount: number;

  optionDistribution: {
    a: number;
    b: number;
    c: number;
  };
};

export async function getQuestionsWithStats(): Promise<QuestionStats[]> {
  const result = await db
    .select({
      id: questions.id,
      question: questions.question,
      optionA: questions.optionA,
      optionB: questions.optionB,
      optionC: questions.optionC,
      correctOption: questions.correctOption,
      totalAttempts: sql<number>`
        count(${questionAttempts.id})::int
      `,

      correctCount: sql<number>`
        count(${questionAttempts.id})
        filter (where ${questionAttempts.isCorrect} = true)::int
      `,

      wrongCount: sql<number>`
        count(${questionAttempts.id})
        filter (where ${questionAttempts.isCorrect} = false)::int
      `,

      optionA_count: sql<number>`
        count(${questionAttempts.id})
        filter (where ${questionAttempts.selectedOption} = 'A')::int
      `,

      optionB_count: sql<number>`
        count(${questionAttempts.id})
        filter (where ${questionAttempts.selectedOption} = 'B')::int
      `,

      optionC_count: sql<number>`
        count(${questionAttempts.id})
        filter (where ${questionAttempts.selectedOption} = 'C')::int
      `
    })
    .from(questions)
    .leftJoin(
      questionAttempts,
      sql`${questionAttempts.questionId} = ${questions.id}`
    )
    .groupBy(questions.id);

  return result.map((q) => {
    const total = q.totalAttempts || 0;

    return {
      id: q.id,
      question: q.question,

      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,

      correctOption: q.correctOption,

      totalAttempts: total,
      correctCount: q.correctCount || 0,
      wrongCount: q.wrongCount || 0,

      optionDistribution: {
        a: total === 0 ? 0 : Math.round((q.optionA_count / total) * 100),

        b: total === 0 ? 0 : Math.round((q.optionB_count / total) * 100),

        c: total === 0 ? 0 : Math.round((q.optionC_count / total) * 100)
      }
    };
  });
}
