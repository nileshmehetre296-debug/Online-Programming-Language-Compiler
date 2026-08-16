import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env /
if (process.env.NODE_ENV == 'production') {
  dotenv.config({ path: './.env' });
} else if (process.env.NODE_ENV == 'development') {
  dotenv.config({ path: './.env.development' });
} else if (process.env.NODE_ENV == 'stage') {
  dotenv.config({ path: './.env.stage' });
} else {
  dotenv.config({ path: './.env.development' })
}

// Define the environment schema with Zod
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Server configuration
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  HOST: z.string().default('localhost'),

  // aws configuration
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_LOG_GROUP_NAME: z.string().min(1),
});

// Create a type from the schema
type Env = z.infer<typeof envSchema>;

// Validate environment variables and export them
function validateEnv(): Env {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      HOST: process.env.HOST,

      // Aws
      AWS_REGION: process.env.AWS_REGION,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_LOG_GROUP_NAME: process.env.AWS_LOG_GROUP_NAME,
    });

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((issue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
      });

      console.error('\n🔥 Invalid environment variables:');
      errorMessages.forEach((message) => {
        console.error(`  ❌ ${message}`);
      });
      console.error('\nFix the above errors and restart the application.\n');
    } else {
      console.error(
        '\n🔥 An unknown error occurred while validating environment variables:',
        error
      );
    }

    process.exit(1);
  }
}

export const env = validateEnv();

export type { Env };
