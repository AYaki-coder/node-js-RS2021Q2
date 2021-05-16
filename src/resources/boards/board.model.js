const {v4:uuid} = require('uuid');

class Board {
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
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
