import { Resend } from "resend";
import { INTERESTS, type Interest, type Source } from "./types";

const NOTIFY_TO = ["theeTIFFANID@gmail.com", "zeke@waveride.co"];
const FROM_ADDR = "TIFFANI D <newsletter@tiffanid.com>";

const SOURCE_LABEL: Record<Source, string> = {
  tiffanid: "TIFFANI D site",
  htf: "Heal The Fatherless site",
};

export async function sendNotification(args: {
  email: string;
  name?: string;
  phone?: string;
  interests: Interest[];
  source: Source;
  isNew: boolean;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[newsletter] RESEND_API_KEY not set, skipping notification");
    return;
  }

  const resend = new Resend(apiKey);
  const sourceLabel = SOURCE_LABEL[args.source];
  const interestLabels = args.interests
    .map((i) => INTERESTS.find((x) => x.value === i)?.label)
    .filter(Boolean)
    .join(", ");

  const subjectTag = args.isNew ? "New subscriber" : "Subscriber update";
  const subject = `${subjectTag} from ${sourceLabel}: ${args.email}`;

  const rows: [string, string][] = [
    ["Email", args.email],
    ["Name", args.name || "—"],
    ["Phone", args.phone || "—"],
    ["Interests", interestLabels || "—"],
    ["Source", sourceLabel],
    ["Status", args.isNew ? "New" : "Updated existing"],
  ];

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #111;">${subjectTag}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #222;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #666; vertical-align: top; white-space: nowrap;">${k}</td>
            <td style="padding: 8px 0; vertical-align: top;">${escapeHtml(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    await resend.emails.send({
      from: FROM_ADDR,
      to: NOTIFY_TO,
      subject,
      html,
      text,
      replyTo: args.email,
    });
  } catch (err) {
    console.error("[newsletter] Resend error:", err);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
