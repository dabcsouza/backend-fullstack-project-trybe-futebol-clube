import { Request, Response, Router } from 'express';
import express = require('express');
import { StatusCodes } from 'http-status-codes';
import LoginController from '../controllers/login.controller';
import { validateEmail, validatePassword } from '../middlewares/validateLoginFields';
import validateJWT from '../middlewares/validateJWT';

const loginRouter: Router = express.Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  validateEmail,
  validatePassword,
  loginController.login,
);

type UserData = {
  id: number,
  username: string,
  role: string,
  email: string,
};

interface NewRequest extends Request {
  userData?: UserData;
}

loginRouter.get(
  '/validate',
  validateJWT,
  async (req: NewRequest, res: Response) => {
    const data = req.userData as UserData;
    return res.status(StatusCodes.OK).send(data.role);
  },
);

export default loginRouter;
