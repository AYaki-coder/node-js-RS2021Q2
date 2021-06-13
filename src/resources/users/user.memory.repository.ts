import * as DB from '../../common/inMemoryDB';
import { CustomError } from '../../custom-error/custom-error';
import { IUserInfo } from './user';

/**
 * The Interface describing information about a user
 * @typedef {Object} IUserInfo
 * @property {string} id - id of a user
 * @property {string} name - name of a user
 * @property {string} login - login of a user
 * @property {string} password - password of a user
 */

/**
 * Queries all users from data base
 * @async
 * @return {Promise<Array<IUserInfo>>} - Promise array with objects with full information about a user
 */
export const getAll = async (): Promise<Array<IUserInfo>> => DB.getAllUsers();

/**
 * Queries one user from the data base by id
 * @async
 * @param {string} id - the id of a user
 * @return {Promise<IUserInfo>} - Promise object with full information about a user or throws an error if the user was not found
 */
export const get = async (id: string): Promise<IUserInfo> => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new CustomError(`The User with id ${id} was not found.`, 404);
  }

  return user;
};

/**
 * Records a new user into the data base
 * @async
 * @param {IUserInfo} user - the full information about a user
 * @return {Promise<IUserInfo>} - Promise object with full information about a user
 */
export const create = async (user: IUserInfo): Promise<IUserInfo> =>
  DB.createUser(user);

/**
 * Updates information about a user
 * @async
 * @param {string} id - id of a user
 * @param {object} data - an object with a key/ some keys of IUserInfo (the full information about a user)
 * @return {Promise<IUserInfo>} - Promise object with full information about a user or throws an error if the user was not found
 */
export const update = async (
  id: string,
  data: Partial<IUserInfo>
): Promise<IUserInfo> => {
  const user = await DB.updateUser(id, data);
  if (!user) {
    throw new CustomError(`The User with id ${id} was not found.`, 404);
  }
  return user;
};

/**
 * Removes a user from the data base. User's boards and tasks became unassigned
 * @async
 * @param {string} id - id of a user
 * @return {Promise<Array<IUserInfo>>} - Promise array with an object with full information about the deleted user or throws an error if the user was not found
 */
export const remove = async (id: string): Promise<IUserInfo[]> => {
  const user = await DB.removeUser(id);

  if (!user) {
    throw new CustomError(`The User with id ${id} was not found.`, 404);
  }

  return user;
};
