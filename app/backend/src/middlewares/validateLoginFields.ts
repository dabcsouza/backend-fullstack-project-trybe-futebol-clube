import { NextFunction, Request, Response } from 'express';

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const regexValid = /\S+@\S+\.com/;
  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  return regexValid.test(email)
    ? next()
    : res.status(400).send({ message: 'The "email" must be have the format "email@email.com"' });
};

export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    return res.status(400).json({ message: 'The field "email" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" must be longer than 6 characters.' });
  }
  return next();
};
