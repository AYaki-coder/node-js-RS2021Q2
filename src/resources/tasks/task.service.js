const tasksRepo = require('./task.memory.repository');

/**
 * The Interface describing information about a task
 * @typedef {Object} ITaskInfo
 * @property {string} id - id of a task
 * @property {string} title - title of a task
 * @property {number} order - order of a task
 * @property {string} description - description of a task
 * @property {string | null} userId - id of a user who the task is assigned
 * @property {string} boardId - id of a board where the task is
 * @property {string} columnId - id of a column where the task is
 */

 /**
 * Queries all tasks from the data base
 * @return {Promise<Array<ITaskInfo>>} - Promise array with objects with information about a task
 */
const getAll = boardId => tasksRepo.getAll(boardId);

/**
 * Queries one task from the data base by id
 * @param {string} id - the id of a task
 * @return {Promise<ITaskInfo>} - Promise object with information about a task or throws an error if a task was not found
 */
const get = id => tasksRepo.get(id);

/**
 * Records a new task into the data base
 * @param { ITaskInfo } task - an object with information about a task
 * @return {Promise<ITaskInfo>} - Promise object with information about a task
 */
const create = task => tasksRepo.create(task);

/**
 * Removes a task from the data base 
 * @param {string} id - id of a task
 * @return {Promise<Array<ITaskInfo>>} - Promise array with an object with information about the deleted task or throws an error if a task was not found
 */
const remove = id => tasksRepo.remove(id);

/**
 * Updates information about a task
 * @param {string} id - id of a task
 * @param {object} data - an object with a key/ some keys of ITaskInfo (the information about a task)
 * @return {Promise<ITaskInfo>} - Promise object with information about a task or throws an error if a task was not found
 */
const update = (id, data) => tasksRepo.update(id, data);

module.exports = { getAll, get, create, remove, update };
