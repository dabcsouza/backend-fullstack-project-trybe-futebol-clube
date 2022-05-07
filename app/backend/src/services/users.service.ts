import UsersAtributes from '../interfaces/users.interface';
import Users from '../database/models/Users';

export default class UserService {
  public getAll = async () => {
    try {
      const users = await Users.findAll();
      return users as UsersAtributes[];
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
      throw new Error(e.message);
    }
  };
}
