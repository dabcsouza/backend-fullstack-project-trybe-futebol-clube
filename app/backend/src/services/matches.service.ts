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
      throw new Error(e.message);
    }
  };

  public getById = async (id: number | string) => {
    try {
      const match = await Matches.findByPk(id);
      return match;
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
      throw new Error(e.message);
    }
  };
}
