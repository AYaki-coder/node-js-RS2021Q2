const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const remove = id => usersRepo.remove(id);

const update = (id, data) => usersRepo.update(id, data);

module.exports = { getAll, get, create, remove, update };
