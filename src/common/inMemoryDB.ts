// import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
// import { IUserInfo } from './../resources/users/user';
import { IBoardInfo } from './../resources/boards/board';
import { ITaskInfo } from './../resources/tasks/task';

// const MyUsersDataBase: IUserInfo[] = [];
const MyBoardsDataBase: IBoardInfo[] = [];
const MyTasksDataBase: ITaskInfo[] = [];

// MyUsersDataBase.push(new User(), new User(), new User(), new User());
MyBoardsDataBase.push(new Board(), new Board());

// /**
//  * The Interface describing information about a user
//  * @typedef {Object} IUserInfo
//  * @property {string} id - id of a user
//  * @property {string} name - name of a user
//  * @property {string} login - login of a user
//  * @property {string} password - password of a user
//  */

// /**
//  * The Interface describing information about a board
//  * @typedef {Object} IBoardInfo
//  * @property {string} id - id of a board
//  * @property {string} title - title of a board
//  * @property {Array<IColumnInfo>} columns - columns of a board
//  */

// /**
//  * The Interface describing information about a column
//  * @typedef {Object} IColumnInfo
//  * @property {string} id - id of a column
//  * @property {string} title - title of a column
//  * @property {number} order - order of a column
//  */

// /**
//  * The Interface describing information about a task
//  * @typedef {Object} ITaskInfo
//  * @property {string} id - id of a task
//  * @property {string} title - title of a task
//  * @property {number} order - order of a task
//  * @property {string} description - description of a task
//  * @property {string | null} userId - id of a user who the task is assigned
//  * @property {string} boardId - id of a board where the task is
//  * @property {string} columnId - id of a column where the task is
//  */

// //  /**
// //  * Queries all users from data base
// //  * @async
// //  * @return {Promise<Array<IUserInfo>>} - Promise array with objects with full information about a user
// //  */
// export const getAllUsers = async (): Promise<IUserInfo[]> =>
//   MyUsersDataBase.slice(0);

// /**
//  * Queries one user from the data base by id
//  * @async
//  * @param {string} id - the id of a user
//  * @return {Promise<(IUserInfo | undefined)>} - Promise object with full information about a user or promise undefined if there is no user with such an id
//  */
// export const getUser = async (id: string): Promise<IUserInfo | undefined> =>
//   MyUsersDataBase.filter((el) => el.id === id)[0];

// /**
//  * Records a new user into the data base
//  * @async
//  * @param {IUserInfo} user - the full information about a user
//  * @return {Promise<IUserInfo>} - Promise object with full information about a user
//  */
// export const createUser = async (user: IUserInfo): Promise<IUserInfo> => {
//   MyUsersDataBase.push(user);
//   return user;
// };

// /**
//  * Updates information about a user
//  * @param {string} id - id of a user
//  * @param {object} data - an object with a key/ some keys of IUserInfo (the full information about a user)
//  * @return {IUserInfo | null} - an object with full information about a user or null if there is no user with such an id
//  */
// export const updateUser = (
//   id: string,
//   data: Partial<IUserInfo>
// ): IUserInfo | null => {
//   const item = MyUsersDataBase.find((user) => user.id === id);

//   if (!item) {
//     return null;
//   }

//   item.login = data.login ? data.login : item.login;
//   item.name = data.name ? data.name : item.name;
//   item.password = data.password ? data.password : item.password;
//   return item;
// };

// /**
//  * Removes a user from the data base. User's boards and tasks became unassigned
//  * @async
//  * @param {string} id - id of a user
//  * @return {Promise<Array<IUserInfo>>} - Promise array with an object with full information about the deleted user
//  */
// export const removeUser = async (id: string): Promise<IUserInfo[]> => {
//   MyTasksDataBase.forEach((item) => {
//     if (item.userId === id) {
//       const tmp = item;
//       tmp.userId = null;
//     }
//   });
//   return MyUsersDataBase.splice(
//     MyUsersDataBase.findIndex((user) => user.id === id),
//     1
//   );
// };

/**
 * Queries all boards from the data base
 * @async
 * @return {Promise<Array<IBoardInfo>>} - Promise array with objects with information about a board
 */
export const getAllBoards = async (): Promise<IBoardInfo[]> =>
  MyBoardsDataBase.slice(0);

/**
 * Queries one board from the data base by id
 * @async
 * @param {string} id - the id of a board
 * @return {Promise<(IBoardInfo | undefined)>} - Promise object with full information about a board or promise undefined if there is no board with such an id
 */
export const getBoard = async (id: string): Promise<IBoardInfo | undefined> =>
  MyBoardsDataBase.filter((el) => el.id === id)[0];

/**
 * Records a new board into the data base
 * @async
 * @param { IBoardInfo } board - an object with information about a board
 * @return {Promise<IBoardInfo>} - Promise object with information about a board
 */
export const createBoard = async (board: IBoardInfo): Promise<IBoardInfo> => {
  MyBoardsDataBase.push(board);
  return board;
};

/**
 * Updates information about a board
 * @param {string} id - id of a board
 * @param {object} data - an object with a key/ some keys of IBoardInfo (the information about a board)
 * @return {IBoardInfo | null} - object with information about a board or null if there is no board with such an id
 */
export const updateBoard = (
  id: string,
  data: Partial<IBoardInfo>
): IBoardInfo | null => {
  const item = MyBoardsDataBase.find((board) => board.id === id);
  if (!item) {
    return null;
  }

  item.title = data.title ? data.title : item.title;
  item.columns = data.columns ? data.columns : item.columns;

  return item;
};

/**
 * Removes a board and its tasks from the data base
 * @async
 * @param {string} id - id of a board
 * @return {Promise<Array<IBoardInfo>>} - Promise array with an object with full information about the deleted board
 */
export const removeBoard = async (id: string): Promise<IBoardInfo[]> => {
  for (let i = 0; i < MyTasksDataBase.length; i += 1) {
    if (MyTasksDataBase[i]?.boardId === id) {
      MyTasksDataBase.splice(i, 1);
      i -= 1;
    }
  }
  return MyBoardsDataBase.splice(
    MyBoardsDataBase.findIndex((board) => board.id === id),
    1
  );
};

/**
 * Records a new task into the data base
 * @async
 * @param { ITaskInfo } task - an object with information about a task
 * @return {Promise<ITaskInfo>} - Promise object with information about a task
 */
export const createTask = async (task: ITaskInfo): Promise<ITaskInfo> => {
  MyTasksDataBase.push(task);
  return task;
};

/**
 * Queries one task from the data base by id
 * @async
 * @param {string} id - the id of a task
 * @return {Promise<(ITaskInfo | undefined)>} -Promise object with full information about a task or promise undefined if there is no task with such an id
 */
export const getTask = async (id: string): Promise<ITaskInfo | undefined> =>
  MyTasksDataBase.filter((el) => el.id === id)[0];

/**
 * Queries all tasks from the board
 * @async
 * @param {string} boardId - the id of a chosen board
 * @return {Promise<Array<ITaskInfo>>} - Promise array with objects with information about all task on the chosen board
 */
export const getAllTasks = async (boardId: string): Promise<Array<ITaskInfo>> =>
  MyTasksDataBase.filter((el) => el.boardId === boardId);

/**
 * Updates information about a task
 * @param {string} id - id of a task
 * @param {object} data - an object with a key/ some keys of ITaskInfo (the information about a task)
 * @return {ITaskInfo | null } - object with information about a board or null if there is no board with such an id
 */
export const updateTask = (
  id: string,
  data: Partial<ITaskInfo>
): ITaskInfo | null => {
  const item = MyTasksDataBase.find((task) => task.id === id);
  if (!item) {
    return null;
  }

  item.title = data.title ? data.title : item.title;
  item.order = data.order ? data.order : item.order;
  item.description = data.description ? data.description : item.description;
  item.userId = data.userId ? data.userId : item.userId;
  item.columnId = data.columnId ? data.columnId : item.columnId;

  return item;
};

/**
 * Removes a task from the data base
 * @async
 * @param {string} id - id of a task
 * @return {Promise<Array<ITaskInfo>>} - Promise array of objects with full information about all tasks accept the deleted one
 */
export const removeTask = async (id: string): Promise<ITaskInfo[]> =>
  MyTasksDataBase.splice(
    MyTasksDataBase.findIndex((task) => task.id === id),
    1
  );
