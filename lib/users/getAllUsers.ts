import { db } from '../db/db';
import { pieces, questionAttempts, users } from '../db/schema';
import { sql, eq, count } from 'drizzle-orm';

export async function getUsers() {
  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(users);

  const userSubquery = db
    .select({
      id: users.id,
      name: users.name,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,

      found_count: sql<number>`count(distinct ${pieces.id})`.as('found_count'),

      correct_answers: sql<number>`
          count(distinct ${questionAttempts.id})
          filter (
            where ${questionAttempts.isCorrect} = true
          )
        `.as('correct_answers')
    })
    .from(users)
    .leftJoin(pieces, eq(users.id, pieces.foundByUserId))
    .leftJoin(questionAttempts, eq(users.id, questionAttempts.userId))
    .groupBy(users.id)
    .as('user_counts');

  const result = await db.select().from(userSubquery);

  return {
    users: result,
    totalUsers: Number(totalCount)
  };
}
