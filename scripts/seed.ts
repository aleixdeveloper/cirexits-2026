// scripts/seed.ts
import { db } from '../lib/db/db';
import { users, pieces } from '../lib/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await db.delete(pieces);
  await db.delete(users);

  // Users
  const [adminUser] = await db
    .insert(users)
    .values({
      id: '1',
      name: 'admin'
    })
    .returning();

  const [playerUser] = await db
    .insert(users)
    .values({
      id: '2',
      name: 'player1'
    })
    .returning();

  // Pieces
  const [piece1] = await db
    .insert(pieces)
    .values([
      {
        id: '3',
        hue: 0
      },
      {
        id: '4',
        hue: 120
      },
      {
        id: '5',
        hue: 240
      }
    ])
    .returning();

  // Found piece (player found piece1)
  /* await db.insert(pieceScans).values({
    id: 1,
    userId: playerUser.id,
    pieceId: piece1.id
  }); */
  /* 
  // Mark it as found
  await db
    .update(pieces)
    .set({ isFound: true })
    .where(eq(pieces.id, piece1.id)); */

  console.log('✅ Seeding complete!');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
