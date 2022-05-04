import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;

  public username!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: '400|"email" must be a valid email',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [7, 100],
        msg: '400|"password" length must be longer than 6 characters.',
      },
    },
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Users;
