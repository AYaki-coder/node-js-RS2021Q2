const DB = require('../../common/inMemoryDB');

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
 * Queries all tasks from the board
 * @async
 * @param {string} boardId - the id of a chosen board
 * @return {Promise<Array<ITaskInfo>>} - Promise array with objects with information about all task on the chosen board
 */
const getAll = async boardId => DB.getAllTasks(boardId);

/**
 * Queries one task from the data base by id
 * @async
 * @param {string} id - the id of a task
 * @return {Promise<ITaskInfo>} - Promise object with information about a task or throws an error if a task was not found
 */
const get = async id => {
  const task = await DB.getTask(id);

  if (!task) {
    throw new Error(`The Task with id ${id} was not found.`);
  }

  return task;
};

/**
 * Records a new task into the data base
 * @async
 * @param { ITaskInfo } task - an object with information about a task
 * @return {Promise<ITaskInfo>} - Promise object with information about a task
 */
const create = async task => DB.createTask(task);

/**
 * Updates information about a task
 * @async
 * @param {string} id - id of a task
 * @param {object} data - an object with a key/ some keys of ITaskInfo (the information about a task)
 * @return {Promise<ITaskInfo>} - Promise object with information about a task or throws an error if a task was not found
 */
const update = async (id, data) => {
  const task = await DB.updateTask(id, data);
  if (!task) {
    throw new Error(`The Task with id ${id} was not found.`);
  }
  return task;
};

/**
 * Removes a task from the data base 
 * @async
 * @param {string} id - id of a task
 * @return {Promise<Array<ITaskInfo>>} - Promise array with an object with information about the deleted task or throws an error if a task was not found
 */
const remove = async id => {
  const task = await DB.removeTask(id);

  if (!task) {
    throw new Error(`The Task with id ${id} was not found.`);
  }

  return task;
};

module.exports = { getAll, get, create, remove, update };
