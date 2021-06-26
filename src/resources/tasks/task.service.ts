import Task from './../../entities/task';
import * as tasksRepo from './task.db.repository';

export const getAll = (boardId: string): Promise<Task[]> =>
  tasksRepo.getAll(boardId);

export const get = (id: string): Promise<Task> => tasksRepo.get(id);

export const create = (task: Task): Promise<Task> => tasksRepo.create(task);

export const remove = (id: string): Promise<Task> => tasksRepo.remove(id);

export const update = (id: string, data: Partial<Task>): Promise<Task> =>
  tasksRepo.update(id, data);
