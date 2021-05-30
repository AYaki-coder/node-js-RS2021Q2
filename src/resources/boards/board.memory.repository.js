const DB = require('../../common/inMemoryDB');

/**
 * The Interface describing information about a board
 * @typedef {Object} IBoardInfo
 * @property {string} id - id of a board
 * @property {string} title - title of a board
 * @property {Array<IColumnInfo>} columns - columns of a board
 */

 /**
 * The Interface describing information about a column
 * @typedef {Object} IColumnInfo
 * @property {string} id - id of a column
 * @property {string} title - title of a column
 * @property {number} order - order of a column
 */

 /**
 * Queries all boards from the data base
 * @async
 * @return {Promise<Array<IBoardInfo>>} - Promise array with objects with information about a board
 */
const getAll = async () => DB.getAllBoards();

/**
 * Queries one board from the data base by id
 * @async
 * @param {string} id - the id of a board
 * @return {Promise<IBoardInfo>} - Promise object with information about a board or throws an error if a board was not found
 */
const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new Error(`The Board with id ${id} was not found.`);
  }

  return board;
};

/**
 * Records a new board into the data base
 * @async
 * @param { IBoardInfo } board - an object with information about a board
 * @return {Promise<IBoardInfo>} - Promise object with information about a board
 */
const create = async board => DB.createBoard(board);

/**
 * Updates information about a board
 * @async
 * @param {string} id - id of a board
 * @param {object} data - an object with a key/ some keys of IBoardInfo (the information about a board)
 * @return {Promise<IBoardInfo>} - Promise object with information about a board or throws an error if a board was not found
 */
const update = async (id, data) => {
  const board = await DB.updateBoard(id, data);
  if (!board) {
    throw new Error(`The Board with id ${id} was not found.`);
  }
  return board;
};

/**
 * Removes a board and its tasks from the data base
 * @async
 * @param {string} id - id of a board
 * @return {Promise<ArrayIBoardInfo>} - Promise array with an object with information about the deleted board or throws an error if a board was not found
 */
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
