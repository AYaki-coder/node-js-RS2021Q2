import { getRepository, DeleteResult } from 'typeorm';
import Task from './../../entities/task';
import { CustomError } from '../../custom-error/custom-error';

export const getAll = async (boardId: string): Promise<Task[]> =>
  getRepository(Task).find({ where: { boardId: boardId } });

export const get = async (id: string): Promise<Task> => {
  const task = await getRepository(Task).findOne(id);
  if (!task) {
    throw new CustomError(`The Task with id ${id} was not found.`, 404);
  }

  return task;
};

export const create = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const newTask = await getRepository(Task).create(task);
  await getRepository(Task).save(newTask);
  return newTask;
};

export const update = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const task = await getRepository(Task).findOne(id);
  if (!task) {
    throw new CustomError(`The Task with id ${id} was not found.`, 404);
  }
  const updatedTask = await getRepository(Task).save({ ...task, ...data, id });
  return updatedTask;
};

export const remove = async (id: string): Promise<Task> => {
  const task = await getRepository(Task).findOne(id);

  if (!task) {
    throw new CustomError(`The Task with id ${id} was not found.`, 404);
  }
  await getRepository(Task).delete(id);

  return task;
};

export const unassignUserFromTask = async (userId: string): Promise<Task[]> => {
  const tasks = await getRepository(Task).find({ where: { userId: userId } });
  return Promise.all(
    tasks.map((el) => {
      el.userId = null;
      return getRepository(Task).save(el);
    })
  );
};

export const deleteTaskFromBoard = async (
  boardId: string
): Promise<DeleteResult[]> => {
  const tasks = await getRepository(Task).find({ where: { boardId: boardId } });
  return Promise.all(tasks.map((el) => getRepository(Task).delete(el)));
};
