import './load-env';
import { createApp } from "./app";
import http from 'node:http';
import { env } from "./config/env";
import { logger } from './config/logger';


async function main(): Promise<void> {

    const app = createApp();

    const server = http.createServer(app);

    server.listen(env.PORT, async () => {
        logger.info(
            { port: env.PORT, env: env.NODE_ENV },
            `server listening on :${env.PORT}`,
        );
    });

}

main().catch((error) => {
    logger.fatal({ error }, 'failed to start server');
    process.exit(1);
});