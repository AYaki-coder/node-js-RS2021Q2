import { getByLogin } from './../users/user.db.repository';
import jwt from 'jsonwebtoken';
import config from './../../common/config';
import { checkHashedPassword } from '../../common/hash-handler';

const { JWT_SECRET_KEY } = config;

export const signToken = async (
  login: string,
  password: string
): Promise<string | null> => {
  const user = await getByLogin(login);

  if (!user || !JWT_SECRET_KEY) {
    return null;
  }

  const { id, password: hashedPassword } = user;

  const isPasswordMached = await checkHashedPassword(password, hashedPassword);

  if (!isPasswordMached) {
    return null;
  }
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};
