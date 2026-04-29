import type { Interest, Source } from "./types";
import { getPool, ensureSchema } from "./pgConfig";

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
