import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { users } from '../db/schema';

export async function getUserInfo(id: string): Promise<{
  id: string;
  name: string;
  createdAt: Date;
}> {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user[0];
}
