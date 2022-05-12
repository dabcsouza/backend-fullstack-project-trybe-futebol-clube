import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import url = require('url');
import LeaderboardService from '../services/leaderboard.service';

export default class Leaderboard {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getAll = async (req: Request, res: Response) => {
    const path = url.parse(req.url).pathname;
    const response = await this.leaderboardService.getAll(path?.replace('/', ''));
    return res.status(StatusCodes.OK).json(response);
  };
}
