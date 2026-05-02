import { Response } from 'express';

export function sendError(res: Response, error: unknown, status = 400, message = 'Request failed') {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error);
  }
  return res.status(status).json({
    status: 'error',
    message,
  });
}
