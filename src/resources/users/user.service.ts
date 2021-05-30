const usersRepo = require('./user.memory.repository');

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
 * @return {Promise<Array<IUserInfo>>} - Promise array with objects with full information about a user
 */
const getAll = () => usersRepo.getAll();

/**
 * Queries one user from the data base by id
 * @param {string} id - the id of a user
 * @return {Promise<IUserInfo>} - Promise object with full information about a user
 */
const get = id => usersRepo.get(id);

/**
 * Records a new user into the data base
 * @param {IUserInfo} user - the full information about a user
 * @return {Promise<IUserInfo>} - Promise object with full information about a user
 */
const create = user => usersRepo.create(user);

/**
 * Removes a user from the data base
 * @param {string} id - id of a user
 * @return {Promise<Array<IUserInfo>>} - Promise array with an object with full information about the deleted user or an error if the user are not found
 */
const remove = id => usersRepo.remove(id);

/**
 * Updates information about a user
 * @param {string} id - id of a user
 * @param {object} data - an object with a key/ some keys of IUserInfo (the full information about a user)
 * @return {Promise<IUserInfo>} - Promise object with full information about a user
 */
const update = (id, data) => usersRepo.update(id, data);

module.exports = { getAll, get, create, remove, update };
