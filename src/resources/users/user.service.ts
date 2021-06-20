import User from './../../entities/user';
import * as usersRepo from './user.db.repository';

export const getAll = (): Promise<Array<User>> => usersRepo.getAll();

export const get = (id: string): Promise<User> => usersRepo.get(id);

export const create = (user: Omit<User, 'id'>): Promise<User> =>
  usersRepo.create(user);

export const remove = (id: string): Promise<User> => usersRepo.remove(id);

export const update = (id: string, data: Partial<User>): Promise<User> =>
  usersRepo.update(id, data);
