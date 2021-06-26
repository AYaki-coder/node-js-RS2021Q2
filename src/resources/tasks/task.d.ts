import { Request } from 'express';

export interface Req1 extends Request {
  params: {
    boardID: string;
  };
}
