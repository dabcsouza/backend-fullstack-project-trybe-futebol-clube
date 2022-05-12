import * as express from 'express';
import cors = require('cors');
import loginRouter from './routes/login.routes';
import errMiddleware from './middlewares/errMiddleware';
import teamsRouter from './routes/teams.routes';
import matchesRouter from './routes/matches.routes';
import leaderboardRouter from './routes/leaderboard.routes';

class App {
  public app: express.Express = express();

  constructor() {
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
    this.app.use(express.json());
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderboardRouter);
    this.app.use(errMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  }
}

export { App };
export const { app } = new App();
