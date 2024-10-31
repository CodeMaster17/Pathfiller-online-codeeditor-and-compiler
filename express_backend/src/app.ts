import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app: Application = express();

import codeRouter from './router/codeRouter';
import playgroundRouter from './router/playgroundRouter';
import problemRouter from './router/problemRouter';
import { responseMessage } from './constants/responseMessage';
import httpError from './utils/httpError';
import globalErrorHandler from './middleware/globalErrorHandler';

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));
    } catch (error) {
        httpError(next, error, req, 404);
    }
});

// app.use('/api/v1/auth', u);
app.use('/api/v1/code', codeRouter);
app.use('/api/v1/playground', playgroundRouter);
app.use('/api/v1/problem', problemRouter);

app.use(globalErrorHandler);

export default app;

