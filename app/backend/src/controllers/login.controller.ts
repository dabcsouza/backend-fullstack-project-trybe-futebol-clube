import { Request, Response } from 'express';

export default class LoginController {
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.status(404).json({ response: 'myResponse' });
  };
}
