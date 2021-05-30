const {v4:uuid} = require('uuid');

/**
 * The Interface describing information about a user
 * @typedef {Object} IUserInfo
 * @property {string} id - id of a user
 * @property {string} name - name of a user
 * @property {string} login - login of a user
 * @property {string} password - password of a user
 */

 /**
 * The Interface describing information about a user that can be got as a response (without password)
 * @typedef {Object} IUserInfoToResponse
 * @property {string} id - id of a user
 * @property {string} name - name of a user
 * @property {string} login - login of a user
 */

/** Class representing a user */
class User {

  /** 
   * Create a user model
   * @param { IUserInfo } - an object with information about a user
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * 
   * @param {IUserInfo} user - an object with full information about a user
   * @return {IUserInfoToResponse} - an object with information about a user without password
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
