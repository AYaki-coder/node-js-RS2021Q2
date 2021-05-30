const DB = require('../../common/inMemoryDB');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new Error(`The Board with id ${id} was not found.`);
  }

  return board;
};

const create = async board => DB.createBoard(board);

const update = async (id, data) => {
  const board = await DB.updateBoard(id, data);
  if (!board) {
    throw new Error(`The Board with id ${id} was not found.`);
  }
  return board;
};

const remove = async id => {
  const board = await DB.removeBoard(id);

  if (!board) {
    throw new Error(`The Board with id ${id} was not found.`);
  }

  return board;
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update
};
