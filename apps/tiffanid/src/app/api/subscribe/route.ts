import { createSubscribeHandler } from "@repo/newsletter/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createSubscribeHandler("tiffanid");
