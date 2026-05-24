/**
 * config.ts — Single access point for environment variables.
 * Never access process.env directly elsewhere. Add validation here
 * so missing config fails loudly at startup, not silently at runtime.
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}
function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const config = {
  app: {
    url: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
    name: optionalEnv("NEXT_PUBLIC_APP_NAME", "App"),
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  },
  db: {
    url: optionalEnv("DATABASE_URL"),
  },
  // Uncomment and use requireEnv() for keys that must exist:
  // auth: { secret: requireEnv("NEXTAUTH_SECRET") },
} as const;
