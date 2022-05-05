import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export default <ErrorRequestHandler> function errMiddleware(
  err,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({ message: err.message });
  next(err);
};
