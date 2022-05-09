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
