import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as relations from './relations'; // Adjust the path if they are in the same file

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing.');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: { ...schema, ...relations }
});
