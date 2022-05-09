import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.matchesService.getById(id);
    if (!team) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Match not found' });
    }
    return res.status(StatusCodes.OK).json(team);
  };

  public getByQuery = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll();
    if (!matches) return res.status(404).json({ message: 'matches not found' });
    if (!inProgress) return res.status(StatusCodes.OK).json(matches);
    let query: boolean | '';
    if (inProgress === 'true') { query = true; } else if (inProgress === 'false') {
      query = false;
    } else { query = ''; }
    const filtered = matches.filter((el) => el.inProgress === query);
    res.status(StatusCodes.OK).json(filtered);
  };

  public create = async (req: Request, res: Response) => {
    console.log(req.body);
    const inProgress = true;
    const response = await this.matchesService
      .create({ ...req.body, inProgress });
    return res.status(StatusCodes.CREATED).json(response);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = this.matchesService.finish(id);
    if (!response) return res.status(404).json({ message: 'no match found' });
    return res.status(StatusCodes.OK).json({ message: 'Update success' });
  };
}
