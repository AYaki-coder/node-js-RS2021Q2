import {v4 as uuid} from 'uuid';
import {IUserInfo} from './user';

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
export default class User {
  readonly id: string;
  readonly name: string;
  readonly login: string;
  readonly password: string;
  /** 
   * Create a user model
   * @param { IUserInfo } - an object with information about a user
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } : IUserInfo) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Create an object for a response without user's password
   * @param {IUserInfo} user - an object with full information about a user
   * @return {IUserInfoToResponse} - an object with information about a user without password
   */
  static toResponse(user: IUserInfo) : Omit<IUserInfo , 'password'>{
    const { id, name, login } = user;
    return { id, name, login };
  }
}