import { Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
// import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import fs = require('fs/promises');
import UserService from '../services/users.service';

export default class LoginController {
  private secretPass: string;

  private token: string;

  constructor(private userService = new UserService()) {
    this.getJwtSecret();
  }

  private jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  public login = async (req: Request, res: Response) => {
    const requestUsers = await this.userService.getAll();
    const users = requestUsers.map(({ id, username, role, email, password }) => (
      { id, username, role, email, password }
    ));
    const { email, password } = req.body;
    const userData = users.find((user) => user.email === email);
    console.log(userData);
    if (!userData) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Email or password invalid' });
    }

    // const isValidPassword = bcrypt.compareSync(password, userData.password);
    if (userData.password !== password) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Email or password invalid' });
    }

    this.token = jwt.sign({ data: email }, this.secretPass, this.jwtConfig);
    res.status(StatusCodes.OK).json({ token: this.token });
  };

  private getJwtSecret = () => {
    fs.readFile('./jwt.evaluation.key', 'utf8')
      .then((secret) => { this.secretPass = secret; })
      .catch((error) => {
        throw new Error(error.message);
      });
  };
}
