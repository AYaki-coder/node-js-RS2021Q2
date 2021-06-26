import User from '../../entities/user';
import { CustomError } from '../../custom-error/custom-error';
import { getRepository } from 'typeorm';
import { unassignUserFromTask } from '../tasks/task.db.repository';

export const getAll = async (): Promise<User[]> => getRepository(User).find();

export const get = async (id: string): Promise<User> => {
  const user = await getRepository(User).findOne(id);

  if (!user) {
    throw new CustomError(`The User with id ${id} was not found.`, 404);
  }

  return user;
};

export const create = async (user: Omit<User, 'id'>): Promise<User> => {
  const newUser = await getRepository(User).create(user);
  await getRepository(User).save(newUser);
  return newUser;
};

export const update = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const user = await getRepository(User).findOne(id);
  if (!user) {
    throw new CustomError(`The User with id ${id} was not found.`, 404);
  }
  const updatedUser = await getRepository(User).save({ ...user, ...data, id });
  return updatedUser;
};

export const remove = async (id: string): Promise<User> => {
  const user = await getRepository(User).findOne(id);

  if (!user) {
    throw new CustomError(`The User with id ${id} was not found.`, 404);
  }
  await unassignUserFromTask(id);
  await getRepository(User).delete(id);

  return user;
};
