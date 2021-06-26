import { getRepository } from 'typeorm';
import Board from '../../entities/board';
import { CustomError } from '../../custom-error/custom-error';
import { deleteTaskFromBoard } from '../tasks/task.db.repository';

export const getAll = async (): Promise<Board[]> => getRepository(Board).find();

export const get = async (id: string): Promise<Board> => {
  const board = await getRepository(Board).findOne(id);

  if (!board) {
    throw new CustomError(`The Board with id ${id} was not found.`);
  }

  return board;
};

export const create = async (board: Omit<Board, 'id'>): Promise<Board> => {
  const newBoard = await getRepository(Board).create(board);
  await getRepository(Board).save(newBoard);
  return newBoard;
};

export const update = async (
  id: string,
  data: Partial<Board>
): Promise<Board> => {
  const board = await getRepository(Board).findOne(id);
  if (!board) {
    throw new CustomError(`The Board with id ${id} was not found.`, 404);
  }
  const updatedTask = await getRepository(Board).save({
    ...board,
    ...data,
    id,
  });
  return updatedTask;
};

export const remove = async (id: string): Promise<Board> => {
  const board = await getRepository(Board).findOne(id);

  if (!board) {
    throw new CustomError(`The Board with id ${id} was not found.`, 404);
  }

  await getRepository(Board).delete(id);
  await deleteTaskFromBoard(id);

  return board;
};
