import { Pool } from "pg";
import type { Interest, Source } from "./types";
import { buildPoolConfig } from "./pgConfig";

let pool: Pool | null = null;
let migrated = false;

function getPool(): Pool {
  if (pool) return pool;
  pool = new Pool(buildPoolConfig());
  return pool;
}

async function ensureSchema(): Promise<void> {
  if (migrated) return;
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT,
      phone TEXT,
      interests TEXT[] NOT NULL DEFAULT '{}',
      source TEXT NOT NULL,
      ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (email, source)
    );
    CREATE INDEX IF NOT EXISTS subscribers_created_at_idx ON subscribers (created_at DESC);
    CREATE INDEX IF NOT EXISTS subscribers_source_idx ON subscribers (source);
  `);
  migrated = true;
}

export async function insertSubscriber(input: {
  email: string;
  name?: string;
  phone?: string;
  interests: Interest[];
  source: Source;
  ip?: string;
  userAgent?: string;
}): Promise<{ id: number; isNew: boolean }> {
  await ensureSchema();
  const p = getPool();
  const result = await p.query<{ id: string; xmax: string }>(
    `INSERT INTO subscribers (email, name, phone, interests, source, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (email, source) DO UPDATE
       SET name = COALESCE(EXCLUDED.name, subscribers.name),
           phone = COALESCE(EXCLUDED.phone, subscribers.phone),
           interests = CASE
             WHEN array_length(EXCLUDED.interests, 1) IS NULL THEN subscribers.interests
             ELSE EXCLUDED.interests
           END
     RETURNING id, xmax::text`,
    [
      input.email.toLowerCase().trim(),
      input.name?.trim() || null,
      input.phone?.trim() || null,
      input.interests,
      input.source,
      input.ip || null,
      input.userAgent || null,
    ]
  );
  const row = result.rows[0];
  return { id: Number(row.id), isNew: row.xmax === "0" };
}
