// Database configuration for Vercel (optional)
// This project works as a static landing page without a database
// Uncomment below if you need database functionality in the future

/*
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL must be set. Did you forget to provision a database?'
  );
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
*/

// Placeholder export for compatibility
export const db = null;
