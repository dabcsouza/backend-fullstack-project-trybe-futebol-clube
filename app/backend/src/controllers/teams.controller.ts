import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getAll();
    return res.status(StatusCodes.OK).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getById(id);
    if (!team) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Team not found' });
    }
    return res.status(StatusCodes.OK).json(team);
  };
}
