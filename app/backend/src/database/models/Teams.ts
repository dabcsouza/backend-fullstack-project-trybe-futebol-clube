import { Model, DataTypes } from 'sequelize';
import db from '.';

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

export default Teams;
