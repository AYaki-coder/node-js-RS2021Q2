const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = id => tasksRepo.get(id);

const create = task => tasksRepo.create(task);

const remove = id => tasksRepo.remove(id);

const update = (id, data) => tasksRepo.update(id, data);

module.exports = { getAll, get, create, remove, update };
