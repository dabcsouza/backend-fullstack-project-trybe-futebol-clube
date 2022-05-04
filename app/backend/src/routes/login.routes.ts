import express = require('express');
import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { validateEmail, validatePassword } from '../middlewares/validateLoginFields';

const loginRouter: Router = express.Router();
const loginController = new LoginController();

loginRouter.post(
  '/login',
  validateEmail,
  validatePassword,
  loginController.login,
);

export default loginRouter;
