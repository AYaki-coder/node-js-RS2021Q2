import User from './../../entities/user';
import * as usersRepo from './user.db.repository';
import { hashPassword } from '../../common/hash-handler';

export const getAll = (): Promise<Array<User>> => usersRepo.getAll();

export const get = (id: string): Promise<User> => usersRepo.get(id);

export const create = async (user: Omit<User, 'id'>): Promise<User> => {
  const { password } = user;
  user.password = await hashPassword(password);
  return usersRepo.create(user);
};

export const remove = (id: string): Promise<User> => usersRepo.remove(id);

export const update = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const { password } = data;
  if (password) {
    data.password = await hashPassword(password);
  }
  return usersRepo.update(id, data);
};
