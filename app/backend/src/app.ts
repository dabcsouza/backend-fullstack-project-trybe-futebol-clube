import * as express from 'express';
import cors = require('cors');
import loginRouter from './routes/login.routes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(loginRouter);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  }
}

export { App };

export const { app } = new App();
