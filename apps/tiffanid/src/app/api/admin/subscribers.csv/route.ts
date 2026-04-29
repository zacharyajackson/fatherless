import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import { listSubscribers } from "@repo/newsletter/query";
import type { Source } from "@repo/newsletter/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_SOURCES: Source[] = ["tiffanid", "htf"];

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sourceParam = req.nextUrl.searchParams.get("source");
  const source = VALID_SOURCES.includes(sourceParam as Source)
    ? (sourceParam as Source)
    : undefined;

  const rows = await listSubscribers({ source, limit: 5000 });

  const header = ["created_at", "email", "name", "phone", "source", "interests"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.created_at,
        r.email,
        r.name ?? "",
        r.phone ?? "",
        r.source,
        r.interests.join("|"),
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  const filename = source
    ? `subscribers-${source}-${stamp()}.csv`
    : `subscribers-${stamp()}.csv`;

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

function csvEscape(v: string): string {
  if (/[",\n\r]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function stamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}
