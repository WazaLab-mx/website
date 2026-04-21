import type { Context } from "https://edge.netlify.com";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const buckets = new Map<string, { count: number; resetAt: number }>();

export default async (request: Request, context: Context) => {
  const ip =
    context.ip ||
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return context.next();
  }

  if (bucket.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please wait before trying again.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.floor(bucket.resetAt / 1000)),
        },
      }
    );
  }

  bucket.count++;
  return context.next();
};

export const config = {
  path: "/api/calculator/*",
};
