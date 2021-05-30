const {v4:uuid} = require('uuid');

/**
 * The Interface describing information about a board
 * @typedef {Object} ITaskInfo
 * @property {string} id - id of a task
 * @property {string} title - title of a task
 * @property {number} order - order of a task
 * @property {string} description - description of a task
 * @property {string | null} userId - id of a user who the task is assigned
 * @property {string} boardId - id of a board where the task is
 * @property {string} columnId - id of a column where the task is
 */

 /** Class representing a task */
class Task {
   /** 
   * Create a task model
   * @param { ITaskInfo } - an object with information about a task
   */
  constructor({
    id = uuid(),
    title = 'task',
    order = 0,
    description = 'string',
    userId = null,
    boardId = 'string',
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Create an object for a response
   * @param { ITaskInfo } board - an object with information about a task
   * @return { ITaskInfo } - an object with information about a task
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
