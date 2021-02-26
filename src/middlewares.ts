import express from 'express';
import rateLimit from 'express-rate-limit';

const notFound = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20 // limit each IP to 20 requests per windowMs
});

//  apply to all requests

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error , req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

export default {
  notFound,
  errorHandler,
  limiter
};
