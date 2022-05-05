import { Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');
import fs = require('fs/promises');
import UsersService from '../services/users.service';

export default class LoginController {
  private secretPass: string;

  private userService;

  constructor() {
    this.getJwtSecret();
    this.userService = new UsersService();
    console.log(this.userService);
  }

  private jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  private token: string;

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(password);
    try {
      // const users = await this.userService.getAll();
      console.log('users');
    } catch (e) {
      console.log(e);
    }
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
