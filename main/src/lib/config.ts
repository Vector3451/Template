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
    name: optionalEnv("NEXT_PUBLIC_APP_NAME", "E-Commerce"),
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  },
  db: {
    url: optionalEnv("DATABASE_URL"),
  },
  stripe: {
    publishableKey: optionalEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    secretKey: optionalEnv("STRIPE_SECRET_KEY"),
  },
};
