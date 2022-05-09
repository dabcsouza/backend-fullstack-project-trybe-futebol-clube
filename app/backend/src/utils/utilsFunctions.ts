import bcrypt = require('bcrypt');

const validatePasswordBc = async (password: string, passwordEncrypted: string) => (
  bcrypt.compare(password, passwordEncrypted)
);

export default validatePasswordBc;
