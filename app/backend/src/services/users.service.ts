import Users from '../database/models/Users';

export default class UserService {
  public static getAll = async () => {
    try {
      const users = await Users.findOne();
      return users;
    } catch (err) {
      const e: Error = err as Error;
      console.log(e.message);
      throw new Error(e.message);
    }
  };
}
