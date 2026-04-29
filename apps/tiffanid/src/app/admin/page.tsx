import { isAdminAuthed } from "@/lib/adminAuth";
import { listSubscribers, countBySource } from "@repo/newsletter/query";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import type { Source } from "@repo/newsletter/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VALID_SOURCES: Source[] = ["tiffanid", "htf"];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const authed = await isAdminAuthed();

  if (!authed) {
    return <LoginForm />;
  }

  const { source: sourceParam } = await searchParams;
  const source = VALID_SOURCES.includes(sourceParam as Source)
    ? (sourceParam as Source)
    : undefined;

  const [subscribers, counts] = await Promise.all([
    listSubscribers({ source, limit: 500 }),
    countBySource(),
  ]);

  return <Dashboard subscribers={subscribers} counts={counts} activeSource={source} />;
}
