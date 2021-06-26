import * as boardsRepo from './board.db.repository';
import Board from '../../entities/board';

export const getAll = (): Promise<Array<Board>> => boardsRepo.getAll();

export const get = (id: string): Promise<Board> => boardsRepo.get(id);

export const create = (board: Board): Promise<Board> =>
  boardsRepo.create(board);

export const remove = (id: string): Promise<Board> => boardsRepo.remove(id);

export const update = (id: string, data: Partial<Board>): Promise<Board> =>
  boardsRepo.update(id, data);
