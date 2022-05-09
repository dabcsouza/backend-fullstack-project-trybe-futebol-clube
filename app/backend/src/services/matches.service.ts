import CreateMatchesParams from '../interfaces/matches.interface';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService {
  public getAll = async () => {
    try {
      const matches = await Matches.findAll(
        {
          include: [
            { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
            { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
          ],
        },
      );
      return matches;
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
    }
  };

  public getById = async (id: number | string) => {
    try {
      const match = await Matches.findByPk(id);
      return match;
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
    }
  };

  public create = async ({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress }: CreateMatchesParams) => {
    try {
      const newInsert = await Matches
        .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
      return newInsert;
    } catch (err) {
      const e: Error = err as Error;
      console.error(e.message);
    }
  };

  public finish = async (id: number | string) => {
    try {
      const [updateInProgress] = await Matches
        .update({ inProgress: false }, { where: { id } });
      return updateInProgress;
    } catch (err) {
      const e: Error = err as Error;
      console.error(e.message);
    }
  };
}
