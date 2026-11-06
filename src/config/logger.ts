import pino from "pino";

export const logger = pino({
    base: {
        service: 'blog-api',
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.token',
            '*.password',
            '*.refreshToken',
        ],
        censor: '[REDACTED]'
    },
});


export const loggerFor = (context: string) => logger.child({ context });