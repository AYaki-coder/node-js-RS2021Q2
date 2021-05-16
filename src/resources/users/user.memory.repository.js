const DB = require('../../common/inMemoryDB');

const getAll = async () => DB.getAllUsers();
// TODO: mock implementation. should be replaced during task development

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new Error(`The User with id ${id} was not found.`);
  }

  return user;
};

const create = async user => DB.createUser(user);

const update = async (id, data) => {
  const user = await DB.updateUser(id, data);
  if (!user) {
    throw new Error(`The User with id ${id} was not found.`);
  }
  return user;
};

const remove = async id => {
  const user = await DB.removeUser(id);

  if (!user) {
    throw new Error(`The User with id ${id} was not found.`);
  }

  return user;
};
module.exports = { getAll, get, create, remove, update };
