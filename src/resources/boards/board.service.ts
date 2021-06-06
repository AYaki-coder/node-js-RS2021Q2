import { IBoardInfo } from './board';
import * as boardsRepo from './board.memory.repository';

/**
 * The Interface describing information about a board
 * @typedef {Object} IBoardInfo
 * @property {string} id - id of a board
 * @property {string} title - title of a board
 * @property {Array<IColumnInfo>} columns - columns of a board
 */

/**
 * The Interface describing information about a column
 * @typedef {Object} IColumnInfo
 * @property {string} id - id of a column
 * @property {string} title - title of a column
 * @property {number} order - order of a column
 */

/**
 * Queries all boards from the data base
 * @return {Promise<Array<IBoardInfo>>} - Promise array with objects with information about a board
 */
export const getAll = (): Promise<Array<IBoardInfo>> => boardsRepo.getAll();

/**
 * Queries one board from the data base by id
 * @param {string} id - the id of a board
 * @return {Promise<IBoardInfo>} - Promise object with information about a board or throws an error if a board was not found
 */
export const get = (id: string): Promise<IBoardInfo> => boardsRepo.get(id);

/**
 * Records a new board into the data base
 * @param { IBoardInfo } board - an object with information about a board
 * @return {Promise<IBoardInfo>} - Promise object with information about a board
 */
export const create = (board: IBoardInfo): Promise<IBoardInfo> =>
  boardsRepo.create(board);

/**
 * Removes a board from the data base
 * @param {string} id - id of a board
 * @return {Promise<Array<IBoardInfo>>} - Promise array with an object with information about the deleted board or throws an error if a board was not found
 */
export const remove = (id: string): Promise<IBoardInfo[]> =>
  boardsRepo.remove(id);

/**
 * Updates information about a board
 * @param {string} id - id of a board
 * @param {object} data - an object with a key/ some keys of IBoardInfo (the information about a board)
 * @return {Promise<IBoardInfo>} - Promise object with information about a board or throws an error if a board was not found
 */
export const update = (
  id: string,
  data: Partial<IBoardInfo>
): Promise<IBoardInfo> => boardsRepo.update(id, data);
