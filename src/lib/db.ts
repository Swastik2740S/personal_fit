import { PrismaClient } from "../../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// ---------------------------------------------------------------------------
// Neon resilience
// ---------------------------------------------------------------------------
// Neon serverless auto-suspends after idle. The first query after a cold start
// can fail with a *connection* error (P1001 "Can't reach database server",
// P1017, or a raw pg ECONNRESET/ETIMEDOUT). These are safe to retry because the
// query never reached the database — no risk of a partial/duplicate write.
// We deliberately do NOT retry statement timeouts (P1008) since those may have
// already executed.
const RETRYABLE_PRISMA_CODES = new Set(["P1001", "P1017"]);
const RETRYABLE_PG_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "EPIPE",
  "57P01", // admin_shutdown
  "57P03", // cannot_connect_now (server starting up)
]);

function isRetryableConnectionError(e: unknown): boolean {
  if (!e || typeof e !== "object") return false;
  const code = (e as { code?: string }).code;
  if (code && (RETRYABLE_PRISMA_CODES.has(code) || RETRYABLE_PG_CODES.has(code))) {
    return true;
  }
  const msg = (e as { message?: string }).message ?? "";
  return /can't reach database|connection terminated|connection closed|server closed the connection|ECONNRESET|ETIMEDOUT/i.test(
    msg
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_ATTEMPTS = 4;

function createPrismaClient() {
  return new PrismaClient({ adapter }).$extends({
    query: {
      async $allOperations({ args, query }) {
        let lastErr: unknown;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
          try {
            return await query(args);
          } catch (e) {
            lastErr = e;
            if (attempt === MAX_ATTEMPTS - 1 || !isRetryableConnectionError(e)) {
              throw e;
            }
            // 150ms, 300ms, 600ms backoff — enough for Neon to wake.
            await sleep(150 * 2 ** attempt);
          }
        }
        throw lastErr;
      },
    },
  });
}

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
