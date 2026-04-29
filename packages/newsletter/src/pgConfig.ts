import type { PoolConfig } from "pg";

export function buildPoolConfig(): PoolConfig {
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
