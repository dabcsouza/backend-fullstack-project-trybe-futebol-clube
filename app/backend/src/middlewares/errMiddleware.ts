import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export default <ErrorRequestHandler> function errMiddleware(
  err,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.code && err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
  next(err);
};
