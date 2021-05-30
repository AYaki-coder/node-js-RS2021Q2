const DB = require('../../common/inMemoryDB');

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
 * @return {Promise<Array<IUserInfo>>} - an array with objects with full information about a user
 */
const getAll = async () => DB.getAllUsers();

/**
 * Queries one user from the data base by id
 * @async
 * @param {string} id - the id of a user
 * @return {Promise<IUserInfo>} - an object with full information about a user
 */
const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new Error(`The User with id ${id} was not found.`);
  }

  return user;
};

/**
 * Records a new user into the data base
 * @async
 * @param {IUserInfo} user - the full information about a user
 * @return {Promise<IUserInfo>} - an object with full information about a user
 */
const create = async user => DB.createUser(user);

/**
 * Updates information about a user
 * @async
 * @param {string} id - id of a user
 * @param {object} data - an object with a key/ some keys of IUserInfo (the full information about a user)
 * @return {Promise<IUserInfo>} - an object with full information about a user
 */
const update = async (id, data) => {
  const user = await DB.updateUser(id, data);
  if (!user) {
    throw new Error(`The User with id ${id} was not found.`);
  }
  return user;
};

/**
 * Removes a user from the data base
 * @async
 * @param {string} id - id of a user
 * @return {Promise<IUserInfo>} - an object with full information about a user
 */
const remove = async id => {
  const user = await DB.removeUser(id);

  if (!user) {
    throw new Error(`The User with id ${id} was not found.`);
  }

  return user;
};

module.exports = { getAll, get, create, remove, update };
