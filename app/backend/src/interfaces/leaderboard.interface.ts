import { MatchResponse } from './matches.interface';

export default interface LeaderboardItemPattern {
  name: string;
}

export type ObjStructure = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export type ObjStructureString = {
  name: string,
  totalPoints: string,
  totalGames: string,
  totalVictories: string,
  totalDraws: string,
  totalLosses: string,
  goalsFavor: string,
  goalsOwn: string,
  goalsBalance: string,
  efficiency: string,
};

export type TeamGameType = {
  name: string | undefined;
  homeGames: MatchResponse[];
  awayGames: MatchResponse[];
};
