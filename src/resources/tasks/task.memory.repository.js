const DB = require('../../common/inMemoryDB');

const getAll = async boardId => DB.getAllTasks(boardId);

const get = async id => {
  const task = await DB.getTask(id);

  if (!task) {
    throw new Error(`The Task with id ${id} was not found.`);
  }

  return task;
};

const create = async task => DB.createTask(task);

const update = async (id, data) => {
  const task = await DB.updateTask(id, data);
  if (!task) {
    throw new Error(`The Task with id ${id} was not found.`);
  }
  return task;
};

const remove = async id => {
  const task = await DB.removeTask(id);

  if (!task) {
    throw new Error(`The User with id ${id} was not found.`);
  }

  return task;
};

module.exports = { getAll, get, create, remove, update };
