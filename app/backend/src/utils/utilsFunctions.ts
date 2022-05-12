import bcrypt = require('bcrypt');
import { ObjStructure, ObjStructureString } from '../interfaces/leaderboard.interface';

const validatePasswordBc = async (password: string, passwordEncrypted: string) => (
  bcrypt.compare(password, passwordEncrypted)
);

export default validatePasswordBc;

export const oderArray = (a: ObjStructure, b:ObjStructure) => {
  if (a.totalPoints === b.totalPoints) {
    if (a.totalVictories === b.totalVictories) {
      if (a.goalsBalance === b.goalsBalance) {
        if (a.goalsFavor === b.goalsFavor) {
          return b.goalsOwn - a.goalsOwn;
        }
        return b.goalsFavor - a.goalsFavor;
      }
      return b.goalsBalance - a.goalsBalance;
    }
    return b.totalVictories - a.totalVictories;
  }
  return b.totalPoints - a.totalPoints;
};

export const converArrObjKeyToString = (arrayObj: ObjStructure[]): ObjStructureString[] => {
  const responseArr = arrayObj.map((el) => ({
    name: el.name.toString(),
    totalPoints: el.totalPoints.toString(),
    totalGames: el.totalGames.toString(),
    totalVictories: el.totalVictories.toString(),
    totalDraws: el.totalDraws.toString(),
    totalLosses: el.totalLosses.toString(),
    goalsFavor: el.goalsFavor.toString(),
    goalsOwn: el.goalsOwn.toString(),
    goalsBalance: el.goalsBalance.toString(),
    efficiency: el.efficiency.toString(),
  }));
  return responseArr as ObjStructureString[];
};
