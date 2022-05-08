import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

export default class TeamsController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getAll();
    return res.status(StatusCodes.OK).json(matches);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.matchesService.getById(id);
    if (!team) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Match not found' });
    }
    return res.status(StatusCodes.OK).json(team);
  };
}
