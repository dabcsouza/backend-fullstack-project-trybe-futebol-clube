import { Request, Response, NextFunction } from 'express';
import matchesSchema, { goalsSchema } from '../schemas/matchesSchema';

const validateMatchesFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await matchesSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    const e = err as Error;
    console.error(e.message);
    const code = e.message.includes('is required') ? 400 : 422;
    res.status(code).json({ message: e.message });
  }
};

export const validateGoals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await goalsSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    const e = err as Error;
    console.error(e.message);
    const code = e.message.includes('is required') ? 400 : 422;
    res.status(code).json({ message: e.message });
  }
};

export default validateMatchesFields;
