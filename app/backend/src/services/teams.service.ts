import TeamsAttributes from '../interfaces/teams.interface';
import Teams from '../database/models/Teams';

export default class TeamsService {
  public getAll = async (): Promise<TeamsAttributes[]> => {
    try {
      const teams = await Teams.findAll();
      return teams;
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
      throw new Error(e.message);
    }
  };

  public getById = async (id: number | string) => {
    try {
      const team = await Teams.findByPk(id);
      return team;
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
      throw new Error(e.message);
    }
  };
}
