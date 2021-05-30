const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const MyUsersDataBase = [];
const MyBoardsDataBase = [];
const MyTasksDataBase = [];

MyUsersDataBase.push(new User(), new User(), new User(), new User());
MyBoardsDataBase.push(new Board(), new Board());

/**
 * The Interface describing information about a user
 * @typedef {Object} IUserInfo
 * @property {string} id - id of a user
 * @property {string} name - name of a user
 * @property {string} login - login of a user
 * @property {string} password - password of a user
 */

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
 * @property {string} order - order of a column
 */

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
 * Queries all users from data base
 * @async
 * @return {Promise<Array<IUserInfo>>} - Promise array with objects with full information about a user
 */
const getAllUsers = async () => MyUsersDataBase.slice(0);

/**
 * Queries one user from the data base by id
 * @async
 * @param {string} id - the id of a user
 * @return {Promise<(IUserInfo | undefined)>} - Promise object with full information about a user or promise undefined if there is no user with such an id
 */
const getUser = async id => MyUsersDataBase.filter(el => el.id === id)[0];


/**
 * Records a new user into the data base
 * @async
 * @param {IUserInfo} user - the full information about a user
 * @return {Promise<IUserInfo>} - Promise object with full information about a user
 */
const createUser = async user => {
  MyUsersDataBase.push(user);
  return user;
};

/**
 * Updates information about a user
 * @param {string} id - id of a user
 * @param {object} data - an object with a key/ some keys of IUserInfo (the full information about a user)
 * @return {IUserInfo | null} - an object with full information about a user or null if there is no user with such an id
 */
const updateUser = (id, data) => {
  const { name, login, password } = data;
  const i = MyUsersDataBase.findIndex(user => user.id === id);
  if (i > -1) {
    MyUsersDataBase[i].name = name;
    MyUsersDataBase[i].login = login;
    MyUsersDataBase[i].password = password;
    return MyUsersDataBase[i];
  }
  return null;
};

/**
 * Removes a user from the data base. User's boards and tasks became unassigned
 * @async
 * @param {string} id - id of a user
 * @return {Promise<Array<IUserInfo>>} - Promise array of objects with full information about all users accept the deleted one
 */
const removeUser = async id => {
  MyTasksDataBase.forEach(item => {
    if (item.userId === id) {
      const tmp = item;
      tmp.userId = null;
    }
  });
  return MyUsersDataBase.splice(
    MyUsersDataBase.findIndex(user => user.id === id),
    1
  );
};

/**
 * Queries all boards from the data base
 * @async
 * @return {Promise<Array<IBoardInfo>>} - Promise array with objects with information about a board
 */
const getAllBoards = async () => MyBoardsDataBase.slice(0);

/**
 * Queries one board from the data base by id
 * @async
 * @param {string} id - the id of a board
 * @return {Promise<(IBoardInfo | undefined)>} - Promise object with full information about a board or promise undefined if there is no board with such an id
 */
const getBoard = async id => MyBoardsDataBase.filter(el => el.id === id)[0];

/**
 * Records a new board into the data base
 * @async
 * @param { IBoardInfo } - an object with information about a board
 * @return {Promise<IBoardInfo>} - Promise object with information about a board
 */
const createBoard = async board => {
  MyBoardsDataBase.push(board);
  return board;
};


/**
 * Updates information about a board
 * @param {string} id - id of a board
 * @param {object} data - an object with a key/ some keys of IBoardInfo (the information about a board)
 * @return {IBoardInfo | null} - object with information about a board or null if there is no board with such an id
 */
const updateBoard = (id, data) => {
  const { title, column } = data;
  const i = MyBoardsDataBase.findIndex(board => board.id === id);
  if (i > -1) {
    MyBoardsDataBase[i].title = title;
    MyBoardsDataBase[i].column = column;
    return MyBoardsDataBase[i];
  }
  return null;
};

/**
 * Removes a board and its tasks from the data base
 * @async
 * @param {string} id - id of a board
 * @return {Promise<IBoardInfo>} - Promise array of objects with full information about all boards accept the deleted one
 */
const removeBoard = async id => {
  for (let i = 0; i < MyTasksDataBase.length; i += 1) {
    if (MyTasksDataBase[i].boardId === id) {
      MyTasksDataBase.splice(i, 1);
      i -=1;
    }
  }
  return MyBoardsDataBase.splice(
    MyBoardsDataBase.findIndex(board => board.id === id),
    1
  );
};

/**
 * Records a new task into the data base
 * @async
 * @param { ITaskInfo } - an object with information about a task
 * @return {Promise<ITaskInfo>} - Promise object with information about a task
 */ 
const createTask = async task => {
  MyTasksDataBase.push(task);
  return task;
};

/**
 * Queries one task from the data base by id
 * @async
 * @param {string} id - the id of a task
 * @return {Promise<(ITaskInfo | undefined)>} -Promise object with full information about a task or promise undefined if there is no task with such an id
 */
const getTask = async id => MyTasksDataBase.filter(el => el.id === id)[0];

/**
 * Queries all tasks from the board
 * @async
 * @param {string} boardId - the id of a chosen board
 * @return {Promise<Array<ITaskInfo>>} - Promise array with objects with information about all task on the chosen board
 */
const getAllTasks = async boardId => MyTasksDataBase.filter(el => el.boardId === boardId);

/**
 * Updates information about a task
 * @param {string} id - id of a task
 * @param {object} data - an object with a key/ some keys of ITaskInfo (the information about a task)
 * @return {ITaskInfo | null } - object with information about a board or null if there is no board with such an id
 */
const updateTask = (id, data) => {
  const { title, order, description, userId, columnId } = data;
  const i = MyTasksDataBase.findIndex(task => task.id === id);
  if (i > -1) {
    MyTasksDataBase[i].title = title;
    MyTasksDataBase[i].order = order;
    MyTasksDataBase[i].description = description;
    MyTasksDataBase[i].userId = userId;
    MyTasksDataBase[i].columnId = columnId;

    return MyTasksDataBase[i];
  }
  return null;
};

/**
 * Removes a task from the data base 
 * @async
 * @param {string} id - id of a task
 * @return {Promise<IBoardInfo>} - Promise array of objects with full information about all tasks accept the deleted one
 */
const removeTask = async id =>
  MyTasksDataBase.splice(
    MyTasksDataBase.findIndex(task => task.id === id),
    1
  );

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
  createTask,
  getTask,
  getAllTasks,
  updateTask,
  removeTask
};
