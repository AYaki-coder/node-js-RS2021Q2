import {v4 as uuid} from 'uuid';
import {IBoardInfo, IColumnInfo} from './board';

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

 /** Class representing a board */
class Board {
  readonly id: string;
  readonly title: string;
  readonly columns: IColumnInfo[];
  /** 
   * Create a board model
   * @param { IBoardInfo } - an object with information about a board
   */
  constructor({
    id = uuid(),
    title = 'board with tasks',
    columns = [
      {
        id: uuid(),
        title: 'column1',
        order: 0
      }
    ]
  } : IBoardInfo) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Create an object for a response
   * @param { IBoardInfo } board - an object with information about a board
   * @return { IBoardInfo } - an object with information about a board
   */
  static toResponse(board : IBoardInfo) : IBoardInfo {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
