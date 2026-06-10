-- Add UI appearance preference to User (idempotent so it can be applied
-- non-destructively against the live Neon DB without a migrate reset).
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "uiTheme" TEXT NOT NULL DEFAULT 'classic';
