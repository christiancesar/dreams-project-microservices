import AppError from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function interceptErrorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response<any, Record<string, any>> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      code: err.code,
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}