const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const MyUsersDataBase = [];
const MyBoardsDataBase = [];
const MyTasksDataBase = [];

MyUsersDataBase.push(new User(), new User(), new User(), new User());
MyBoardsDataBase.push(new Board(), new Board());

const getAllUsers = async () => MyUsersDataBase.slice(0);

const getUser = async id => MyUsersDataBase.filter(el => el.id === id)[0];

const createUser = async user => {
  MyUsersDataBase.push(user);
  return user;
};
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

const getAllBoards = async () => MyBoardsDataBase.slice(0);

const getBoard = async id => MyBoardsDataBase.filter(el => el.id === id)[0];

const createBoard = async board => {
  MyBoardsDataBase.push(board);
  return board;
};

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

const createTask = async task => {
  MyTasksDataBase.push(task);
  return task;
};

const getTask = async id => MyTasksDataBase.filter(el => el.id === id)[0];

const getAllTasks = async boardId => MyTasksDataBase.filter(el => el.boardId === boardId);

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
