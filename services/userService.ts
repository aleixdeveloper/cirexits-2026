import { eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import {
  NewUser,
  pieces,
  questionAttempts,
  SelectUserWithCount,
  users
} from '@/lib/db/schema';

export async function createUser(data: NewUser) {
  const [newUser] = await db.insert(users).values(data).returning();

  return newUser;
}

export async function getUserWithCounts(
  userId: string
): Promise<SelectUserWithCount | null> {
  const result = await db
    .select({
      id: users.id,
      name: users.name,

      createdAt: users.createdAt,
      updatedAt: users.updatedAt,

      found_count: sql<number>`
          count(distinct ${pieces.id})::int
        `,

      solved_questions_count: sql<number>`
          count(distinct ${questionAttempts.id})
          filter (
            where ${questionAttempts.isCorrect} = true
          )::int
        `
    })
    .from(users)
    .leftJoin(pieces, eq(pieces.foundByUserId, users.id))
    .leftJoin(questionAttempts, eq(questionAttempts.userId, users.id))
    .where(eq(users.id, userId))
    .groupBy(users.id);

  return result[0] ?? null;
}
