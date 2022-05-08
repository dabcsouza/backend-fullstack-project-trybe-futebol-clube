import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const regexValid = /\S+@\S+\.com/;
  if (!email || email.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }

  return regexValid.test(email)
    ? next()
    : res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'The "email" must be have format "email@email.com"' });
};

export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body;

  if (!password || password.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }

  if (password.length < 7) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: '"password" must be longer than 6 characters.' });
  }
  return next();
};
