import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams.service';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    private teamsService = new TeamsService(),
  ) { }

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

  public verifyTeamId = async (id: number | string) => {
    const team = await this.teamsService.getById(id);
    return team;
  };

  public create = async (req: Request, res: Response) => {
    const { awayTeam, homeTeam, inProgress } = req.body;
    const inProgressValue = inProgress || true;
    const isHomeTeam = await this.verifyTeamId(homeTeam);
    const isAwayTeam = await this.verifyTeamId(awayTeam);
    if (!isHomeTeam || !isAwayTeam) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no team with such id!' });
    }
    if (awayTeam === homeTeam) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const response = await this.matchesService
      .create({ ...req.body, inProgress: inProgressValue });
    return res.status(StatusCodes.CREATED).json(response);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = this.matchesService.finish(id);
    if (!response) return res.status(StatusCodes.NOT_FOUND).json({ message: 'no match found' });
    return res.status(StatusCodes.OK).json({ message: 'Update success' });
  };

  public updateGoals = async (req: Request, res: Response) => {
    const { awayTeamGoals, homeTeamGoals } = req.body;
    const { id } = req.params;
    if (!awayTeamGoals && !homeTeamGoals) {
      const response = this.matchesService.finish(id);
      if (!response) return res.status(StatusCodes.NOT_FOUND).json({ message: 'No match found' });
      return res.status(StatusCodes.OK).json({ message: 'Update inProgress success' });
    }

    await this.matchesService
      .updateGoals({ id, awayTeamGoals, homeTeamGoals });
    return res.status(StatusCodes.OK).json({ message: 'Goals update success' });
  };
}
