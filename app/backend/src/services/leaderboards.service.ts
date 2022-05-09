import teamsRouter from 'src/routes/teams.routes';
import MatchesService from './matches.service';
import TeamsService from './teams.service';

export default class LeaderBoardsService {
  public teams: { id: number, teamName: string };

  constructor(
    private matchesService = new MatchesService(),
    private teamsService = new TeamsService(),
  ) {
    this.setTeams();
  }

  public setTeams = async () => {
    const teamsResponse = await this.teamsService.getAll();
    console.log(teamsResponse);
  };
}

const instance = new LeaderBoardsService();
