import { Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
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
    const users = await this.userService.getAll();
    console.log(users);
    const { email, password } = req.body;
    console.log(password);
    this.token = jwt.sign({ data: email }, this.secretPass, this.jwtConfig);
    res.status(200).json({ token: this.token });
  };

  private getJwtSecret = () => {
    fs.readFile('./jwt.evaluation.key', 'utf8')
      .then((secret) => { this.secretPass = secret; })
      .catch((error) => {
        throw new Error(error.message);
      });
  };
}
