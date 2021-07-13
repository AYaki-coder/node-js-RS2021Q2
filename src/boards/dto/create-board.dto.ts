import { IColumnInfo } from '../column.interface';

export class CreateBoardDto {
  readonly title: string;
  readonly column: IColumnInfo[];
}
