import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import fs = require('fs/promises');
import jwt = require('jsonwebtoken');

type UserData = {
  id: number,
  username: string,
  role: string,
  email: string,
};

interface NewRequest extends Request {
  userData?: UserData;
}

let secretPass: string;

(() => {
  try {
    fs.readFile('./jwt.evaluation.key', 'utf8')
      .then((secret) => { secretPass = secret; })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (err) {
    const e = err as Error;
    console.log(e.message);
  }
})();

const validateJWT = async (req: NewRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token is required' });
  try {
    const data = jwt.verify(token, secretPass) as jwt.JwtPayload;
    req.userData = data.data as UserData;
  } catch (err) {
    const e = err as Error;
    console.log(e.message);
  }
  return next();
};

export default validateJWT;
