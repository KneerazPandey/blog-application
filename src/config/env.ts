import { z } from "zod";
import { logger } from "./logger";

const EnvSchema = z.object({
    NODE_ENV: z.enum([
        "development",
        "test",
        "production"
    ]).default("development"),

    PORT: z.coerce.number().int().positive().default(8000),

    DATABASE_URL: z.url(),

    REDIS_URL: z.preprocess(
        (value) => value === "" ? undefined : value,
        z.url().optional()
    ),

    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),

    JWT_ACCESS_TTL: z.string().default("15m"),
    JWT_REFRESH_TTL: z.string().default("7d"),
});

export type Env = z.infer<typeof EnvSchema>;

function loadEnv(): Env {

    const parsed = EnvSchema.safeParse(process.env);

    if (!parsed.success) {

        logger.error("Invalid environment variables:");

        parsed.error.issues.forEach((issue) => {
            console.error(
                `- ${issue.path.join(".")}: ${issue.message}`
            );
        });

        process.exit(1);
    }

    logger.info("Environment variables validated successfully!");

    return parsed.data;
}

export const env: Env = loadEnv();
