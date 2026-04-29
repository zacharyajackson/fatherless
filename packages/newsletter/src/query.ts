import type { Source } from "./types";
import { getPool, ensureSchema } from "./pgConfig";

export type SubscriberRow = {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  interests: string[];
  source: Source;
  created_at: string;
};

export async function listSubscribers(opts: {
  source?: Source;
  limit?: number;
}): Promise<SubscriberRow[]> {
  await ensureSchema();
  const limit = Math.min(Math.max(opts.limit ?? 500, 1), 5000);
  const p = getPool();
  const params: unknown[] = [];
  let where = "";
  if (opts.source) {
    params.push(opts.source);
    where = `WHERE source = $1`;
  }
  const sql = `
    SELECT id, email, name, phone, interests, source, created_at
    FROM subscribers
    ${where}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  const result = await p.query<SubscriberRow>(sql, params);
  return result.rows;
}

export async function countBySource(): Promise<{ source: Source; count: number }[]> {
  await ensureSchema();
  const p = getPool();
  const result = await p.query<{ source: Source; count: string }>(
    `SELECT source, COUNT(*)::text as count FROM subscribers GROUP BY source ORDER BY source`
  );
  return result.rows.map((r) => ({ source: r.source, count: Number(r.count) }));
}
