const MIN_SECRET_LENGTH = 32;

const REQUIRED_ENV = [
  'DATABASE_URL',
  'DIRECT_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
] as const;

export type RequiredEnvKey = typeof REQUIRED_ENV[number];

export function getRequiredEnv(key: RequiredEnvKey): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  if (key.startsWith('JWT_') && value.length < MIN_SECRET_LENGTH) {
    throw new Error(`${key} must be at least ${MIN_SECRET_LENGTH} characters long`);
  }
  return value;
}

export function validateEnv() {
  for (const key of REQUIRED_ENV) {
    getRequiredEnv(key);
  }
}
