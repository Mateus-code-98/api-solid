import { env } from '@/env';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const ExceptionHandler = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({
      message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      issues: error.format(),
      message: 'Validation failed!',
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return res.status(500).json({
    message: 'Internal server error!',
  });
};
