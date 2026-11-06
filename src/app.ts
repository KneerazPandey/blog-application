import compression from "compression";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";

export function createApp(): Express {
    const app = express();

    // Body parsing (limiting against the payload bombs)
    app.use(express.json({ limit: '100kb' }));
    app.use(express.urlencoded({ extended: true, limit: '100kb' }));
    app.use(cookieParser());

    // Compression
    app.use(compression());

    return app;
}