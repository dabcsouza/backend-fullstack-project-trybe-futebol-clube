import { MatchResponse } from '../interfaces/matches.interface';
import { ObjStructure,
  ObjStructureString, TeamGameType } from '../interfaces/leaderboard.interface';
import MatchesService from './matches.service';
import { converArrObjKeyToString, oderArray } from '../utils/utilsFunctions';
import TeamsService from './teams.service';

export default class LeaderboardService {
  public teams: (string | undefined)[];

  public matches: MatchResponse[];

  private arrayStructure: ObjStructure[];

  private typeCall: string | undefined;

  constructor(
    private matchesService = new MatchesService(),
    private teamsService = new TeamsService(),
  ) { }

  public getAll = async (callRoute: string | undefined): Promise<ObjStructureString[]> => {
    this.typeCall = callRoute;
    await this.setMatches();
    await this.setTeams();
    const teamGames: TeamGameType[] = this.teams.map((team) => (
      {
        name: team,
        homeGames: this.matches.filter((match: MatchResponse) => match.teamHome
          .teamName === team && match.inProgress === false),
        awayGames: this.matches.filter((match: MatchResponse) => match.teamAway
          .teamName === team && match.inProgress === false),
      }
    )) || undefined;

    const result = this.fillTotalGames(teamGames);
    result.sort(oderArray);
    const response = converArrObjKeyToString(result);
    return response;
  };

  private setObjStructure = () => {
    this.arrayStructure = this.teams.map((team) => ({
      name: team || '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
  };

  private setTeams = async () => {
    const teamsResponse = await this.teamsService.getAll();
    this.teams = teamsResponse.map((team) => team.teamName);
    this.setObjStructure();
  };

  private setMatches = async () => {
    const matchesResponse = await this.matchesService.getAll();
    const matches = matchesResponse?.map((el) => ({
      id: el.id,
      homeTeam: el.homeTeam,
      homeTeamGoals: el.homeTeamGoals,
      awayTeam: el.awayTeam,
      awayTeamGoals: el.awayTeamGoals,
      inProgress: el.inProgress,
      teamHome: el.teamHome,
      teamAway: el.teamAway,
    }));
    this.matches = matches as MatchResponse[];
  };

  private fillTotalGames = (
    games: TeamGameType[] | undefined,
  ): ObjStructure[] => {
    const teamGames = games as TeamGameType[];
    const response: ObjStructure[] = this.arrayStructure.map((team: ObjStructure, i) => {
      const obj = { ...team };
      if (this.typeCall === 'home') {
        obj.totalGames = teamGames[i].homeGames.length;
      } else if (this.typeCall === 'away') {
        obj.totalGames = teamGames[i].awayGames.length;
      } else { obj.totalGames = teamGames[i].awayGames.length + teamGames[i].homeGames.length; }

      return obj;
    });
    return this.fillTotalLoses(response, teamGames);
  };

  private fillTotalLoses(objResponse: ObjStructure[], games: TeamGameType[]): ObjStructure[] {
    const response = objResponse;
    const teamGames = games as TeamGameType[];
    response.forEach((team: ObjStructure, i) => {
      const obj = team;
      if (this.typeCall === 'home') {
        obj.totalLosses = teamGames[i].homeGames
          .filter((el) => el.homeTeamGoals < el.awayTeamGoals).length;
      } else if (this.typeCall === 'away') {
        obj.totalLosses = teamGames[i].awayGames
          .filter((el) => el.homeTeamGoals > el.awayTeamGoals).length;
      } else {
        obj.totalLosses = teamGames[i].homeGames
          .filter((el) => el.homeTeamGoals < el.awayTeamGoals).length
      + teamGames[i].awayGames
        .filter((el) => el.homeTeamGoals > el.awayTeamGoals).length;
      }
      return obj;
    }); return this.fillTotalDraws(response, teamGames);
  }

  private fillTotalDraws(objResponse: ObjStructure[], games: TeamGameType[]): ObjStructure[] {
    const response = objResponse;
    const teamGames = games as TeamGameType[];
    response.forEach((team: ObjStructure, i) => {
      const obj = team;
      if (this.typeCall === 'home') {
        obj.totalDraws = teamGames[i].homeGames
          .filter((el) => el.homeTeamGoals === el.awayTeamGoals).length;
      } else if (this.typeCall === 'away') {
        obj.totalDraws = teamGames[i].awayGames
          .filter((el) => el.homeTeamGoals === el.awayTeamGoals).length;
      } else {
        obj.totalDraws = teamGames[i].homeGames
          .filter((el) => el.homeTeamGoals === el.awayTeamGoals).length
      + teamGames[i].awayGames
        .filter((el) => el.homeTeamGoals === el.awayTeamGoals).length;
      }
      return obj;
    }); return this.fillTotalVictories(response, teamGames);
  }

  private fillTotalVictories(objResponse: ObjStructure[], games: TeamGameType[]): ObjStructure[] {
    const response = objResponse;
    const teamGames = games as TeamGameType[];
    response.forEach((team: ObjStructure, i) => {
      const obj = team;
      if (this.typeCall === 'home') {
        obj.totalVictories = teamGames[i].homeGames
          .filter((el) => el.homeTeamGoals > el.awayTeamGoals).length;
      } else if (this.typeCall === 'away') {
        obj.totalVictories = teamGames[i].awayGames
          .filter((el) => el.homeTeamGoals < el.awayTeamGoals).length;
      } else {
        obj.totalVictories = teamGames[i].homeGames
          .filter((el) => el.homeTeamGoals > el.awayTeamGoals).length
      + teamGames[i].awayGames
        .filter((el) => el.homeTeamGoals < el.awayTeamGoals).length;
      }
      return obj;
    }); return this.fillFavorGoals(response, teamGames);
  }

  private fillFavorGoals(objResponse: ObjStructure[], games: TeamGameType[]): ObjStructure[] {
    const response = objResponse;
    const teamGames = games as TeamGameType[];
    response.forEach((team: ObjStructure, i) => {
      const obj = team;
      if (this.typeCall === 'home') {
        obj.goalsFavor = teamGames[i].homeGames.reduce((prev, curr) => (
          prev + curr.homeTeamGoals), 0);
      } else if (this.typeCall === 'away') {
        obj.goalsFavor = teamGames[i].awayGames
          .reduce((prev, curr) => (prev + curr.awayTeamGoals), 0);
      } else {
        obj.goalsFavor = teamGames[i].homeGames.reduce((prev, curr) => (
          prev + curr.homeTeamGoals), 0)
        + teamGames[i].awayGames
          .reduce((prev, curr) => (prev + curr.awayTeamGoals), 0);
      }
    });

    return this.fillOwnGoals(response, teamGames);
  }

  private fillOwnGoals(objResponse: ObjStructure[], games: TeamGameType[]): ObjStructure[] {
    const response = objResponse;
    const teamGames = games as TeamGameType[];
    response.forEach((team: ObjStructure, i) => {
      const obj = team;
      if (this.typeCall === 'home') {
        obj.goalsOwn = teamGames[i].homeGames.reduce((prev, curr) => (
          prev + curr.awayTeamGoals), 0);
      } else if (this.typeCall === 'away') {
        obj.goalsOwn = teamGames[i].awayGames
          .reduce((prev, curr) => (prev + curr.homeTeamGoals), 0);
      } else {
        obj.goalsOwn = teamGames[i].homeGames.reduce((prev, curr) => (
          prev + curr.awayTeamGoals), 0)
        + teamGames[i].awayGames
          .reduce((prev, curr) => (prev + curr.homeTeamGoals), 0);
      }
    });
    return this.fillTotalPoints(response);
  }

  private fillTotalPoints = (objResponse: ObjStructure[]): ObjStructure[] => {
    const response = objResponse;

    response.forEach((team: ObjStructure) => {
      const obj = team;
      obj.totalPoints = obj.totalVictories * 3
        + obj.totalDraws * 1;
      obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
    });

    return this.fillEficience(response);
  };

  private fillEficience = (objResponse: ObjStructure[]): ObjStructure[] => {
    const response = objResponse;

    response.forEach((team: ObjStructure) => {
      const obj = team;
      obj.efficiency = +((obj.totalPoints * 100) / (obj.totalGames * 3)).toFixed(2);
    });

    return response;
  };
}
