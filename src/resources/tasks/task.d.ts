import { Request } from 'express';
export interface ITaskInfo {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
  boardId: string;
}

export interface Req1 extends Request {
  params: {
    boardID: string;
  };
}
