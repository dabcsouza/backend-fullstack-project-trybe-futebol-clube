import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matches extends Model {
  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress!: boolean;
}

Matches.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'matches',
  modelName: 'Users',
  underscored: true,
});

export default Matches;
