/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress!: number;
}

Matches.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.INTEGER,
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Teams.belongsTo(Matches, {
  foreignKey: 'homeTeam',
  as: 'homeTeam',
});

Teams.belongsTo(Matches, {
  foreignKey: 'awayTeam',
  as: 'awayTeam',
});

export default Matches;
