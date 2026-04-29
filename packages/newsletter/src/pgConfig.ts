import { Pool, type PoolConfig } from "pg";

function buildPoolConfig(): PoolConfig {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error("DATABASE_URL is not set");
  }

  // Strip sslmode from the URL — pg-connection-string warns about
  // 'require'/'prefer'/'verify-ca' as deprecated aliases. We pass an
  // explicit ssl config below for verify-full equivalent behavior.
  let connectionString = raw;
  try {
    const u = new URL(raw);
    u.searchParams.delete("sslmode");
    connectionString = u.toString();
  } catch {
    // fall back to raw on parse failure
  }

  return {
    connectionString,
    max: 3,
    idleTimeoutMillis: 10_000,
    ssl: { rejectUnauthorized: true },
  };
}

let pool: Pool | null = null;
let migrated = false;

export function getPool(): Pool {
  if (pool) return pool;
  pool = new Pool(buildPoolConfig());
  return pool;
}

export async function ensureSchema(): Promise<void> {
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
