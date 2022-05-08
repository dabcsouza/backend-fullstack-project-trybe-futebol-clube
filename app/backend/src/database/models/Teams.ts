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
  tableName: 'teams',
  modelName: 'Teams',
  underscored: true,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Teams;
