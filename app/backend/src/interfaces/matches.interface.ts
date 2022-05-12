export default interface CreateMatchesParams {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface GoalsParams {
  id: number | string;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export type MatchResponse = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: { teamName: string },
  teamAway: { teamName: string },
};
