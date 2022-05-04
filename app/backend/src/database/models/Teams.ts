/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './Matches';

class Teams extends Model {
  public teamName!: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Matches.hasOne(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamName',
});

Matches.hasOne(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamName',
});

export default Teams;
